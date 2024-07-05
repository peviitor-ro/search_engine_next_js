import FiltreCheckbox from "@/app/components/FiltreCheckbox";
import Footer from "@/app/components/Footer";
import Joburi from "@/app/components/Joburi";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";
import { JobsResults } from "@/models/Jobs";
import { ParsedUrlQuery } from "querystring";

interface ResultsProps {
  initialData: JobsResults;
}

const Results = ({ initialData }: ResultsProps) => {
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

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
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

    // Pass data to the component props
    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return an empty props object or handle error as needed
    return {
      props: {
        initialData: [],
      },
    };
  }
}

export default Results;
