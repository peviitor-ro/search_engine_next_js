"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  numFound: number | undefined;
};

export default function Pagination({ numFound }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("pagina")) || 1;
  const perPage = 12;

  const prevPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("pagina", (currentPage - 1).toString());
    router.push(`${pathname}?${params}`);
  };

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("pagina", (currentPage + 1).toString());
    router.push(`${pathname}?${params}`);
  };

  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          prevPage();
        }}
      >
        prev page
      </button>

      <div>
        {currentPage} / {Math.ceil((numFound ?? 0) / perPage)}
      </div>
      <button
        disabled={currentPage === Math.ceil((numFound ?? 0) / perPage)}
        onClick={() => {
          nextPage();
        }}
      >
        next page
      </button>
    </div>
  );
}
