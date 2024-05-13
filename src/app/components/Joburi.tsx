"use client";

import Search from "./Search";
import FiltreCheckbox from "./FiltreCheckbox";
import { useJobsContext } from "../context/JobProvider";
import JobCard from "./JobCard";

const Joburi = () => {
  const { jobs, loadMoreJobs } = useJobsContext();

  const { numFound, docs } = jobs;

  const handleLoadMore = async () => {
    await loadMoreJobs();
  };

  if (numFound === 0) return <h2>No Jobs</h2>;

  return (
    <>
      <Search />
      <FiltreCheckbox />
      <section>
        <strong>
          <h2>Total Jobs: {jobs.numFound}</h2>
        </strong>
        {docs.map((item) => (
          <JobCard item={item} />
        ))}

        {numFound === docs.length ? null : (
          <button onClick={handleLoadMore}>Load More Jobs</button>
        )}
      </section>
    </>
  );
};

export default Joburi;
