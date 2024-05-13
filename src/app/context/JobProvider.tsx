"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { JobsResults } from "@/models/Jobs";
import { createSearchString } from "@/lib/createSearchString";
import fetchData from "@/lib/fetchData";

// Define a type for the context state
type JobsContextType = {
  jobs: JobsResults;
  q: string | undefined;
  setQ: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentPage: number;
  remote: string[];
  setRemote: React.Dispatch<React.SetStateAction<string[]>>;
  city: string[];
  setCity: React.Dispatch<React.SetStateAction<string[]>>;
  company: string[];
  setCompany: React.Dispatch<React.SetStateAction<string[]>>;
  fetchJobs: (page: number) => Promise<void>;
  loadMoreJobs: () => Promise<void>;
};

// Create the context
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Custom hook to use the Jobs context
export const useJobsContext = (): JobsContextType => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobsContext must be used within a JobsProvider");
  }
  return context;
};

// Provider component
const JobsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<{ numFound: number; docs: any[] }>({
    numFound: 0,
    docs: [],
  });
  const [q, setQ] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [remote, setRemote] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);

  // Function to fetch jobs for a specific page
  const fetchJobs = async (page: number) => {
    const queryString = createSearchString(
      q,
      city,
      "",
      "România",
      company,
      remote,
      page
    );
    const fetchedJobs: JobsResults | undefined = await fetchData(queryString);
    if (fetchedJobs) {
      setJobs((prevJobs) => ({
        numFound: fetchedJobs.numFound,
        docs:
          page === 1
            ? fetchedJobs.docs
            : [...prevJobs.docs, ...fetchedJobs.docs],
      }));
      setCurrentPage(page);
    }
  };

  // Function to load more jobs from the next page
  const loadMoreJobs = async () => {
    await fetchJobs(currentPage + 1);
  };

  // Fetch initial jobs when component mounts or dependencies change
  useEffect(() => {
    fetchJobs(1);
  }, [q, city, company, remote]);

  // Provide the context value to consuming components
  return (
    <JobsContext.Provider
      value={{
        jobs,
        q,
        setQ,
        currentPage,
        remote,
        setRemote,
        city,
        setCity,
        company,
        setCompany,
        fetchJobs,
        loadMoreJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export default JobsProvider;
