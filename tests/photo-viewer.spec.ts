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

const setup = async (page) => {
  await page.goto("/");
  const datauri = await readFile("tests/testimg.datauri", "utf-8");
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
        reject(event);
      };
    });
  }, datauri);
};

const teardown = async (page) => {
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
        reject(event);
      };
    });
  });
};

test("has photo", async ({ page }) => {
  await setup(page);
  await page.goto("/photo");
  await expect(page.locator("img")).toBeVisible();
  await teardown(page);
});

test("has no photo", async ({ page }) => {
  await page.goto("/photo");
  await expect(page.locator("img")).not.toBeVisible();
  await expect(page.locator("text=Fotoğraf çekmediniz.")).toBeVisible();
});

test("has loading spinner", async ({ page }) => {
  await setup(page);
  await page.goto("/photo");
  await expect(page.locator("svg[name='detecting']")).toBeVisible();
  await teardown(page);
});

test("goes back to camera", async ({ page }) => {
  await page.goto("/photo");
  await page.waitForSelector("text=Fotoğraf çekmediniz.");
  await page.locator("button[name='back']").click();
  await expect(page).toHaveURL("/camera");
});

test("detects products", async ({ page }) => {
  await setup(page);
  await page.goto("/photo");
  await expect(page.getByText("Ülker")).toBeVisible();
  await expect(page.getByText("BİM")).toBeVisible();
  await teardown(page);
});
