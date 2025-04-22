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

const MOCK_PRODUCTS: Product[] = [
  {
    name: "Ülker",
    description: "",
    links: [
      {
        type: "text",
        platform: "twitter",
        link: "https://twitter.com/sample-post",
        title: "Sample Twitter Post",
        description: "A sample description for a Twitter post.",
      },
      {
        type: "text",
        platform: "twitter-webarchive",
        link: "https://twitter.com/sample-post",
        title: "Sample Twitter Post",
        description: "A sample description for a Twitter post.",
      },
      {
        type: "text",
        platform: "other",
        link: "https://examplesite.com/sample-post",
        title: "Sample Post",
        description: "A sample description for a generic post.",
      },
      {
        type: "image",
        platform: "instagram",
        link: "https://instagram.com/sample-image",
        title: "Sample Instagram Image",
        description: "A sample description for an Instagram image.",
      },
      {
        type: "image",
        platform: "instagram-webarchive",
        link: "https://instagram.com/sample-image",
        title: "Sample Instagram Image",
        description: "A sample description for an Instagram image.",
      },
      {
        type: "image",
        platform: "imgbb",
        link: "https://imgbb.com/sample-image",
        title: "Sample ImgBB Image",
        description: "A sample description for an ImgBB image.",
      },
      {
        type: "image",
        platform: "other",
        link: "https://examplesite.com/sample-image",
        title: "Sample Image Link",
        description: "A sample description for a generic image link.",
      },
      {
        type: "video",
        platform: "youtube",
        link: "https://youtube.com/sample-video",
        title: "Sample YouTube Video",
        description: "A sample description for a YouTube video.",
      },
      {
        type: "video",
        platform: "dailymotion",
        link: "https://dailymotion.com/sample-video",
        title: "Sample Dailymotion Video",
        description: "A sample description for a Dailymotion video.",
      },
      {
        type: "video",
        platform: "streamable",
        link: "https://streamable.com/sample-video",
        title: "Sample Streamable Video",
        description: "A sample description for a Streamable video.",
      },
      {
        type: "video",
        platform: "other",
        link: "https://examplesite.com/sample-video",
        title: "Sample Video Link",
        description: "A sample description for a generic video link.",
      },
    ],
  },
  {
    name: "BİM",
    description: "",
    links: [],
  },
];

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
    return MOCK_PRODUCTS;
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
