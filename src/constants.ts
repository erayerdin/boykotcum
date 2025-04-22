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

import { Product } from "./types";

export const PRODUCT_LIST_URL = "https://api.npoint.io/6f7f9eaf9cb9b6f421b4";

export const MOCK_PRODUCTS: Product[] = [
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
        link: "https://twitter.com/sample-post-archive", // normally it'd be web archive link
        title: "Sample Twitter Archive Post",
        description: "A sample description for a Twitter archive post.",
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
        link: "https://instagram.com/sample-image-archive", // normally it'd be web archive link
        title: "Sample Instagram Archive Image",
        description: "A sample description for an Instagram archive image.",
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
