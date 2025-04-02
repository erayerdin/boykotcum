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

import GlobalProviders from "@/providers";
import { Stack } from "expo-router";
import "../global.css";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://85a59e9583bd0af97bc2d35676f5a656@o1120242.ingest.us.sentry.io/4509082682458112',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  return (
    <GlobalProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Home" }} redirect />
        <Stack.Screen name="camera" options={{ title: "Kamera" }} />
      </Stack>
    </GlobalProviders>
  );
});