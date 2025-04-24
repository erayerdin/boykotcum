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

import { Button } from "@/components/ui/button";
import { useIDB } from "@/providers";
import { SettingsIcon } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import cacheImage from "./actions/cacheImage";
import CameraButton from "./components/CameraButton";

const CameraPage = () => {
  console.log("CameraPage rendered");
  const idb = useIDB();
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

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
    navigate("/photo");
  };

  return (
    <div className="flex justify-center items-center h-screen max-h-screen overflow-hidden bg-black">
      <Button
        name="settings"
        type="button"
        variant="ghost"
        onClick={async () => {
          await navigate("/settings");
        }}
        className="absolute top-4 right-4"
      >
        <SettingsIcon size={32} color="white" />
      </Button>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: { ideal: "environment" } }}
      />
      <div className="absolute bottom-16 w-full">
        <div className="flex gap-4 justify-center">
          <CameraButton onClick={capture} />
        </div>
      </div>
    </div>
  );
};

export default CameraPage;
