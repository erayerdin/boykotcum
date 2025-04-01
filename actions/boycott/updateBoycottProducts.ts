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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

type FetchBoycottProductsParams = {
  link: string;
};

const fetchBoycottProducts = async ({
  link,
}: FetchBoycottProductsParams): Promise<Product[]> => {
  const id = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    link
  );
  const dataKey = `data-${id}`;
  const expKey = `exp-${id}`;

  const response = await fetch(link);
  const data: Product[] = await response.json();
  await AsyncStorage.setItem(dataKey, JSON.stringify(data));
  await AsyncStorage.setItem(
    expKey,
    (Date.now() + 1000 * 60 * 60 * 24).toString()
  );
  return data;
};

export default fetchBoycottProducts;
