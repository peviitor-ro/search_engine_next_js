"use client";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import Joburi from "@/app/components/Joburi";

import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";
import FiltreCheckbox from "@/app/components/FiltreCheckbox";
import Pagination from "@/app/components/Pagination";
import Footer from "@/app/components/Footer";
import Search from "@/app/components/Search";
import { useRouter } from "next/router";
import Head from "next/head";

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

  const queryText = job ? ` pentru postul de ${job}` : "";
  const companyText = companie ? ` la compania ${companie}` : "";

  let title = `🔍 Locuri de muncă te așteaptă!`;
  let description = `Descoperă oportunități de carieră${queryText}${companyText}. Începe-ți călătoria profesională acum!`;

  if (numFound !== undefined) {
    if (numFound === 0) {
      title = `🔍 Niciun loc de muncă${queryText} nu a fost găsit`;
      description = `Nu am găsit oportunități de carieră${queryText}${companyText}. Verifică mai târziu pentru noi oferte.`;
    } else if (numFound === 1) {
      title = `🔍 Un loc de muncă ${queryText} te așteaptă!`;
      description = `Descoperă o oportunitate de carieră${queryText}${companyText}. Începe-ți călătoria profesională acum!`;
    } else {
      title = `🔍 ${numFound} locuri de muncă${queryText} te așteaptă!`;
      description = `Descoperă peste ${numFound} oportunități de carieră${queryText}${companyText}. Începe-ți călătoria profesională acum!`;
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="rezultate-pagina flex flex-col justify-between items-center min-h-[100vh]">
        <Search />
        <FiltreCheckbox />
        <Suspense fallback={<div>Loading Jobs...</div>}>
          <Joburi data={data} />
        </Suspense>
        <Pagination numFound={numFound} />

        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
