import deck from "../../assets/image/pattern-divider-desktop.svg";
import darkGreen from "../../assets/image/icon-dice.svg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
export const Advice = () => {
  const [quote, setQuote] = useState<string>("");
  const [loader, setLoader] = useState(true);

  const Fetcher = useMemo(() => {
    return quote ? `${quote}` : "no Quote";
  }, [quote]);

  const handleFetch = async () => {
    setLoader(true);
    const quoteApi = await axios("https://api.adviceslip.com/advice").then(
      (res) => {
        setLoader(false);
        return res.data.slip.advice;
      }
    );
    setQuote(quoteApi);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 5000);

    handleFetch();

    return () => {
      clearTimeout(timer);
    };
  }, [quote]);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="relative  w-11/12 xs:w-10/12 sm:w-7/12  md:w-5/12 text-center rounded shadow-[0_0_0_0] bg-[hsl(217_19%_38%)] p-4">
          <div>
            <p className="capitalize text-[hsl(150_100%_66%)] font-bold text-[.7rem]">
              advice #117
            </p>
          </div>
          <div className="my-2">
            {loader ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <q className="font-bold text-[1rem]">{Fetcher}</q>
            )}
          </div>
          <div className="flex items-center my-[2rem]">
            {/* <span className="w-full border"></span> */}
            <div className=" before:border h-[1px] after:border  flex justify-center before:w-full after:w-full w-full b">
              <img src={deck} alt="" className="w-[16vh] h-[.6vh]" />
            </div>
            {/* <span className="border w-fit"></span> */}
          </div>
          <div className="relative w-full mx-auto bg-red-500">
            <div className="h-[4vh] w-full  absolute  -top-[.6rem]">
              <button
                onClick={() => handleFetch()}
                className="left-0 right-0 w-[7vh] h-[7vh] cursor-pointer mx-auto bg-[hsl(150_100%_66%)] transition-all hover:shadow-[0_0_15px_3px] hover:shadow-[hsl(159_100%_64%)] rounded-full"
              >
                <div className="flex items-center justify-center h-full">
                  <img src={darkGreen} alt="" className="h-[2.5vh] w-[2.5vh]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
