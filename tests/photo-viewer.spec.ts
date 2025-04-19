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
import { readFile } from "fs/promises";

test("has photo", async ({ page }) => {
  // setup
  await page.goto("/");
  // read testimg.datauri
  const datauri = await readFile("tests/testimg.datauri", "utf-8");
  // save indexeddb boykotcum/cache/image
  await page.evaluate(async (datauri) => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("boykotcum");
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cache", "readwrite");
        const store = transaction.objectStore("cache");
        const putRequest = store.put(datauri, "image");
        putRequest.onsuccess = () => {
          resolve();
        };
        putRequest.onerror = () => {
          reject(putRequest.error);
        };
      };
      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }, datauri);

  await page.goto("/photo");
  await expect(page.locator("img")).toBeVisible();

  // teardown
  await page.evaluate(async () => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("boykotcum");
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cache", "readwrite");
        const store = transaction.objectStore("cache");
        const deleteRequest = store.delete("image");
        deleteRequest.onsuccess = () => {
          resolve();
        };
        deleteRequest.onerror = () => {
          reject(deleteRequest.error);
        };
      };
      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  });
});

test("has no photo", async ({ page }) => {
  await page.goto("/photo");
  await expect(page.locator("img")).not.toBeVisible();
  await expect(page.locator("text=Fotoğraf çekmediniz.")).toBeVisible();
});
