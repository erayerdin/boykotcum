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

import { LoadState } from "@/types";
import { GoogleGenAI } from "@google/genai";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useKey } from "./KeyProvider";

type GenAIContextState = LoadState<GoogleGenAI, unknown>;

export const GenAIContext = createContext<GenAIContextState>({ loading: true });

export const useGenAI = () => {
  const state = useContext(GenAIContext);

  if (state.loading === true) {
    throw new Error("GenAI is loading.");
  } else if (state.loading === null) {
    console.error(state.error);
    throw state.error;
  }
  return state.obj;
};

type GenAIProviderProps = {
  children: ReactNode;
};

const GenAIProvider: FC<GenAIProviderProps> = ({ children }) => {
  const [state, setState] = useState<GenAIContextState>({ loading: true });
  const keys = useKey();

  useEffect(() => {
    if (keys) {
      setState({
        loading: false,
        obj: new GoogleGenAI({ apiKey: keys.gemini }),
      });
    } else {
      setState({
        loading: null,
        error: new Error("Keys not found."),
        message: "Anahtar bulunamadı.",
      });
    }
  }, [keys]);

  return (
    <GenAIContext.Provider value={state}>{children}</GenAIContext.Provider>
  );
};

export default GenAIProvider;
