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
import { useRef } from "react";
import Webcam from "react-webcam";
import cacheImage from "./actions/cacheImage";
import CameraButton from "./components/CameraButton";

const CameraPage = () => {
  console.log("CameraPage rendered");
  const idb = useIDB();
  const webcamRef = useRef<Webcam>(null);

  const capture = async () => {
    const { current: webcam } = webcamRef;
    if (webcam === null) {
      throw new Error("Webcam ref is not set");
    }

    const imageSrc = webcam.getScreenshot();
    if (imageSrc === null) {
      throw new Error("Failed to capture image");
    }

    await cacheImage(idb, imageSrc);
  };

  return (
    <div className="flex justify-center items-center h-screen max-h-screen overflow-hidden bg-black">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <div className="absolute bottom-16 left-1/2">
        <CameraButton onClick={capture} />
      </div>
    </div>
  );
};

export default CameraPage;
