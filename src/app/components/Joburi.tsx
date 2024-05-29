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

  return (
    <main className="mb-auto">
      <h2 className="ml-8 text-center md:text-start text-text_grey_darker my-8 text-lg">
        {data?.numFound} {nrJoburi}
      </h2>
      {/* Check if there are no results and render the NoResults component */}
      {data?.numFound === 0 ? (
        <FaraRezultate />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
          {data?.docs.map((item, index) => (
            <JobCard item={item} key={index} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Joburi;
