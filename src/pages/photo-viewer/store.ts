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
import detectProducts from "./actions/detectProducts";
import getPhoto from "./actions/getPhoto";

type ProductsStoreCreatorParams = {
  ai: GoogleGenAI;
  idb: IDBPDatabase;
  predefinedProducts: Product[];
};

type ProductsState = {
  isLoading: boolean;
  products: Product[];
  // getters //
  photo: () => Promise<string | null>;
  // methods //
  detect: () => Promise<void>;
};

let store: UseBoundStore<StoreApi<ProductsState>> | null = null;

const useProductsStore = ({
  ai,
  idb,
  predefinedProducts,
}: ProductsStoreCreatorParams) => {
  if (store !== null) return store;

  store = create<ProductsState>((set, get) => ({
    isLoading: false,
    products: predefinedProducts,
    // getters //
    photo: () => getPhoto(idb),
    // methods //
    detect: async () => {
      const uri = await get().photo();
      if (uri === null) {
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
  }));

  return store;
};

export type ProductsStore = typeof store;
export default useProductsStore;
