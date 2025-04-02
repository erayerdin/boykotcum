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

import { boycottPrompt } from "@/prompts";
import { Product } from "@/types";
import {
  createPartFromBase64,
  createUserContent,
  GoogleGenAI,
  Type,
} from "@google/genai";
import { readAsBase64 } from "../fs";

type ListProductsParams = {
  ai: GoogleGenAI;
  products: Product[];
  imagePath: string;
};

const detectProducts = async ({
  ai,
  products,
  imagePath,
}: ListProductsParams): Promise<Product[]> => {
  const prompt = boycottPrompt({ products });
  const fileB64 = await readAsBase64(imagePath, false);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: createUserContent([
      createPartFromBase64(fileB64!, "image/jpeg"),
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
    ({ name }) => products.findIndex(({ name: n }) => n === name) !== -1
  );
};

export default detectProducts;
