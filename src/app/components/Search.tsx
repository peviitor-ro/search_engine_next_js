"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useCallback } from "react";
import logo from "../assets/svg/logo.svg";
import magnifyGlass from "../assets/svg/magniy_glass_icon.svg";

function Search() {
  const [text, setText] = useState("");
  const searchParams = useSearchParams()!;

  const router = useRouter();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") {
      router.push(`/rezultate`);
    } else {
      router.push(`/rezultate?${createQueryString("q", text)}`);
    }
  };

  // remove text from input on X button.
  function handleClearX() {
    setText("");
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center pt-5 gap-2">
        {pathName.startsWith("/rezultate") && (
          <Link href="/" className="logo">
            <Image src={logo} alt="logo_peviitor" />
          </Link>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center md:flex-row relative gap-2"
        >
          <Image
            src={magnifyGlass}
            alt="magnify-glass"
            className="absolute top-4 left-4"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ce doriți să lucrați?"
            className="pl-12 w-[290px] h-[54px] md:w-[400px]  mb-3 md:mb-0 xl:w-[620px]  border rounded-full border-border_grey outline-none "
          />
          {text?.length !== 0 ? (
            <span
              className="absolute right-5 md:right-[148px] top-5 cursor-pointer"
              onClick={handleClearX}
            >
              <svg
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="15px"
                height="15px"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="m-auto bg-background_green text-white w-[122px] h-[54px] font-medium text-base px-10 py-3 rounded-full transition duration-300 ease-out hover:shadow-md focus:outline-none"
          >
            Caută
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
