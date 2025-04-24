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
import { SettingsIcon, SwitchCameraIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import cacheImage from "./actions/cacheImage";
import CameraButton from "./components/CameraButton";

const CameraPage = () => {
  console.log("CameraPage rendered");
  const idb = useIDB();
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const [cameraMode, setCameraMode] = useState<"user" | "environment">(
    "environment"
  );

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

  const toggleCamera = () => {
    setCameraMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
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
        className="absolute top-4 right-4 z-10"
      >
        <SettingsIcon size={32} color="white" />
      </Button>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: { ideal: cameraMode } }}
      />
      {/* Right Section */}
      <div className="absolute right-8 h-full">
        <div className="flex flex-col justify-center h-full">
          <button type="button" className="bg-white rounded-full p-2">
            <SwitchCameraIcon size={32} color="black" onClick={toggleCamera} />
          </button>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="absolute bottom-16 w-full">
        <div className="flex justify-center">
          <CameraButton onClick={capture} />
        </div>
      </div>
    </div>
  );
};

export default CameraPage;
