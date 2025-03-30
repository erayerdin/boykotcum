// Copyright (C) 2025 Eray Erdin
//
// This file is part of boykotsepeti.
//
// boykotsepeti is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// boykotsepeti is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with boykotsepeti.  If not, see <https://www.gnu.org/licenses/>.

import { FC } from "react";
import KeyProvider, { useKeyProvider } from "./KeyProvider";

type GlobalProvidersProps = {
  children: React.ReactNode;
};

const GlobalProviders: FC<GlobalProvidersProps> = ({ children }) => {
  return <KeyProvider>{children}</KeyProvider>;
};

export { useKeyProvider };
export default GlobalProviders;
