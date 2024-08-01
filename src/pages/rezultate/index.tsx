"use client";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import Joburi from "@/app/components/Joburi";

import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";
import FilterCheckbox from "@/app/components/FilterCheckbox";
import Pagination from "@/app/components/Pagination";
import Footer from "@/app/components/Footer";
import Search from "@/app/components/Search";
import { useRouter } from "next/router";

const SearchResults = () => {
  const router = useRouter();
  const { job, companie, oras, tipJob, pagina } = router.query;

  const [data, setData] = useState<JobsResults | undefined>(undefined);
  const [numFound, setNumFound] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchJobsData = async () => {
      const paramsSearch = createSearchString(
        job as string,
        oras as string,
        "",
        "România",
        companie as string,
        tipJob as string,
        pagina as string
      );

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
  }, [job, companie, oras, tipJob, pagina]);

  return (
    <div className="rezultate-pagina flex flex-col justify-between items-center min-h-[100vh]">
      <Search />
      <FilterCheckbox />
      <Suspense fallback={<div>Loading Jobs...</div>}>
        <Joburi data={data} />
      </Suspense>
      <Pagination numFound={numFound} />

      <Footer />
    </div>
  );
};

export default SearchResults;
