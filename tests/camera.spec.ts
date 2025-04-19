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

import test, { expect } from "@playwright/test";

test("has capture button", async ({ page }) => {
  await page.goto("/camera");
  await expect(page.getByRole("button").locator("div").nth(2)).toBeVisible();
});

test("caches image", async ({ page }) => {
  // setup
  // get previous image value
  await page.goto("/");
  const previousImageValue: string | null = await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("boykotcum");
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cache", "readonly");
        const store = transaction.objectStore("cache");
        const getRequest = store.get("image"); // Assuming 'image' is the key
        getRequest.onsuccess = () => {
          resolve(getRequest.result);
        };
        getRequest.onerror = () => {
          reject(getRequest.error);
        };
      };
      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  });

  // test
  await page.goto("/camera");
  await page.getByRole("button").locator("div").nth(2).click();

  const imageValue: string | null = await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("boykotcum");

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cache", "readonly");
        const store = transaction.objectStore("cache");
        const getRequest = store.get("image"); // Assuming 'image' is the key

        getRequest.onsuccess = () => {
          resolve(getRequest.result);
        };

        getRequest.onerror = () => {
          reject(getRequest.error);
        };
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  });
  expect(imageValue).not.toBeNull();

  // cleanup
  // reset to previous image value
  await page.evaluate(async (imageValue) => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("boykotcum");
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cache", "readwrite");
        const store = transaction.objectStore("cache");
        const putRequest = store.put(imageValue, "image");
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
  }, previousImageValue);
});
