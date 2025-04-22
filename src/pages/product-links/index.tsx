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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useProducts } from "@/providers/ProductsProvider";
import { Product } from "@/types";
import {
  SiDailymotion,
  SiDailymotionHex,
  SiInstagram,
  SiInstagramHex,
  SiX,
  SiXHex,
  SiYoutube,
  SiYoutubeHex,
} from "@icons-pack/react-simple-icons";
import { ImageIcon, LinkIcon, TvMinimalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { match } from "ts-pattern";

const ProductLinksPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const products = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const name = searchParams.get("name");
    if (!name) {
      console.warn("No name provided for links.");
      navigate("/");
      return;
    }
    const product = products.find((p) => p.name === name);
    if (!product) {
      console.warn("No product found for name:", name);
      navigate("/");
      return;
    }
    setProduct(product);
  }, [navigate, products, searchParams]);

  return product === null ? (
    <div className="flex flex-col items-center justify-center">
      <LoadingSpinner size={32} />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 p-4">
      {product.links.map(({ platform, link, title, description }) => (
        <a key={link} href={link} target="_blank" rel="noopener noreferrer">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{description}</p>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="w-full"
                style={{
                  backgroundColor: match(platform)
                    .with("dailymotion", () => SiDailymotionHex)
                    .with("imgbb", () => undefined)
                    .with("instagram", () => SiInstagramHex)
                    .with("instagram-webarchive", () => undefined)
                    .with("other", () => undefined)
                    .with("streamable", () => "#007AFF")
                    .with("twitter", () => SiXHex)
                    .with("twitter-webarchive", () => undefined)
                    .with("youtube", () => SiYoutubeHex)
                    .exhaustive(),
                }}
              >
                {match(platform)
                  .with("dailymotion", () => <SiDailymotion size={16} />)
                  .with("imgbb", () => <ImageIcon size={16} />)
                  .with("instagram", () => <SiInstagram size={16} />)
                  .with("instagram-webarchive", () => <SiInstagram size={16} />)
                  .with("other", () => <LinkIcon size={16} />)
                  .with("streamable", () => <TvMinimalIcon size={16} />)
                  .with("twitter", () => <SiX size={16} />)
                  .with("twitter-webarchive", () => <SiX size={16} />)
                  .with("youtube", () => <SiYoutube size={16} />)
                  .exhaustive()}
                <span>Göster</span>
              </Button>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default ProductLinksPage;
