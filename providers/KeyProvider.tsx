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
      const response = await fetch(
        "https://api.npoint.io/f292060961b27fbafd09"
      );
      const data = await response.json();
      setGeminiKey(data.gemini);
    })();
  }, []);

  return (
    <KeyProviderContext.Provider value={state}>
      {children}
    </KeyProviderContext.Provider>
  );
};

export default KeyProvider;
