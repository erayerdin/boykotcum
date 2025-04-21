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

import MaterialMenu, { MaterialMenuItem } from "@/components/material-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const SettingsPage = () => {
  const [isUpdateBlacklistDialogOpen, setUpdateBlacklistDialogOpen] =
    useState(false);

  return (
    <>
      <div className="flex flex-col">
        <MaterialMenu>
          <MaterialMenuItem
            name="update-blacklist"
            label="Boykot Listesini Güncelle"
            onClick={() => setUpdateBlacklistDialogOpen(true)}
          />
          <MaterialMenuItem name="about" label="Hakkında" />
        </MaterialMenu>
      </div>
      <AlertDialog
        defaultOpen={false}
        open={isUpdateBlacklistDialogOpen}
        onOpenChange={setUpdateBlacklistDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Liste güncellensin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Boykot listesi 24 saatte bir otomatik güncellenir. Ama eğer
              istiyorsanız şimdi de güncelleyebilirsiniz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction>Güncelle</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingsPage;
