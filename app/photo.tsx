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

import { Models } from "@/constants/Models";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PhotoScreen() {
  const { photo } = useLocalSearchParams<{ photo: string }>();
  const [response, setResponse] = useState("Generating...");

  useEffect(() => {
    (async () => {
      const url = "https://openrouter.ai/api/v1/completions";
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OR_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: Models.Gemini25ProExp,
          prompt: "Hello.",
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("data", data);
      setResponse(data.choices[0].text);
    })();
  }, []);

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
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText}>{response}</Text>
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
