import JobCard from "./JobCard";
import fetchData from "@/lib/fetchData";
import { createSearchString } from "@/lib/createSearchString";

const Joburi = async ({
  q,
  remote,
  company,
  page,
}: {
  q: string | undefined;
  company: string | undefined;
  remote: string | undefined;
  page: string | undefined;
}) => {
  page = "1";

  const paramsSearch = createSearchString(
    q,
    "",
    "",
    "România",
    company,
    remote,
    page
  );

  const data = await fetchData(paramsSearch);

  const nrJoburi =
    (data?.numFound ?? 0) >= 20
      ? "de rezultate"
      : (data?.numFound ?? 0) == 1
      ? "rezultat"
      : "rezultate";

  // if (numFound === 0) return <h2>No Jobs</h2>;

  return (
    <main className="mb-auto">
      <h2 className="ml-8 text-center md:text-start text-text_grey_darker my-8 text-lg">
        {data?.numFound} {nrJoburi}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
        {data?.docs.map((item, index) => (
          <JobCard item={item} key={index} />
        ))}
      </div>

      {/* {numFound === docs.length ? null : (
          <button onClick={handleLoadMore}>Load More Jobs</button>
        )} */}
    </main>
  );
};

export default Joburi;
