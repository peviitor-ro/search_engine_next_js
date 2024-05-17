import { Job } from "@/models/Jobs";
import imagesPlaceholder from "@/app/assets/svg/no-logo.svg";
import mapPin from "@/app/assets/svg/map_pin.svg";
import Image from "next/image";

type Props = {
  item: Job;
};

export default function JobCard({ item }: Props) {
  const { id, job_title, company_str, company, job_link, city, remote } = item;

  function displayLocation(cities: string[] | undefined) {
    return cities
      ? cities[0].toLowerCase() === "all"
        ? "Toate orasele"
        : cities.length > 5
        ? `${cities.slice(0, 5).join(", ")} + ${cities.length - 5}`
        : cities.join(", ")
      : remote?.join(", ");
  }

  return (
    <div className="w-[300px] md:w-[384px] min-h-[357px] bg-background_cards text-center flex flex-col justify-around items-center flex-wrap gap-3 px-4 py-[6px] rounded-2xl shadow-card_shadow hover:shadow-hover_card_shadow">
      <div className="flex items-center justify-center w-[200px] min-h-[100px]">
        <Image
          src={imagesPlaceholder}
          alt="no logo"
          className="max-w-[200px] max-h-[100px]"
        />
      </div>
      <div className="flex flex-col justify-between gap-5">
        <p className="leading-5">{company}</p>
        <p className="text-lg font-bold">{job_title}</p>
        <p>
          <Image src={mapPin} alt="map pin" className="px-4 h-[16px]" />
          {city || remote ? displayLocation(city) : "asd"}
        </p>
        <a
          href={job_link[0]}
          target="_blank"
          className="bg-background_green px-[40px] py-[14px] text-white rounded-3xl mx-auto hover:shadow-button_shadow"
        >
          Catre Site
        </a>
      </div>
    </div>
  );
}
