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

import getKey from "@/actions/getKey";
import { ChildrenProps, LoadState } from "@/types";
import { createContext, FC, useContext, useEffect, useState } from "react";

type KeyContextState = LoadState<{ gemini: string }, unknown>;

export const KeyContext = createContext<KeyContextState>({ loading: true });

export const useKey = () => {
  const key = useContext(KeyContext);

  if (key.loading === true) {
    throw new Error("Key is still loading.");
  } else if (key.loading === null) {
    console.error(key.error);
    throw key.error;
  }

  return key.obj;
};

const KeyProvider: FC<ChildrenProps> = ({ children }) => {
  const [state, setState] = useState<KeyContextState>({ loading: true });

  useEffect(() => {
    (async () => {
      const key = await getKey();
      setState({ loading: false, obj: { gemini: key } });
    })();
  }, []);

  return <KeyContext.Provider value={state}>{children}</KeyContext.Provider>;
};

export default KeyProvider;
