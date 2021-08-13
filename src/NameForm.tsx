import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { identifyName } from "./klaviyo";

interface Props {
  NameFormActive: boolean;
  setNameFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNameSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameForm = ({
  NameFormActive,
  setNameFormActive,
  setNameSubmitted,
}: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const changeFirstName = (event: any) => {
    setFirstName(event.target.value);
  };
  const changeLastName = (event: any) => {
    setLastName(event.target.value);
  };
  const zIndex = {
    zIndex: 55,
  };
  if (NameFormActive)
    return (
      <div className="w-full h-full bg-white relative " style={zIndex}>
        <div className="quiz-so__image h-1/2"></div>
        <div className="flex flex-col justify-center items-center h-2/5">
          <h4 className="text-2xl mb-4 mt-12 normal-case tracking-normal">
            What is your email?
          </h4>
          <div className="quiz-newsletter__input-wrapper">
            <input
              className="quiz-name-form__input text-center"
              placeholder="First Name"
              onChange={changeFirstName}
            />
            <input
              className="quiz-name-form__input text-center"
              placeholder="First Name"
              onChange={changeLastName}
            />
          </div>
          <button
            className="inline-block bg-black text-white uppercase py-2 px-14 
                     hover:text-black hover:bg-white border-2 border-opacity-0 hover:border-opacity-100 transition-all
                       quiz-newsletter__next-btn"
            onClick={() => {
              try {
                identifyName(firstName, lastName);
              } catch (err) {
                console.error(err);
              }
              setNameSubmitted(true);
              setNameFormActive(false);
            }}
          >
            NEXT
          </button>
          <button
            className="quiz-newsletter__skip-btn"
            onClick={() => setNameFormActive(false)}
          >
            Skip for now
          </button>
        </div>
        <button
          className="p-2 bg-white absolute top-4 right-0"
          onClick={() => setNameFormActive(false)}
        >
          <GrClose />
        </button>
      </div>
    );
  else return <></>;
};

export default NameForm;
