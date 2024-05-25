"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const DisplayFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const remote = searchParams.getAll("tipJob");
  const city = searchParams.getAll("oras");
  const company = searchParams.getAll("companie");

  const filtersArray = remote.concat(city, company);

  const handleDeleteAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("oras");
    params.delete("tipJob");
    params.delete("companie");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterDelete = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(name);
    console.log(currentValues);

    if (currentValues.includes(value)) {
      params.delete(name);
      currentValues
        .filter((val) => val !== value)
        .forEach((val) => {
          params.append(name, val);
        });

      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const renderJobType =
    remote.length > 0 &&
    remote.map((item) => (
      <li
        key={item}
        className="py-2 px-4 bg-background_green_light border-r rounded-3xl text-sm"
      >
        {item}
        <span
          className="cursor-pointer ml-2"
          onClick={() => handleFilterDelete("tipJob", item)}
        >
          X
        </span>
      </li>
    ));

  const renderCity =
    city.length > 0 &&
    city.map((item) => (
      <li
        key={item}
        className="py-2 px-4 bg-background_green_light border-r rounded-3xl text-sm"
      >
        {item}
        <span
          className="cursor-pointer ml-2"
          onClick={() => handleFilterDelete("oras", item)}
        >
          X
        </span>
      </li>
    ));

  const renderCompany =
    company.length > 0 &&
    company.map((item) => (
      <li
        key={item}
        className="py-2 px-4 bg-background_green_light border-r rounded-3xl text-sm"
      >
        {item}
        <span
          className="cursor-pointer ml-2"
          onClick={() => handleFilterDelete("companie", item)}
        >
          X
        </span>
      </li>
    ));

  return (
    <div className="pb-9 flex flex-wrap max-w-7xl">
      <ul className="flex gap-2 flex-wrap">
        {renderCompany}
        {renderCity} {renderJobType}
      </ul>
      {filtersArray.length > 0 && (
        <span
          className="self-center ml-3 border-l-2 pl-3 border-black cursor-pointer"
          onClick={handleDeleteAll}
        >
          Sterge Filtre
        </span>
      )}
    </div>
  );
};

export default DisplayFilters;
