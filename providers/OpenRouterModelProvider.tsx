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

import {
  openrouter,
  OpenRouterCompletionSettings,
  OpenRouterLanguageModel,
} from "@openrouter/ai-sdk-provider";
import React, { FC, ReactNode } from "react";

type OpenRouterModelProviderState = {
  model: OpenRouterLanguageModel;
};
const OpenRouterModelContext =
  React.createContext<OpenRouterModelProviderState>({
    model: openrouter("google/gemini-2.5-pro-exp-03-25:free"),
  });

type OpenRouterModelProviderProps = {
  children: ReactNode;
  modelName: string;
  settings?: OpenRouterCompletionSettings;
};

const OpenRouterModelProvider: FC<OpenRouterModelProviderProps> = ({
  children,
  modelName,
  settings,
}) => {
  const model = openrouter(modelName, settings);

  return (
    <OpenRouterModelContext.Provider value={{ model }}>
      {children}
    </OpenRouterModelContext.Provider>
  );
};

export default OpenRouterModelProvider;
