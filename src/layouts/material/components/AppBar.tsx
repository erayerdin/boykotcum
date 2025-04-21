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

import { ArrowLeftIcon } from "lucide-react";
import { FC } from "react";

const BackButton = () => {
  const canGoBack = window.history.length > 1;

  return (
    canGoBack && (
      <button
        type="button"
        onClick={() => {
          if (canGoBack) {
            window.history.back();
          }
        }}
      >
        <ArrowLeftIcon size={32} />
      </button>
    )
  );
};

type AppBarProps = {
  defaultTitle: string;
};

const AppBar: FC<AppBarProps> = ({ defaultTitle }) => {
  return (
    <div className="flex shadow h-16 max-h-16 items-center px-4 gap-4">
      <BackButton />
      <p className="text-xl font-bold">{defaultTitle}</p>
    </div>
  );
};

export default AppBar;
