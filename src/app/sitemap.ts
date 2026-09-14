import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://randiscreativecorner.netlify.app/";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/museum`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/film-studio`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dance-studio`,
      lastModified: new Date(),
    },
  ];
}