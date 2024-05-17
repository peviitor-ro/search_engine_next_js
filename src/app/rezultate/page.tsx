import Joburi from "@/app/components/Joburi";
import Footer from "../components/Footer";
import Search from "../components/Search";
import FiltreCheckbox from "../components/FiltreCheckbox";

export default function SearchResults({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
    company: string | undefined;
    remote: string | undefined;
    page: string | undefined;
  };
}) {
  return (
    <div className="rezultate-pagina  flex flex-col justify-between items-center min-h-[100vh]">
      <Search />
      {/* <FiltreCheckbox /> */}

      <Joburi
        q={searchParams.q}
        remote={searchParams.remote}
        company={searchParams.company}
        page={searchParams.page}
      />
      <Footer />
    </div>
  );
}
