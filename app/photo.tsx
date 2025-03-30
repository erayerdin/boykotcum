import { listProducts } from "@/actions/boycott";
import Card from "@/components/Card";
import { useGenAI, useProducts } from "@/providers";
import { Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function PhotoScreen() {
  const { photo } = useLocalSearchParams<{ photo: string }>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const ai = useGenAI();
  const [loading, setLoading] = useState(true);
  const productList = useProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!ai) {
      console.warn("AI not initialized");
      return;
    }

    (async () => {
      setLoading(true);
      const products = await listProducts({
        ai,
        products: productList,
        imagePath: photo,
      });
      setProducts(products);
      setLoading(false);
    })();
  }, []);

  const snapPoints = useMemo(() => ["25%", "90%"], []);
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
          enablePanDownToClose={false} // Disable swipe-to-close
          enableContentPanningGesture={false} // Disable drag gestures
          index={0}
        >
          <BottomSheetView className="p-4">
            <ScrollView className="mt-2">
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : products.length === 0 ? (
                <Text className="text-base text-center">
                  Boykotlu ürün mevcut değil.
                </Text>
              ) : (
                <>
                  <Text className="text-lg font-bold mb-2">
                    Boykotlu Ürünler
                  </Text>
                  {products.map((product, index) => (
                    <Card key={index}>
                      <Text className="text-base">{product.name}</Text>
                    </Card>
                  ))}
                </>
              )}
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
