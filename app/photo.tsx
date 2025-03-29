// Copyright (C) 2025 Eray Erdin
//
// This file is part of boykotsepeti.
//
// boykotsepeti is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// boykotsepeti is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with boykotsepeti.  If not, see <https://www.gnu.org/licenses/>.

import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PhotoScreen() {
  const { photo } = useLocalSearchParams<{ photo: string }>();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!photo) return;

    setIsSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      await MediaLibrary.saveToLibraryAsync(photo);
      alert("Photo saved to gallery!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save photo!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!photo) return;

    try {
      await Share.share({
        url: photo,
        message: "Check out this photo I took!",
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  if (!photo) {
    return (
      <View style={styles.container}>
        <Text>No photo to display</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo }}
        style={styles.photo}
        resizeMode="contain"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
          disabled={isSaving}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Ionicons
            name={isSaving ? "cloud-upload" : "save"}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>
            {isSaving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleShare}
          disabled={isSaving}
        >
          <Ionicons name="share-social" size={24} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  photo: {
    flex: 1,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
  backText: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
  },
});
