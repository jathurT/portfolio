export default function sitemap() {
  const baseUrl = "https://www.jathurt.me";

  // Single-page portfolio — only the canonical URL belongs in the sitemap.
  // Hash fragments (#about, #projects, …) are not separate pages to Google.
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
