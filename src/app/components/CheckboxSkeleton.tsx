import { useEffect, useState } from "react";

type checkboxProps = {
  items: string[] | undefined;
  filterKey: string;
  searchFor: string;
  handleCheckBoxChange: (value: string, type: string) => void;
  company?: string[];
};
// Regular expressions for replacing special characters
const aREG = new RegExp("ș", "g");
const bREG = new RegExp("ț", "g");
const cREG = new RegExp("â", "g");
const dREG = new RegExp("ă", "g");
const eREG = new RegExp("î", "g");

// CheckboxFilter component for filtering items
const CheckboxFilter = ({
  items,
  filterKey,
  searchFor,
  company,
  handleCheckBoxChange,
}: checkboxProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  // Filtering items based on search query
  const filteredItems = items?.filter(
    (item) =>
      (searchQuery.length >= 1 &&
        item
          .toLowerCase()
          .replace(aREG, "s")
          .replace(bREG, "t")
          .replace(cREG, "a")
          .replace(dREG, "a")
          .replace(eREG, "i")
          .includes(searchQuery.toLowerCase())) ||
      item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Effect to handle error when no results are found
  useEffect(() => {
    setError(filteredItems?.length === 0 && searchQuery.length > 0);
  }, [filteredItems, searchQuery]);

  // Displaying filtered items
  const displayItems =
    searchQuery.length >= 1 ? filteredItems : items?.slice(0, 20);

  return (
    <div>
      <div>
        {/* <Image className="lupa" src={magnifyGlass} alt="magnify-glass" /> */}
        <input
          type="search"
          placeholder={`Cauta ${searchFor}`}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {error ? (
          <div>No results found for "{searchQuery}"</div>
        ) : (
          displayItems?.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={item}
                name={filterKey}
                value={item}
                checked={company && company.includes(item)}
                onChange={(e) =>
                  handleCheckBoxChange(e.target.value, filterKey)
                }
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckboxFilter;
