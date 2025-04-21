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

import { ChildrenProps } from "@/types";
import React, { FC } from "react";
import MaterialMenuItem from "./MaterialMenuItem";

const MaterialMenu: FC<ChildrenProps> = ({ children }) => {
  const totalChildren = React.Children.count(children);

  return (
    <div className="flex flex-col">
      {React.Children.map(children, (child, index) => (
        <>
          <div
            key={index}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            {child}
          </div>
          {totalChildren - 1 !== index && (
            <div className="h-px bg-gray-100 my-2" />
          )}
        </>
      ))}
    </div>
  );
};

export { MaterialMenuItem };
export default MaterialMenu;
