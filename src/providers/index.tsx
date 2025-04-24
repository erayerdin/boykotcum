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

import { ChildrenProps } from "@/types";
import { FC } from "react";
import DisableDevtoolsProvider from "./DisableDevtoolsProvider";
import GenAIProvider, { useGenAI } from "./GenAIProvider";
import IndexedDatabaseProvider, {
  IDB_NAME,
  useIDB,
} from "./IndexedDatabaseProvider";
import InitializerProvider from "./InitializerProvider";
import KeyProvider, { useKey } from "./KeyProvider";
import ProductsProvider from "./ProductsProvider";

const GlobalProviders: FC<ChildrenProps> = ({ children }) => {
  return (
    <DisableDevtoolsProvider>
      <IndexedDatabaseProvider>
        <KeyProvider>
          <ProductsProvider>
            <InitializerProvider>
              <GenAIProvider>{children}</GenAIProvider>
            </InitializerProvider>
          </ProductsProvider>
        </KeyProvider>
      </IndexedDatabaseProvider>
    </DisableDevtoolsProvider>
  );
};

export { IDB_NAME, useGenAI, useIDB, useKey };
export default GlobalProviders;
