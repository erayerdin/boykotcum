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
import usePhoto from "./hooks/usePhoto";

const PhotoViewerPage = () => {
  const photo = usePhoto();

  return (
    <div className="bg-black w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      {photo ? (
        <>
          <img
            src={photo}
            alt="photo"
            className="w-full h-full object-contain"
          />
          <Sheet defaultOpen>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Boykotlu Ürünler</SheetTitle>
                <div className="flex justify-center">
                  <LoadingSpinner size={32} />
                </div>
              </SheetHeader>
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
