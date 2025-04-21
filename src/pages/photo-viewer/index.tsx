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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useAsyncAction from "@/hooks/useAsyncAction";
import { useGenAI, useIDB } from "@/providers";
import { useProducts } from "@/providers/ProductsProvider";
import { useEffect } from "react";
import usePhotoStore from "./store";

const PhotoViewerPage = () => {
  const idb = useIDB();
  const ai = useGenAI();
  const predefinedProducts = useProducts();
  const { isLoading, products, getPhoto, detect } = usePhotoStore({
    idb,
    ai,
    predefinedProducts,
  })();
  const photo = useAsyncAction({
    action: getPhoto,
    message: "Fotoğraf yüklenemedi.",
  });

  const photoExists = photo.loading === false && photo.obj !== undefined;

  useEffect(() => {
    detect();
  }, [detect]);

  return (
    <div className="bg-black w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      {photoExists ? (
        <>
          <img
            src={photo.obj}
            alt="photo"
            className="w-full h-full object-contain"
          />
          <Sheet defaultOpen>
            <SheetContent side="bottom" className="max-h-1/2">
              <SheetHeader>
                <SheetTitle>Boykotlu Ürünler</SheetTitle>
              </SheetHeader>
              <div
                className={`flex flex-col p-4 ${
                  isLoading || products.length === 0
                    ? "overflow-y-hidden"
                    : "overflow-y-auto"
                }`}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <LoadingSpinner name="detecting" size={32} />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-black text-center text-sm">
                    Boykotlu ürün bulunamadı.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {products.map((product) => (
                      <div
                        key={product.name}
                        className="bg-gray-200 text-zinc-800 text-sm p-2 rounded-md"
                      >
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <div className="text-white text-sm">Fotoğraf çekmediniz.</div>
      )}
    </div>
  );
};

export default PhotoViewerPage;
