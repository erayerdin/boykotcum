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

import Webcam from "react-webcam";
import CameraButton from "./components/CameraButton";

const CameraPage = () => {
  return (
    <div className="flex justify-center items-center h-screen max-h-screen overflow-hidden bg-black">
      <Webcam />
      <div className="absolute bottom-16 left-1/2">
        <CameraButton
          onClick={() => {
            throw new Error("Not implemented");
          }}
        />
      </div>
    </div>
  );
};

export default CameraPage;
