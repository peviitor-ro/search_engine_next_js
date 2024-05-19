"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CheckboxFilter from "./CheckboxSkeleton";
import { CompaniesName } from "@/models/dataSchema";
import { getNameOfCompanies } from "@/lib/fetchData";

function FiltreCheckbox() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const remote = searchParams.getAll("tipJob");
  const city = searchParams.getAll("oras");
  const company = searchParams.getAll("companie");
  const [data, setData] = useState<CompaniesName | undefined>();

  // Get a new searchParams string by merging the current
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      if (remote.includes(value)) {
        // If the radio button is already checked, uncheck it
        currentParams.delete(name);
      } else {
        // Otherwise, set the radio button value
        currentParams.set(name, value);
      }

      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [searchParams, pathname, router, remote]
  );

  // Fetching company data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: CompaniesName | undefined = await getNameOfCompanies();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="checkbox-remote">
        <div>
          <input
            type="checkbox"
            id="on-site"
            name="on-site"
            value="on-site"
            className="mdl"
            checked={remote?.includes("on-site")}
            onChange={(e) => createQueryString("tipJob", e.target.value)}
          />
          <label htmlFor="on-site">La fata locului</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="hibrid"
            name="hibrid"
            value="hibrid"
            className="mdl"
            checked={remote?.includes("hibrid")}
            onChange={(e) => createQueryString("tipJob", e.target.value)}
          />
          <label htmlFor="hibrid">Hibrid</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Remote"
            name="remote"
            value="Remote"
            className="mdl"
            checked={remote?.includes("Remote")}
            onChange={(e) => createQueryString("tipJob", e.target.value)}
          />
          <label htmlFor="Remote">La distanță</label>
        </div>
      </div>

      <CheckboxFilter
        items={data}
        filterKey="companie"
        searchFor="companie"
        checked={company}
      />
    </div>
  );
}

export default FiltreCheckbox;
