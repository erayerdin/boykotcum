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

import { Product } from "@/types";
import { GoogleGenAI } from "@google/genai";
import { IDBPDatabase } from "idb";
import { create, StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import detectProducts from "./actions/detectProducts";
import getPhoto from "./actions/getPhoto";

type PhotoStoreCreatorParams = {
  ai: GoogleGenAI;
  idb: IDBPDatabase;
  predefinedProducts: Product[];
};

type PhotoState = {
  isLoading: boolean;
  products: Product[];
  // getters //
  getPhoto: () => Promise<string | undefined>;
  // methods //
  detect: () => Promise<void>;
};

let store: UseBoundStore<StoreApi<PhotoState>> | null = null;

const usePhotoStore = ({
  ai,
  idb,
  predefinedProducts,
}: PhotoStoreCreatorParams) => {
  if (store !== null) return store;

  store = create<PhotoState>()(
    devtools((set, get) => ({
      isLoading: true,
      products: [],
      // getters //
      getPhoto: () => getPhoto(idb),
      // methods //
      detect: async () => {
        const uri = await get().getPhoto();
        if (uri === undefined) {
          const error = new Error("Photo not found.");
          console.error(error);
          throw error;
        }

        set({ isLoading: true });
        const products = await detectProducts({
          ai,
          products: predefinedProducts,
          uri,
        });
        set({ products, isLoading: false });
      },
    }))
  );

  return store;
};

export type PhotoStore = typeof store;
export default usePhotoStore;
