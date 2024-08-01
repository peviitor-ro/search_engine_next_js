import DisplayFilters from "./DisplayFilters";
import JobCard from "./JobCard";
import { JobsResults } from "@/models/Jobs";
import FaraRezultate from "./NoResults";
import JobCardSkeleton from "./JobCardSkeleton";

type Props = {
  data: JobsResults | undefined;
  loading: boolean;
};
const Joburi = ({ data, loading }: Props) => {
  const nrJoburi =
    (data?.numFound ?? 0) >= 20
      ? "de rezultate"
      : (data?.numFound ?? 0) == 1
      ? "rezultat"
      : "rezultate";

  return (
    <main className="mb-auto px-4">
      {loading ? (
        <div className="h-[20px] w-[50%] md:w-[13%] mx-auto my-8 md:mx-0 bg-gray-300 animate-pulse rounded-md"></div>
      ) : (
        <h2 className="text-center md:text-start text-text_grey_darker my-8 text-lg">
          {data?.numFound} {nrJoburi}
        </h2>
      )}

      <DisplayFilters />

      {loading ? (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 w-fit mx-auto">
          {Array.from({ length: 6 }).map((_, idx) => (
            <JobCardSkeleton key={idx} />
          ))}
        </section>
      ) : (
        <>
          {data?.numFound !== 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 w-fit mx-auto">
              {data?.docs.map((item, index) => (
                <JobCard item={item} key={index} />
              ))}
            </section>
          ) : (
            <FaraRezultate />
          )}
        </>
      )}
    </main>
  );
};

export default Joburi;
