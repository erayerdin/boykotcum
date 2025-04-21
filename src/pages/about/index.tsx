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
import { SiDiscord, SiGithub, SiGnu } from "@icons-pack/react-simple-icons";
import { useNavigate } from "react-router";

const AboutPage = () => {
  // navigate back
  const navigate = useNavigate();

  const links = [
    {
      title: "Discord'a Katıl",
      description:
        "Fikrini beyan et. Boykot etmek için yeni bir marka veya firma öner.",
      url: "https://discord.gg/6KpMXts6eu",
      icon: <SiDiscord size={24} />,
      color: "bg-[#5865F2]",
    },
    {
      title: "Github'da Kod Ekle ve Hata Bildir",
      description: "Kodları incele. Hata bildir. Katkıda bulun.",
      url: "https://github.com/erayerdin/boykotcum",
      icon: <SiGithub size={24} />,
      color: "bg-[#181717]",
    },
    {
      title: "GNU GPL ile bu programın ne yaptığını bil",
      description:
        "Bu program GNU GPL v2.0 lisansı ile lisanslanmıştır. Bu programın ne yaptığını kodları inceleyerek görebilirsiniz.",
      url: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
      icon: <SiGnu size={24} />,
      color: "bg-[#A42E2B]",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-screen max-h-screen p-2">
      <div className="flex flex-col gap-4 grow overflow-y-auto">
        {/* Main Card */}
        <div className="flex flex-col gap-2 bg-gradient-to-br from-green-600 to-green-400 p-8 rounded-lg shadow text-white text-center">
          <p className="text-2xl font-extrabold">Boykotçum</p>
          <p className="text-sm italic">
            &quot;Ne almayacağını sen düşünme.&quot;
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          {links.map(({ title, description, url, icon, color }) => (
            <a
              key={url}
              className={`flex flex-col gap-2 rounded-md ${color} text-white p-2`}
              href={url}
            >
              <div className="flex items-center gap-2 justify-center text-center">
                {icon}
                <p>{title}</p>
              </div>
              <hr className="border-white" />
              <p className="text-xs text-center">{description}</p>
            </a>
          ))}
        </div>
      </div>
      <Button type="button" onClick={() => navigate(-1)}>
        Geri Dön
      </Button>
    </div>
  );
};

export default AboutPage;
