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

type MaterialMenuItemProps = {
  name?: string;
  label: string;
  description?: string;
  onClick?: () => void;
};

const MaterialMenuItem: FC<MaterialMenuItemProps> = ({
  name,
  label,
  description,
  onClick,
}) => {
  return (
    <button
      name={name}
      type="button"
      className="flex flex-col p-4 w-full"
      onClick={onClick}
    >
      <div className="flex flex-row text-lg">{label}</div>
      {description && (
        <div className="flex flex-row text-sm text-gray-500">{description}</div>
      )}
    </button>
  );
};

export default MaterialMenuItem;
