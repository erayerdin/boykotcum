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

import { OpenRouter } from "@/constants/OpenRouter";
import { CompletionsResponse } from "@/types";

type GenerateCompletionParams = {
  model: string;
  apiKey: string;
  prompt: string;
};

const generateCompletion = async ({
  model,
  apiKey,
  prompt,
}: GenerateCompletionParams): Promise<CompletionsResponse> => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
    }),
  };
  const response = await fetch(OpenRouter.completionsUrl, options);
  const data: CompletionsResponse = await response.json();
  return data;
};

export default generateCompletion;
