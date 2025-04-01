// Copyright (C) 2025 Eray Erdin
//
// This file is part of Boykotçum.
//
// Boykotçum is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// Boykotçum is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Boykotçum.  If not, see <https://www.gnu.org/licenses/>.

import SeparatedList from "@/components/SeparatedList";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, Text, View } from "react-native";

const AboutScreen = () => {
  return (
    <View className="flex-1 p-4 items-center">
      <View className="mb-4 items-center">
        <Text className="font-bold text-2xl">Boykotçum</Text>
        <Text>{Constants.expoConfig?.version}</Text>
        <Text className="italic">"Ne almayacağını sen düşünme."</Text>
      </View>
      <SeparatedList>
        <Pressable
          className="items-center"
          onPress={() => Linking.openURL("https://discord.gg/6KpMXts6eu")}
        >
          <Text>Discord</Text>
        </Pressable>
        <Pressable
          className="items-center"
          onPress={() =>
            Linking.openURL("https://github.com/erayerdin/boykotcum")
          }
        >
          <Text>Github</Text>
        </Pressable>
        <Pressable
          className="items-center"
          onPress={() =>
            Linking.openURL(
              "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
            )
          }
        >
          <Text>GNU Genel Kamu Lisansı v2.0</Text>
        </Pressable>
      </SeparatedList>
    </View>
  );
};

export default AboutScreen;
