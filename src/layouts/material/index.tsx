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

import { FC } from "react";
import { Outlet } from "react-router";
import AppBar from "./components/AppBar";

type MaterialLayoutProps = {
  defaultTitle: string;
};

const MaterialLayout: FC<MaterialLayoutProps> = ({ defaultTitle }) => {
  return (
    <div className="flex flex-col">
      <div className="h-16">
        <AppBar defaultTitle={defaultTitle} />
      </div>
      <Outlet />
    </div>
  );
};

export default MaterialLayout;
