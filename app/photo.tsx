import { readAsBase64 } from "@/actions/fs";
import { generateChatCompletion } from "@/actions/openrouter";
import { Models } from "@/constants/Models";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PhotoScreen() {
  const { photo } = useLocalSearchParams<{ photo: string }>();
  const [response, setResponse] = useState("Generating...");

  useEffect(() => {
    (async () => {
      const fileb64 = await readAsBase64(photo);
      if (!fileb64) {
        console.error("Failed to read file as base64");
        return;
      }

      const data = await generateChatCompletion({
        model: Models.Gemini25ProExp,
        apiKey: process.env.EXPO_PUBLIC_OR_KEY!,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: fileb64,
                },
              },
              {
                type: "text",
                text: "What is in this image?",
              },
            ],
          },
        ],
      });
      setResponse(data.choices[0].message.content);
    })();
  }, []);

  if (!photo) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">No photo to display</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white mt-5 text-lg">Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: photo }}
        className="flex-1 w-full"
        resizeMode="contain"
      />

      <View className="flex-row justify-around p-5 bg-black bg-opacity-70">
        <TouchableOpacity
          className="items-center p-2"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="text-white mt-1 text-xs">Retake</Text>
        </TouchableOpacity>
        <Text className="text-red-500 mt-5 text-sm">{response}</Text>
      </View>
    </View>
  );
}
