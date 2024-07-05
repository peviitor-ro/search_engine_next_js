import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { MetadataRoute } from "next";

const urlSite = "https://peviitor.ro/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   {
//   searchParams,
// }: {
// searchParams: {
//   job: string | undefined;
// };
// }
  // const jobEntries: MetadataRoute.Sitemap = [];
  // const seenJobTitles = new Set<string>();

  // try {
  //   let currentPage = 1;
  //   let totalPages = 1;

  //   do {
  //     const paramsSearch = createSearchString(
  //       searchParams?.job || "",
  //       "",
  //       "",
  //       "România",
  //       "",
  //       "",
  //       currentPage.toString()
  //     );

  //     const data = await fetchData(paramsSearch);
  //     const doc = data?.docs;

  //     if (doc && Array.isArray(doc)) {
  //       for (const { job_title } of doc) {
  //         if (job_title) {
  //           for (const title of job_title) {
  //             if (!seenJobTitles.has(title)) {
  //               seenJobTitles.add(title);
  //               jobEntries.push({
  //                 url: `${urlSite}rezultate?job=${encodeURIComponent(
  //                   title.replace(/&/g, "&amp;")
  //                 )}`,
  //                 changeFrequency: "weekly",
  //               });
  //             }
  //           }
  //         }
  //       }
  //     } else {
  //       throw new Error("Invalid data format or empty data");
  //     }

  //     //! change 600 with data.numFound when backend is fixed
  //     //! on 4700 error page 390
  //     totalPages = Math.ceil(7000 / 12);
  //     currentPage++;
  //   } while (currentPage <= totalPages);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return [{ url: urlSite }];
  // }

  return [
    {
      url: urlSite,
    },
    // ...jobEntries,
  ];
}
