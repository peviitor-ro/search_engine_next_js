import { getNameOfCompanies } from "@/lib/fetchData";
import { useEffect, useState } from "react";
import CheckboxFilter from "./CheckboxSkeleton";
import { useJobsContext } from "../context/JobProvider";
import { CompaniesName } from "@/models/companiesSchema";

export default function FiltreCheckbox() {
  const [data, setData] = useState<CompaniesName | undefined>();
  const { remote, setRemote, city, setCity, company, setCompany } =
    useJobsContext();

  const handleCheckBoxChange = (value: string, type: string) => {
    // Define state object mapping
    const stateMap: Record<
      string,
      [string[], React.Dispatch<React.SetStateAction<string[]>>]
    > = {
      remote: [remote, setRemote],
      oras: [city, setCity],
      companie: [company, setCompany],
    };

    // Ensure type is valid
    if (stateMap[type]) {
      const [currentValues, setCurrentValues] = stateMap[type];
      const isChecked = currentValues.includes(value);

      // Update state based on current values
      if (isChecked) {
        const updatedValues = currentValues.filter((item) => item !== value);
        setCurrentValues(updatedValues);
      } else {
        setCurrentValues([...currentValues, value]);
      }
    } else {
      console.error(`Invalid type: ${type}`);
    }
  };

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

  // Rendering the component
  return (
    <div className="drop-down-parent">
      <div className="checkbox-remote">
        <div>
          <input
            type="checkbox"
            id="on-site"
            name="on-site"
            value="on-site"
            className="mdl"
            // checked={fields.remote.includes("on-site")}
            onChange={(e) => handleCheckBoxChange(e.target.value, "remote")}
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
            // checked={fields.remote.includes("hibrid")}
            onChange={(e) => handleCheckBoxChange(e.target.value, "remote")}
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
            // checked={fields.remote.includes("Remote")}
            onChange={(e) => handleCheckBoxChange(e.target.value, "remote")}
          />
          <label htmlFor="Remote">La distanță</label>
        </div>
      </div>

      <div className="checkbox-orase">
        <div>
          <input
            type="checkbox"
            id="Oradea"
            name="Oradea"
            value="Oradea"
            className="mdl"
            onChange={(e) => handleCheckBoxChange(e.target.value, "oras")}
          />
          <label htmlFor="Oradea">Oradea</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Iasi"
            name="Iasi"
            value="Iasi"
            onChange={(e) => handleCheckBoxChange(e.target.value, "oras")}
          />
          <label htmlFor="Iasi">Iasi</label>
        </div>
      </div>

      <CheckboxFilter
        items={data}
        filterKey="companie"
        searchFor="companie"
        handleCheckBoxChange={handleCheckBoxChange}
        company={company}
      />
    </div>
  );
}
