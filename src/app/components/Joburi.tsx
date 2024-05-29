import DisplayFilters from "./DisplayFilters";
import JobCard from "./JobCard";
import { JobsResults } from "@/models/Jobs";
import FaraRezultate from "./NoResults";

type Props = {
  data: JobsResults | undefined;
};
const Joburi = async ({ data }: Props) => {
  const nrJoburi =
    (data?.numFound ?? 0) >= 20
      ? "de rezultate"
      : (data?.numFound ?? 0) == 1
        ? "rezultat"
        : "rezultate";

  // if (numFound === 0) return <h2>No Jobs</h2>;

  return (
    <main className="mb-auto">
      <h2 className="text-center md:text-start text-text_grey_darker my-8 text-lg">
        {data?.numFound} {nrJoburi}
      </h2>

      <DisplayFilters />
      {/* Check if there are no results and render the NoResults component */}
      {data?.numFound === 0 ? <FaraRezultate /> :
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
          {data?.docs.map((item, index) => (
            <JobCard item={item} key={index} />
          ))}
        </div>
      }
      {/* {numFound === docs.length ? null : (
          <button onClick={handleLoadMore}>Load More Jobs</button>
        )} */}
    </main >
  );
};

export default Joburi;
