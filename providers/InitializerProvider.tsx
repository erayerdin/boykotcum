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

import { createContext, FC, useContext, useEffect, useState } from "react";
import { useGenAI } from "./GenAIProvider";
import { useKeyProvider } from "./KeyProvider";

type InitializerState = "loading" | "ready";

const InitializerContext = createContext<InitializerState>("loading");

export const useInitializer = () => useContext(InitializerContext);

type InitializerProviderProps = {
  children: React.ReactNode;
};

const InitializerProvider: FC<InitializerProviderProps> = ({ children }) => {
  const [state, setState] = useState<InitializerState>("loading");
  const keys = useKeyProvider();
  const genAI = useGenAI();

  useEffect(() => {
    const states = [keys, genAI];

    if (states.includes(null)) {
      setState("loading");
    } else {
      setState("ready");
    }
  }, [keys, genAI]);

  return (
    <InitializerContext.Provider value={state}>
      {children}
    </InitializerContext.Provider>
  );
};

export default InitializerProvider;
