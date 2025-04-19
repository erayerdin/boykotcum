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

import { useIDB } from "@/providers";
import { useEffect, useState } from "react";
import getPhoto from "../actions/getPhoto";

const usePhoto = (): string | null => {
  const idb = useIDB();
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const photo = await getPhoto(idb);
      setPhoto(photo);
    })();
  }, [idb]);

  return photo;
};

export default usePhoto;
