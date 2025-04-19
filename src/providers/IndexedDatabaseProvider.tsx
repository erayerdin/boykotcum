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

import { ChildrenProps, LoadState } from "@/types";
import { IDBPDatabase, openDB } from "idb";
import { createContext, FC, useContext, useEffect, useState } from "react";

const DB_NAME: string = "boykotcum";
const DB_VERSION: number = 1;

type IndexedDatabaseContextState = LoadState<IDBPDatabase, unknown>;

export const IndexedDatabaseContext =
  createContext<IndexedDatabaseContextState>({
    loading: true,
  });

export const useIDB = (): IDBPDatabase => {
  const state = useContext(IndexedDatabaseContext);

  if (state.loading) {
    throw new Error("IDB is still loading.");
  }
  if (state.loading === null) {
    throw state.error;
  }

  return state.obj;
};

const IndexedDatabaseProvider: FC<ChildrenProps> = ({ children }) => {
  const [state, setState] = useState<IndexedDatabaseContextState>({
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const db = await openDB(DB_NAME, DB_VERSION, {
          upgrade: (db) => {
            db.createObjectStore("cache");
          },
        });
        setState({ loading: false, obj: db });
      } catch (error) {
        setState({ loading: null, message: "Yerel veritabanı hatası", error });
        throw error;
      }
    })();
  }, []);

  return (
    <IndexedDatabaseContext value={state}>{children}</IndexedDatabaseContext>
  );
};

export default IndexedDatabaseProvider;
