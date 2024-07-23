"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import magnifyGlass from "@/app/assets/svg/magniy_glass_icon.svg";

type checkboxProps = {
  items: string[] | undefined;
  filterKey: string;
  searchFor: string;
  checked?: string[];
  dropDown: boolean[];
};

// CheckboxFilter component for filtering items
const CheckboxFilter = ({
  items,
  filterKey,
  searchFor,
  checked,
  dropDown,
}: checkboxProps) => {
  // State to store the input value
  const [inputValue, setInputValue] = useState("");
  // State to store the filtered list of cities
  const [filteredItems, setFilteredItems] = useState(items);
  const [error, setError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Empty the search value when dropdown its closed
  useEffect(() => {
    if (dropDown[0] || dropDown[1]) {
      setInputValue("");
      setFilteredItems(items);
    }
  }, [dropDown, items]);

  // Function to handle changes in the input field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Get the current value of the input field
    setInputValue(value); // Update the state with the new input value

    // Create a regular expression to match the input value at the start of items names
    const regex = new RegExp(`^${normalizeString(value)}`, "i"); // Normalize the input value before creating the regex

    // Filter the items array based on the normalized input value
    const filtered = items?.filter((data) =>
      normalizeString(data).match(regex)
    );

    // Update the state with the filtered list of items
    setFilteredItems(filtered);
  };

  // Function to normalize strings by removing diacritical marks (accents)
  const normalizeString = (str: string) => {
    // Normalize the string to decompose characters and diacritics
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // \u0300-\u036f is a range of Unicode for diacritical marks
  };

  // Effect to handle error when no results are found
  useEffect(() => {
    setError(filteredItems?.length === 0 && inputValue.length > 0);
  }, [filteredItems, inputValue]);

  const displayItems =
    inputValue.length >= 1 ? filteredItems : filteredItems?.slice(0, 25);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      const currentValues = params.getAll(name);

      if (currentValues.includes(value)) {
        // Remove the value if it exists
        params.delete(name);
        // Set the page parameter to 1 when applying filters
        params.set("pagina", "1");
        currentValues
          .filter((val) => val !== value)
          .forEach((val) => {
            params.append(name, val);
            // Set the page parameter to 1 when applying filters
            params.set("pagina", "1");
          });
      } else {
        // Add the value if it doesn't exist
        params.append(name, value);
        // Set the page parameter to 1 when applying filters
        params.set("pagina", "1");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  return (
    <div>
      <div className="flex items-center gap-1 px-[2px] border-b-[1px] border-border_grey">
        <Image
          src={magnifyGlass}
          alt="magnify-glass"
          className="relative left-0 w-[20px] ml-1"
        />
        <input
          type="search"
          value={inputValue}
          placeholder={`Cauta ${searchFor}`}
          onChange={handleInputChange}
          className="border-0 outline-none py-[10px] text-sm w-[190px] rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2 py-[1px] px-1 max-w-[230px] h-[220px] overflow-y-auto scrollbar-class overflow-x-hidden">
        {error ? (
          <div>Nu există rezultate "{inputValue}"</div>
        ) : (
          displayItems?.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={item}
                name={filterKey}
                value={item}
                checked={checked?.includes(item)}
                onChange={(e) => createQueryString(filterKey, e.target.value)}
                className="accent-background_green"
              />
              <label htmlFor={item} className="pl-1 cursor-pointer">
                {item}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckboxFilter;
