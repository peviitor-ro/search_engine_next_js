// pages/results.tsx

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

interface ResultsProps {
  initialData: JobsResults;
}

const Results: NextPage<ResultsProps> = ({ initialData }) => {
  const numFound: number | undefined = initialData?.numFound;
  return (
    <div className="rezultate-pagina flex flex-col justify-between items-center min-h-[100vh]">
      <Search />
      <FiltreCheckbox />
      <Joburi data={initialData} />
      <Pagination numFound={numFound} />
      <Footer />
    </div>
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
        initialData: initialData || { numFound: 0, docs: [] }, // Ensure initialData is always defined and matches the expected structure
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return an empty props object or handle error as needed
    return {
      props: {
        initialData: { numFound: 0, docs: [] }, // Provide a fallback in case of error
      },
    };
  }
};

export default Results;
