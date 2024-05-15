import Joburi from "@/app/components/Joburi";

export default function SearchResults({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
    company: string | undefined;
    remote: string | undefined;
  };
}) {
  return (
    <Joburi
      q={searchParams.q}
      remote={searchParams.remote}
      company={searchParams.company}
    />
  );
}
