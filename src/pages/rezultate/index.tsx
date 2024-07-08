import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";
import Search from "@/app/components/Search";
import FiltreCheckbox from "@/app/components/FiltreCheckbox";
import Joburi from "@/app/components/Joburi";
import Pagination from "@/app/components/Pagination";
import Footer from "@/app/components/Footer";
import Head from "next/head";

interface ResultsProps {
  initialData: JobsResults;
  query: ParsedUrlQuery;
}

const Results: NextPage<ResultsProps> = ({ initialData, query }) => {
  const numFound: number | undefined = initialData?.numFound;

  const queryText = query.job ? ` pentru postul de ${query.job}` : "";
  const companyText = query.companie ? ` la compania ${query.companie}` : "";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="rezultate-pagina flex flex-col justify-between items-center min-h-[100vh]">
        <Search />
        <FiltreCheckbox />
        <Joburi data={initialData} />
        <Pagination numFound={numFound} />
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ResultsProps> = async ({
  query,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  try {
    const job = query.job as string | undefined;
    const oras = query.oras as string | undefined;
    const companie = query.companie as string | undefined;
    const tipJob = query.tipJob as string | undefined;
    const pagina = Array.isArray(query.pagina) ? query.pagina[0] : query.pagina;

    const paramsSearch = createSearchString(
      job,
      oras,
      "",
      "România",
      companie,
      tipJob,
      pagina || "1"
    );

    // Fetch data from API
    const initialData = await fetchData(paramsSearch);

    // Return the props object
    return {
      props: {
        initialData: initialData || { numFound: 0, docs: [] },
        query,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return an empty props object or handle error as needed
    return {
      props: {
        initialData: { numFound: 0, docs: [] },
        query,
      },
    };
  }
};

export default Results;
