import Search from "./Search";
import JobCard from "./JobCard";
import fetchData from "@/lib/fetchData";
import { createSearchString } from "@/lib/createSearchString";
import FiltreCheckbox from "./FiltreCheckbox";

const NewCards = async ({
  q,
  remote,
  company,
}: {
  q: string | undefined;
  company: string | undefined;
  remote: string | undefined;
}) => {
  const paramsSearch = createSearchString(
    q,
    "",
    "",
    "România",
    company,
    remote,
    "1"
  );

  const data = await fetchData(paramsSearch);
  // if (numFound === 0) return <h2>No Jobs</h2>;

  return (
    <>
      <Search />

      <FiltreCheckbox />
      <section>
        <strong>
          <h2>Total Jobs: {data?.numFound}</h2>
        </strong>
        {data?.docs.map((item, index) => (
          <JobCard item={item} key={index} />
        ))}

        {/* {numFound === docs.length ? null : (
          <button onClick={handleLoadMore}>Load More Jobs</button>
        )} */}
      </section>
    </>
  );
};

export default NewCards;
