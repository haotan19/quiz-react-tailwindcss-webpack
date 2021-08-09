import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

const SpecialOffer = () => {
  const [active, setActive] = useState(true);
  const [inputActive, setInputActive] = useState(false);
  const widthFit = {
    width: "fit-content",
  };
  if (active)
    return (
      <div className="w-full h-full bg-white relative z-10">
        <div className="w-full h-2/5"></div>
        <div className="w-full flex justify-center transform -translate-y-1/2">
          <div className="inline-block border text-xl px-7 py-2 bg-white">
            SPECIAL OFFER
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-2/5">
          <p className="text-xl">Sign up for our newsletter &</p>
          <h4 className="text-2xl mb-10">
            Get 30% OFF for your first purchase!
          </h4>
          <input
            className="focus:outline-none mb-2 text-center"
            placeholder="Your Beautiful Email"
            style={widthFit}
            onFocus={() => {
              setInputActive(true);
            }}
          />
          <InputBottomBar inputActive={inputActive} />
          <button
            className="inline-block bg-black text-white uppercase py-2 px-14 
          hover:text-black hover:bg-white border-2 border-opacity-0 hover:border-opacity-100 transition-all"
            style={widthFit}
          >
            subscribe
          </button>
        </div>
        <button
          className="p-2 bg-white absolute top-4 right-0"
          onClick={() => setActive(false)}
        >
          <GrClose />
        </button>
      </div>
    );
  else return <></>;
};

interface Props {
  inputActive: boolean;
}

const InputBottomBar = ({ inputActive }: Props) => {
  const styleGray = {
    height: "1px",
    backgroundColor: "#D6D6D6",
  };
  const style = {
    height: "2px",
    width: 305,
    MaxWidth: "90vw",
    backgroundColor: "#FFC8C8",
  };
  return (
    <div className="mb-8">
      <div
        className={
          "transition transform scale-x-0 " + (inputActive ? "scale-x-100" : "")
        }
        style={style}
      ></div>
      <div
        className={
          "transition transform scale-x-100 " + (inputActive ? "scale-x-0" : "")
        }
        style={styleGray}
      ></div>
    </div>
  );
};

export default SpecialOffer;
