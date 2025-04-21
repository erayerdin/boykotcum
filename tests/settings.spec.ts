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

import { expect, test } from "@playwright/test";
import { createHash } from "crypto";

test("updates black list", async ({ page, browserName }) => {
  // TODO: Fix this test for webkit later
  test.skip(
    browserName === "webkit",
    "See: https://github.com/microsoft/playwright/issues/35685"
  );

  const url = "https://api.npoint.io/6f7f9eaf9cb9b6f421b4";
  const urlHash = createHash("sha256").update(url).digest("hex");
  const data = [
    {
      name: "Foo",
      description: "foo",
    },
    {
      name: "Bar",
      description: "bar",
    },
  ];

  await page.route(url, async (route) => {
    await route.fulfill({
      json: data,
      headers: {
        ...route.request().headers(),
        "Cache-Control": "no-cache",
      },
    });
  });

  await page.goto("/settings");
  await page.locator("button[name='update-blacklist-item']").click();
  await page.locator('button[name="update-blacklist"]').click();
  await page.waitForSelector("text=Boykot listesi güncellendi.");

  const localStorageData = await page.evaluate(
    (urlHash) => localStorage.getItem(`data-${urlHash}`),
    urlHash
  );
  expect(localStorageData).toEqual(JSON.stringify(data));

  await page.unroute(url);
});
