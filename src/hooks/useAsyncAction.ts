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

import { LoadState } from "@/types";
import { useEffect, useState } from "react";

type UseAsyncActionParams<T> = {
  action: () => Promise<T>;
  message: string;
};

const useAsyncAction = <T>({
  action,
  message,
}: UseAsyncActionParams<T>): LoadState<T, unknown> => {
  const [state, setState] = useState<LoadState<T, unknown>>({
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const obj = await action();
        setState({ loading: false, obj });
      } catch (error) {
        setState({ loading: null, error, message });
      }
    })();
  }, [action, message]);

  return state;
};

export default useAsyncAction;
