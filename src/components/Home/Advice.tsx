import deck from "../../assets/image/pattern-divider-desktop.svg";
import darkGreen from "../../assets/image/icon-dice.svg";
import { useEffect, useState } from "react";
import axios from "axios";
export const Advice = () => {
  const [quote, setQuote] = useState<string>("");
  const [id, setId] = useState<number | string>("");

  const handleFetch = async () => {
    try {
      const { data } = await axios.get("https://api.adviceslip.com/advice");
      setQuote(data.slip.advice);
      setId(data.slip.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="relative  w-11/12 xs:w-10/12 sm:w-7/12  md:w-5/12 text-center rounded shadow-[0_0_0_0] bg-[hsl(217_19%_38%)] p-4">
          <div>
            <p className="capitalize text-[hsl(150_100%_66%)] font-bold text-[.7rem]">
              advice #{id}
            </p>
          </div>
          <div className="my-2">
            <q className="font-bold text-[1rem]">{quote}</q>
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
