"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import xIcon from "../assets/svg/remove.svg";

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

  function renderFilter(type: string[]) {
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

    const typeToDelete =
      type === remote ? "tipJob" : type === city ? "oras" : "companie";
    return (
      type.length > 0 &&
      type.map((item) => (
        <li
          key={item}
          className="py-2 px-4 bg-background_green_light border-r rounded-3xl text-sm flex items-center"
        >
          {item}
          <Image
            src={xIcon}
            className="cursor-pointer ml-2"
            alt="X icon delete"
            onClick={() => handleFilterDelete(typeToDelete, item)}
          />
        </li>
      ))
    );
  }

  return (
    <div className="pb-9 flex flex-wrap max-w-7xl">
      <ul className="flex gap-2 flex-wrap">
        {renderFilter(city)}
        {renderFilter(company)}
        {renderFilter(remote)}
      </ul>
      {filtersArray.length > 0 && (
        <div className="h-auto w-[1px] ml-4 bg-background_dark_blue flex">
          <hr></hr>
          <span className="cursor-pointer ml-4" onClick={handleDeleteAll}>
            Sterge Filtre
          </span>
        </div>
      )}
    </div>
  );
};

export default DisplayFilters;
