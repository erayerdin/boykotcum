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

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const AboutPage = () => {
  // navigate back
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-screen max-h-screen p-2">
      <div className="grow overflow-y-auto">Content</div>
      <Button type="button" onClick={() => navigate(-1)}>
        Geri Dön
      </Button>
    </div>
  );
};

export default AboutPage;
