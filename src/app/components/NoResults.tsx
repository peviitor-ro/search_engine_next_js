import strut from "../assets/svg/strut.svg";
import Image from "next/image";

export default function FaraRezultate () {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 gap-20 md:flex-row">
      <div className="text">
        <h1 className="text-2x1 md:text-3xl font-semibold leading-none md:leading-16 text-left mb-4 md:mb-3">
          Ups! <br />
          Căutarea nu are <br /> rezultat
        </h1>
        <h4 className="text-base font-normal leading-5 md:leading-6 text-left">Elimină din filtre sau începe o căutare nouă</h4>
      </div>
      <Image className="w-1/2 h-56 md:w-1/5" src={strut} alt="not-found" />
    </div>
  );
};
