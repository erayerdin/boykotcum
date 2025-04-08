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

import { safeFetch } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getKey = async (): Promise<string> => {
  const key = await AsyncStorage.getItem("data-gemini-key");
  const exp = await AsyncStorage.getItem("exp-gemini-key");
  const doFetch = key === null || exp === null || parseInt(exp) < Date.now();

  if (doFetch) {
    const uri = new Uint8Array([
      104, 116, 116, 112, 115, 58, 47, 47, 97, 112, 105, 46, 110, 112, 111, 105,
      110, 116, 46, 105, 111, 47, 102, 50, 57, 50, 48, 54, 48, 57, 54, 49, 98,
      50, 55, 102, 98, 97, 102, 100, 48, 57,
    ]);
    const decoder = new TextDecoder();
    const response = await safeFetch(decoder.decode(uri));
    const data = await response.json();
    const geminiKey: string = data.gemini;
    await AsyncStorage.setItem("data-gemini-key", JSON.stringify(geminiKey));
    await AsyncStorage.setItem(
      "exp-gemini-key",
      (Date.now() + 3600000).toString()
    );
    return data.gemini;
  } else {
    return JSON.parse(key);
  }
};

export default getKey;
