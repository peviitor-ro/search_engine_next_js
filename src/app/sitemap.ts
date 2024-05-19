import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { MetadataRoute } from "next";

const urlSite = "https://peviitor.ro/";
export default async function sitemap({
  searchParams,
}: {
  searchParams: {
    job: string | undefined;
  };
}): Promise<MetadataRoute.Sitemap> {
  const jobEntries: MetadataRoute.Sitemap = [];

  try {
    let currentPage = 1;
    let totalPages = 1;

    do {
      const paramsSearch = createSearchString(
        searchParams?.job || "",
        "",
        "",
        "România",
        "",
        "",
        currentPage.toString()
      );

      const data = await fetchData(paramsSearch);
      const doc = data?.docs;

      if (doc && Array.isArray(doc)) {
        const entries = doc.map(({ job_title }) => ({
          url: `${urlSite}/rezultate?job=${encodeURIComponent(
            job_title.map((title) => title.replace(/&/g, "&amp;")).join(",")
          )}`,
          changefreq: "weekly",
        }));
        jobEntries.push(...entries);
      } else {
        throw new Error("Invalid data format or empty data");
      }

      //!   change 600 with data.numFound when backend is fixed
      totalPages = Math.ceil(600 / 12);
      currentPage++;
    } while (currentPage <= totalPages);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [{ url: urlSite }];
  }

  return [
    {
      url: urlSite,
    },
    ...jobEntries,
  ];
}
