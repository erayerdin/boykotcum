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
import fetchProducts from "@/actions/fetchProducts";
import { LoadState, Product } from "@/types";
import { createContext, FC, useContext, useEffect, useState } from "react";

type ProductsProviderState = LoadState<Product[], unknown>;

export const ProductsContext = createContext<ProductsProviderState>({
  loading: true,
});

export const useProducts = () => {
  const state = useContext(ProductsContext);

  if (state.loading === true) {
    throw new Error("ProductsContext is not loaded yet");
  } else if (state.loading === null) {
    console.error(state.error);
    throw state.error;
  }

  return state.obj;
};

type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsProvider: FC<ProductsProviderProps> = ({ children }) => {
  const [state, setState] = useState<ProductsProviderState>({ loading: true });

  useEffect(() => {
    (async () => {
      const products = await fetchProducts({
        link: "https://api.npoint.io/6f7f9eaf9cb9b6f421b4",
      });
      setState({ loading: false, obj: products });
    })();
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
