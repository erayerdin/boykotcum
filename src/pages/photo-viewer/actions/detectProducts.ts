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

import productDetectionPrompt from "@/prompts/productDetectionPrompt";
import { Product } from "@/types";
import sleepAsync from "@/utils/sleepAsync";
import {
  createPartFromBase64,
  createUserContent,
  GoogleGenAI,
  Type,
} from "@google/genai";

type ListProductsParams = {
  ai: GoogleGenAI;
  products: Product[];
  uri: string;
};

const detectProducts = async ({
  ai,
  products,
  uri,
}: ListProductsParams): Promise<Product[]> => {
  if (import.meta.env.MODE === "e2e") {
    await sleepAsync(2000);
    return [
      {
        name: "Ülker",
        description: "",
      },
      {
        name: "BİM",
        description: "",
      },
    ];
  }

  const prompt = productDetectionPrompt({ products });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: createUserContent([
      createPartFromBase64(
        uri.replace("data:image/jpeg;base64,", ""),
        "image/jpeg"
      ),
      prompt,
    ]),
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
          },
        },
      },
    },
  });
  const text = response.text!;
  const data: Product[] = JSON.parse(text);
  return data.filter(
    ({ name }) =>
      products.findIndex(
        ({ name: n }) => n.toLowerCase() === name.toLowerCase()
      ) !== -1
  );
};

export default detectProducts;
