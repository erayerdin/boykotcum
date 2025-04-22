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
import { MOCK_PRODUCTS } from "../src/constants";

test("has links, names and descriptions", async ({ page }) => {
  const url = "https://api.npoint.io/6f7f9eaf9cb9b6f421b4";

  await page.route(url, async (route) => {
    await route.fulfill({
      json: MOCK_PRODUCTS,
      headers: {
        ...route.request().headers(),
        "Cache-Control": "no-cache",
      },
    });
  });

  await page.goto("/links?name=Ülker");
  await page.waitForSelector("text=Bağlantılar");

  const selectedProduct = MOCK_PRODUCTS.find((p) => p.name === "Ülker");
  await expect(selectedProduct).not.toBeUndefined();
  const links = selectedProduct!.links;

  for (const link of links) {
    await expect(page.locator(`a[href="${link.link}"]`)).toBeVisible();
    await expect(page.locator(`text=${link.title}`)).toBeVisible();
    await expect(page.locator(`text=${link.description}`)).toBeVisible();
  }

  await page.unroute(url);
});
