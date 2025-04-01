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

import { GoogleGenAI } from "@google/genai";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useKeyProvider } from "./KeyProvider";

const GenAIContext = createContext<GoogleGenAI | null>(null);

export const useGenAI = () => {
  return useContext(GenAIContext);
};

type GenAIProviderProps = {
  children: ReactNode;
};

const GenAIProvider: FC<GenAIProviderProps> = ({ children }) => {
  const [genAI, setGenAI] = useState<GoogleGenAI | null>(null);
  const keys = useKeyProvider();

  useEffect(() => {
    if (keys) {
      setGenAI(new GoogleGenAI({ apiKey: keys.gemini }));
    } else {
      setGenAI(null);
    }
  }, [keys]);

  return (
    <GenAIContext.Provider value={genAI}>{children}</GenAIContext.Provider>
  );
};

export default GenAIProvider;
