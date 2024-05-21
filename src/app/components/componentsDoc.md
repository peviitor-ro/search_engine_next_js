📚 `Components` Folder Documentation

This documentation provides a comprehensive overview of the files within the `Components` folder, detailing their purposes and functionalities. The Components folder consists of the following files:

1. 🔍 `Search.tsx`
2. 📝 `FiltreCheckbox.tsx`
3. 🔄 `CheckboxSkeleton.tsx`
4. 📋 `Joburi.tsx`
5. 📌 `JobCard.tsx`
6. 📑 `Pagination.tsx`
7. ⚙️ `Footer.tsx`

## More details

1. 🔍 `Search.tsx`

   ### Description

   - The `Search.tsx` file includes the input field for searching jobs by title. The `handleSubmit` function works by redirecting to the page `/rezultate?pagina=1` with all available jobs if the input is empty. If text is entered, it redirects to the specific job search results page `/rezultate?job=FrontEnd&pagina=1`. The `createQueryString` function takes two parameters: `name` and `value`. The `name` parameter is always job, and the `value` is the user's input. When the user presses `Enter` or clicks the `Cauta` button, this function is triggered, adding the job title to the URL.

2. 📝 `FiltreCheckbox.tsx`

   ### Description

   - The `FiltreCheckbox.tsx` file includes the checkboxes for filtering `job` listings. The `createQueryString` function, which takes `name` and `value` as parameters, is specifically used for filtering job types (`remote`, `on-site`, `hybrid`). When a checkbox is selected, this function is triggered, filtering the data accordingly and updating the URL with the selected job type (e.g., selecting the `remote` checkbox will display only remote jobs and add `tipJob=remote` to the URL). The `useEffect` hook fetches company data, which is then used in the `CheckBoxFilter` component (details about this component are provided below).

3. 🔄 `CheckboxSkeleton.tsx`

   ### Description

   - The `CheckboxSkeleton.tsx` file provides the skeleton structure for company and city checkboxes, along with a search feature to easily locate specific cities or companies. The `filteredItems` constant assists users in searching for a particular city or company. The `createQueryString` function, which takes `name` and `value` as parameters, updates the URL with the selected checkboxes and filters the data accordingly. Multiple checkboxes can be selected for filtering, allowing users to filter data from more than one company or city simultaneously.

4. 📋 `Joburi.tsx`

   ### Description

   - The `Joburi.tsx` file serves as the parent component for `JobCard.tsx`, passing data as a prop to be displayed. Before rendering the `JobCard.tsx` components, it also displays the total number of listed jobs.

<!-- ! need changes when the component is completed (logo companies)-->

5. 📌 `JobCard.tsx`

   ### Description

   - The `JobCard.tsx` file contains the design and layout for individual job cards.

<!-- ! need changes when the component is completed (ui + functionalities) -->

6. 📑 `Pagination.tsx`

   ### Description

   - The `Pagination.tsx` file manages the pagination of job listings. The `prevPage` and `nextPage` functions enable users to navigate to the previous or next page of job listings when the respective `Prev Page` or `Next Page` buttons are clicked.

7. ⚙️ `Footer.tsx`

   ### Description

   - The `Footer.tsx` contains links to our social media platforms and copyright information.
