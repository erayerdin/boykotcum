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
import { fetchBoycottProducts } from "@/actions/boycott";
import { Product } from "@/types";
import { createContext, FC, useContext, useEffect, useState } from "react";

type ProductsProviderState = Product[];

const ProductsContext = createContext<ProductsProviderState>([]);

export const useProducts = () => {
  return useContext(ProductsContext);
};

type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsProvider: FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductsProviderState>([]);

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchBoycottProducts({
          link: "https://api.npoint.io/6f7f9eaf9cb9b6f421b4",
        });
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
