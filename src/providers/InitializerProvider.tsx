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

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ChildrenProps } from "@/types";
import { FC, useContext } from "react";
import { IndexedDatabaseContext } from "./IndexedDatabaseProvider";
import { KeyContext } from "./KeyProvider";
import { ProductsContext } from "./ProductsProvider";

const InitializerProvider: FC<ChildrenProps> = ({ children }) => {
  const idbState = useContext(IndexedDatabaseContext);
  const keyState = useContext(KeyContext);
  const productsState = useContext(ProductsContext);

  const states = [idbState, keyState, productsState];
  const isLoaded = states.every((state) => state.loading === false);

  return isLoaded ? (
    <>{children}</>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <LoadingSpinner size={64} color="white" />
    </div>
  );
};

export default InitializerProvider;
