Documentation for Jobs Context Provider

- Usage

  - Import the `JobsProvider` component and wrap your application (or a specific part of it) with this provider to make the job context available throughout.
  - Use the `useJobsContext` hook within functional components to access job data and related functions.

- Jobs Context API

  - Context state:
    - `jobs` (`JobsResults`): An object representing job-related data.
    - `currentPage ` (`number`): The current page number of job listings.
    - `remote ` (`string[]`): Array of selected remote work options.
    - `city  ` (`string[]`): Array of selected city names.
    - `company ` (`string[]`): Array of selected company names.
  - Context Actions:
    - `setQ`: Update the search query string.
    - `setRemote`: Update the selected remote work options.
    - `setCity`: Update the selected city names.
    - `setCompany`: Update the selected company names.
    - `fetchJobs(page: number)`: Fetch job listings for a specific page.
    - `loadMoreJobs()`: Load more job listings from the next page.

- Notes
  - Ensure that components using the Jobs context are rendered within the `JobsProvider` component hierarchy.
  - The context automatically fetches job data when search parameters (`q`, `city`, `company`, `remote`) change.
  - Use the provided functions (`fetchJobs`, `loadMoreJobs`) to interact with job data and implement pagination.
