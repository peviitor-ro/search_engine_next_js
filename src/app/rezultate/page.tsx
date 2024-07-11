"use client";
import { useState, useEffect } from "react";
import Joburi from "@/app/components/Joburi";
import Footer from "@/app/components/Footer";
import Search from "@/app/components/Search";
import FiltreCheckbox from "@/app/components/FiltreCheckbox";
import { Suspense } from "react";
import Pagination from "@/app/components/Pagination";
import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const job = searchParams.get("job") || "";
  const companie = searchParams.get("companie") || "";
  const oras = searchParams.get("oras") || "";
  const tipJob = searchParams.get("tipJob") || "";
  const pagina = searchParams.get("pagina") || "";

  const [data, setData] = useState<JobsResults | undefined>(undefined);
  const [numFound, setNumFound] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchJobsData = async () => {
      const paramsSearch = createSearchString(
        job,
        oras,
        "",
        "România",
        companie,
        tipJob,
        pagina
      );

      const fetchedData: JobsResults | undefined = await fetchData(
        paramsSearch
      );

      if (fetchedData) {
        setData(fetchedData);
        setNumFound(fetchedData.numFound);
      }
    };

    fetchJobsData();
  }, [job, companie, oras, tipJob, pagina]);

  return (
    <div className="rezultate-pagina flex flex-col justify-between items-center min-h-[100vh]">
      <Suspense fallback={<div>Loading Jobs...</div>}>
        <Search />
        <FiltreCheckbox />
        <Joburi data={data} />
        <Pagination numFound={numFound} />
      </Suspense>
      <Footer />
    </div>
  );
}
