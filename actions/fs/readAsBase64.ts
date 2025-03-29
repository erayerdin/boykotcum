// Copyright (C) 2025 Eray Erdin
//
// This file is part of boykotsepeti.
//
// boykotsepeti is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// boykotsepeti is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with boykotsepeti.  If not, see <https://www.gnu.org/licenses/>.

import * as FileSystem from "expo-file-system";

const readFileAsBase64 = async (fileUri: string) => {
  try {
    const formattedUri = fileUri.replace(/^file:\/\//, "");

    // Read file as base64 string
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

export default readFileAsBase64;
