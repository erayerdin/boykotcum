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

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type KeyProviderState = {
  gemini: string;
};

const KeyProviderContext = createContext<KeyProviderState | null>(null);

type KeyProviderProps = {
  children: ReactNode;
};

export const useKeyProvider = () => {
  return useContext(KeyProviderContext);
};

const KeyProvider: FC<KeyProviderProps> = ({ children }) => {
  const [geminiKey, setGeminiKey] = useState<string | null>(null);
  const state = geminiKey === null ? null : { gemini: geminiKey };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(process.env.EXPO_PUBLIC_KEY_URL as string);
        const data = await response.json();
        setGeminiKey(data.gemini);
      } catch (error) {
        console.error("Error fetching keys:", error);
        throw error;
      }
    })();
  }, []);

  return (
    <KeyProviderContext.Provider value={state}>
      {children}
    </KeyProviderContext.Provider>
  );
};

export default KeyProvider;
