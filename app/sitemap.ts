import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beverlywebdesign.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ai-workflows`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
