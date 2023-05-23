import React from 'react';

const Button = ({
  buttonAction = () => {},
  buttonText,
  buttonColor = 'bg-theorange',
  buttonType = 'button',
}) => {
  return (
    <button
      className={`${buttonColor} whitespace-nowrap align-self-start relative flex flex-row gap-2 font-medium justify-center items-center false cursor-pointer hover:scale-[1.02] min-w-[112px] text-sm rounded-xl px-6 h-11 ease-in transition-transform bg-black text-white`}
      type={buttonType}
      onClick={buttonAction}
    >
      {buttonText}
    </button>
  );
};

export default Button;
