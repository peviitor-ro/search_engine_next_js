"use client";
import { useState, useEffect } from "react";
import Joburi from "@/app/components/Joburi";
import Footer from "../components/Footer";
import Search from "../components/Search";
import FiltreCheckbox from "../components/FiltreCheckbox";
import { Suspense } from "react";
import Pagination from "../components/Pagination";
import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";

export default function SearchResults({
  searchParams,
}: {
  searchParams: {
    job: string;
    companie: string;
    oras: string;
    tipJob: string;
    pagina: string;
  };
}) {
  const [data, setData] = useState<JobsResults | undefined>(undefined);
  const [numFound, setNumFound] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchJobsData = async () => {
      const {
        job = "",
        companie = "",
        oras = "",
        tipJob = "",
        pagina = "1",
      } = searchParams;
      const paramsSearch = createSearchString(
        job,
        oras,
        "",
        "România",
        companie,
        tipJob,
        pagina
      );

      console.log(paramsSearch);

      try {
        const fetchedData: JobsResults | undefined = await fetchData(
          paramsSearch
        );

        if (fetchedData) {
          setData(fetchedData);
          setNumFound(fetchedData.numFound);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobsData();
  }, [searchParams]);

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
