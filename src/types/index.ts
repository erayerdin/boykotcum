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

import { ReactNode } from "react";
import LoadState, { ErrorState, LoadedState, LoadingState } from "./LoadState";
import Product from "./Product";

type ChildrenProps = {
  children: ReactNode;
};

export {
  type ChildrenProps,
  type ErrorState,
  type LoadedState,
  type LoadingState,
  type LoadState,
  type Product,
};
