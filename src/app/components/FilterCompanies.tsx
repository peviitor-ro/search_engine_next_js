"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import magnifyGlass from "@/app/assets/svg/magniy_glass_icon.svg";
import { CompaniesName } from "@/models/dataSchema";
import { getNameOfCompanies } from "@/lib/fetchData";

type checkboxProps = {
  dropDown: boolean[];
};

// Custom debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const FilterCompanies = ({ dropDown }: checkboxProps) => {
  // State to store the input value
  const [inputCompany, setInputCompany] = useState("");
  const [data, setData] = useState<CompaniesName | undefined>([]);
  // State to store the filtered list of cities
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const company = searchParams?.getAll("companie");

  const debouncedInputCompany = useDebounce(inputCompany, 300);
  // Empty the search value when dropdown its closed
  useEffect(() => {
    if (dropDown[0] || dropDown[1]) {
      setInputCompany("");
    }
  }, [dropDown]);

  // Fetching company data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNameOfCompanies(debouncedInputCompany);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (
      debouncedInputCompany.length > 2 ||
      debouncedInputCompany.length === 0
    ) {
      fetchData();
    } else if (
      debouncedInputCompany.length > 0 &&
      debouncedInputCompany.length < 3
    ) {
      setData([]);
      setError(
        "Te rugăm să introduci cel puțin 3 litere pentru a începe căutarea."
      );
    }
  }, [debouncedInputCompany]);

  // Function to handle changes in the input field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputCompany(value);
  };

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
          value={inputCompany}
          placeholder={`Cauta companie`}
          onChange={handleInputChange}
          className="border-0 outline-none py-[10px] text-sm w-[190px] rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2 py-[1px] px-1 max-w-[230px] h-[220px] overflow-y-auto scrollbar-class overflow-x-hidden">
        {inputCompany.length > 0 && inputCompany.length < 3 && (
          <p className="info-message">{error}</p>
        )}

        {Array.isArray(data) ? (
          data?.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={item}
                name="companie"
                value={item}
                checked={company?.includes(item)}
                onChange={(e) => createQueryString("companie", e.target.value)}
                className="accent-background_green"
              />
              <label htmlFor={item} className="pl-1 cursor-pointer">
                {item}
              </label>
            </div>
          ))
        ) : (
          <div className="error-message">{data?.message}</div>
        )}
      </div>
    </div>
  );
};

export default FilterCompanies;
