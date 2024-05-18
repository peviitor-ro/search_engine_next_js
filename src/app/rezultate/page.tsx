import Joburi from "@/app/components/Joburi";
import Footer from "../components/Footer";
import Search from "../components/Search";
import FiltreCheckbox from "../components/FiltreCheckbox";
import { Suspense } from "react";
import Pagination from "../components/Pagination";
import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
    company: string | undefined;
    remote: string | undefined;
    page: string | undefined;
  };
}) {
  const query = searchParams?.q || "";
  const company = searchParams?.company || "";
  const remote = searchParams?.remote || "";
  const page = searchParams?.page || "";

  const paramsSearch = createSearchString(
    query,
    "",
    "",
    "România",
    company,
    remote,
    page
  );

  const data: JobsResults | undefined = await fetchData(paramsSearch);
  const numFound: number | undefined = data?.numFound;
  return {
    title: `Job: ${query} | Rezultate: ${numFound}`,
    description: `Peste ${numFound} de locuri de munca pe postul de ${query} la firma ${company}`,
  };
}

export default async function SearchResults({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
    company: string | undefined;
    remote: string | undefined;
    page: string | undefined;
  };
}) {
  const query = searchParams?.q || "";
  const company = searchParams?.company || "";
  const remote = searchParams?.remote || "";
  const page = searchParams?.page || "";

  const paramsSearch = createSearchString(
    query,
    "",
    "",
    "România",
    company,
    remote,
    page
  );

  const data: JobsResults | undefined = await fetchData(paramsSearch);

  const numFound: number | undefined = data?.numFound;

  return (
    <div className="rezultate-pagina flex flex-col justify-between items-center min-h-[100vh]">
      <Search />
      {/* <FiltreCheckbox /> */}

      <Suspense key={query} fallback={<div>Loading Jobs........</div>}>
        {" "}
        <Joburi
          // q={searchParams.q}
          // remote={searchParams.remote}
          // company={searchParams.company}
          // page={searchParams.page}
          // currentPage={currentPage}
          data={data}
        />
      </Suspense>

      <Pagination numFound={numFound} />

      <Footer />
    </div>
  );
}
