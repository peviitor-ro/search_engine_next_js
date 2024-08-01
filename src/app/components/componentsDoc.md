📚 `Components` Folder Documentation

This documentation provides a comprehensive overview of the files within the `Components` folder, detailing their purposes and functionalities. The Components folder consists of the following files:

1. 🔍 `Search.tsx`
2. 📝 `FilterCheckbox.tsx`
3. 🔄 `FilterCompanies.tsx`
4. 🔄 `FilterCities.tsx`
5. 📋 `Joburi.tsx`
6. 📌 `JobCard.tsx`
7. 📌 `JobCardSkeleton.tsx`
8. 📑 `Pagination.tsx`
9. ⚙️ `Footer.tsx`
10. 🙅‍♂️ `NoResults.tsx`

## More details

1. 🔍 `Search.tsx`

   ### Description

   - The `Search.tsx` file includes the input field for searching jobs by title. The `handleSubmit` function works by redirecting to the page `/rezultate?pagina=1` with all available jobs if the input is empty. If text is entered, it redirects to the specific job search results page `/rezultate?job=FrontEnd&pagina=1`. The `createQueryString` function takes two parameters: `name` and `value`. The `name` parameter is always job, and the `value` is the user's input. When the user presses `Enter` or clicks the `Cauta` button, this function is triggered, adding the job title to the URL.

2. 📝 `FilterCheckbox.tsx`

   ### Description

   - The `FilterCheckbox.tsx` file includes the checkboxes for filtering `job` listings. The `createQueryString` function, which takes `name` and `value` as parameters, is specifically used for filtering job types (`remote`, `on-site`, `hybrid`). When a checkbox is selected, this function is triggered, filtering the data accordingly and updating the URL with the selected job type (e.g., selecting the `remote` checkbox will display only remote jobs and add `tipJob=remote` to the URL). The `useEffect` hook fetches company data, which is then used in the `CheckBoxFilter` component (details about this component are provided below).

3. 🔄 `FilterCompanies.tsx`

   ### Description

   - The `FilterCompanies.tsx` is a component used to filter a list of companies based on a search input and checkboxes.
   - `useDebounce`: A custom debounce hook used to delay the fetching of company data.
   - `fetchData`: A function that fetches company data based on the debounced input value.
   - `handleInputChange`: A function called when the search input field changes, which updates the inputCompany state.
   - `createQueryString`: A function called when a checkbox is checked or unchecked, which updates the URL query string with the selected company values.

4. 🔄 `FilterCities.tsx`

   ### Description

   - The `FilterCities.tsx` manages the filtering of cities based on a search input and checkboxes.
   - `handleInputChange`: Handles changes to the search input field, updating the inputValue state and filtering the list of cities.
   - `createQueryString`: Updates the URL query string with the selected city values when a checkbox is checked or unchecked.
   - `normalizeString`: Normalizes strings by removing diacritical marks (accents) for filtering purposes.
   - `useEffect`: Handles the error state when no results are found for the search input value.

5. 📋 `Joburi.tsx`

   ### Description

   - The `Joburi.tsx` file serves as the parent component for `JobCard.tsx`, passing data as a prop to be displayed. Before rendering the `JobCard.tsx` components, it also displays the total number of listed jobs.

6. 📌 `JobCard.tsx`

   ### Description

   - The `JobCard.tsx` file contains the design and layout for individual job cards.

7. 📌 `JobCardSkeleton.tsx`

   ### Description

   - The `JobCardSkeleton.tsx` file contains the design for the loading job cards.

8. 📑 `Pagination.tsx`

   ### Description

   - The `Pagination.tsx` file manages the pagination of job listings. Key functions within this file include:
     - `prevPage`: Allows users to navigate to the previous page of job listings.
     - `nextPage`: Enables navigation to the next page of job listings
     - `firstPage`: Takes users to the first page of job listings.
     - `lastPage`: Directs users to the last page of job listings.
     - `goToPage`: Facilitates navigation to a specific page.
     - `getPageNumbers`: Generates an array of page numbers for rendering pagination controls.

9. ⚙️ `Footer.tsx`

   ### Description

   - The `Footer.tsx` contains links to our social media platforms and copyright information.

10. 🙅‍♂️`NoResults.tsx`

### Description

- The `NoResults.tsx` file renders a user interface when a search yields no results. This component is designed to provide a user-friendly message and graphic indicating that no search results were found, along with a suggestion to modify the search criteria or start a new search.
