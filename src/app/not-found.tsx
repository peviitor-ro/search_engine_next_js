import strut from "./assets/svg/strut.svg";
import Image from "next/image";
import CountdownButton from "./components/CountdownButton";
import Footer from "./components/Footer";

export default function FaraPagina() {
  return (
    <div className="landing-page flex flex-col h-screen items-center justify-between">
      <div>{/* for spacing */}</div>
      <div className="flex flex-col items-center justify-center gap-20 md:flex-row px-4">
        <div className="text-text_grey_darker">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold leading-none md:leading-16 text-left mb-4 md:mb-3">
            404 <br />
          </h1>
          <h4 className="lg:text-3xl md:text-2xl text-1xl text-base font-normal leading-5 md:leading-6 text-left">
            Pagina dorită nu a putut fi găsită
          </h4>
        </div>
        <Image className="w-250px h-56 md:w-1/5" src={strut} alt="not-found" />
      </div>
      <CountdownButton />
      <Footer />
    </div>
  );
}
