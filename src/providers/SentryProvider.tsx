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
import * as Sentry from "@sentry/react";
import { FC, useEffect } from "react";

const SentryProvider: FC<ChildrenProps> = ({ children }) => {
  useEffect(() => {
    if (import.meta.env.PROD) {
      Sentry.init({
        dsn: "https://f89fd8e952a7395ed98038d242e6363f@o1120242.ingest.us.sentry.io/4509208265752576",
        // Setting this option to true will send default PII data to Sentry.
        // For example, automatic IP address collection on events
        sendDefaultPii: true,
      });
    }
  }, []);

  return children;
};

export default SentryProvider;
