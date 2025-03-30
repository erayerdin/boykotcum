import Card from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function PhotoScreen() {
  const { photo } = useLocalSearchParams<{ photo: string }>();
  const [response, setResponse] = useState("Generating...");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("Sheet position changed:", index);
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
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-black relative">
        <Image
          source={{ uri: photo }}
          className="flex-1 w-full"
          resizeMode="contain"
        />

        <View className="absolute top-0 w-full flex-row justify-between p-4 bg-black/50">
          <TouchableOpacity
            className="items-center p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          index={0}
        >
          <BottomSheetView className="p-4">
            <Text className="text-lg font-semibold">Analysis Result:</Text>
            <ScrollView className="mt-2">
              <Card>
                <Text>Hello</Text>
              </Card>
              <Card>
                <Text>Hello</Text>
              </Card>
              <Card>
                <Text>Hello</Text>
              </Card>
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
