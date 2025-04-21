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

type FetchProductsParams = {
  link: string;
};

const updateProducts = async ({
  link,
}: FetchProductsParams): Promise<Product[]> => {
  const idBuffer = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(link)
  );
  // convert id to hex string
  const id = Array.from(new Uint8Array(idBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const dataKey = `data-${id}`;
  const expKey = `exp-${id}`;

  const response = await fetch(link);
  const data: Product[] = await response.json();
  localStorage.setItem(dataKey, JSON.stringify(data));
  localStorage.setItem(expKey, (Date.now() + 1000 * 60 * 60 * 24).toString());
  return data;
};

export default updateProducts;
