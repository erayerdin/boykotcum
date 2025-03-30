// Copyright (C) 2025 Eray Erdin
//
// This file is part of boykotsepeti.
//
// boykotsepeti is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// boykotsepeti is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with boykotsepeti.  If not, see <https://www.gnu.org/licenses/>.

import { Product } from "@/types";

type BoycottPromptParams = {
  products: Product[];
};

const boycottPrompt = ({ products }: BoycottPromptParams): string => {
  return [
    "Aşağıda JSON olarak bir ürün/marka listesi görmektesin.",
    ["```", JSON.stringify(products), "```"].join("\n"),
    "Sana bir görsel gönderiyorum. Bu görselde bir ürün/marka var mı? Varsa hangisi?",
    "Bana JSON dizisi olarak cevap ver. Sana gönderdiğim ürün/marka listesinin formatına uymak zorunda.",
  ].join("\n\n");
};

export default boycottPrompt;
