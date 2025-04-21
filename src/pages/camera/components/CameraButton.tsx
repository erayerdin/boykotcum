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

import { FC, useEffect, useRef, useState } from "react";

type CameraButtonProps = {
  onClick?: () => void;
};

const CameraButton: FC<CameraButtonProps> = ({ onClick }) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  useEffect(() => {
    setTranslateX(containerRef.current?.offsetWidth ?? 0 / 2);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      ref={containerRef}
      style={{
        color: "white",
        transform: `translateX(-${translateX / 2}px)`,
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div className="absolute w-12 h-12 rounded-full bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-16 h-16 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full h-full rounded-full bg-white opacity-50" />
        <div className="absolute inset-0 border-2 border-white rounded-full pointer-events-none" />
      </div>
    </button>
  );
};

export default CameraButton;
