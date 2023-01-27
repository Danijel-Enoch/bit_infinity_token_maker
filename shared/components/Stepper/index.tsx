import React from "react";
import clsx from "clsx";

interface Props {
  steps: {content: JSX.Element | string; text: JSX.Element | string}[];
  step: number;
  classes?: Partial<Record<string, string>>;
  column?: boolean;
}

const Stepper: React.FunctionComponent<Props> = (props) => {
  const {steps, step, classes, column} = props;

  return (
    <div
      className={clsx(
        "w-full flex justify-around items-center",
        column && "flex-col align-around",
        classes?.root
      )}
    >
      {steps.map(({content, text}, index) => (
        <>
          <div className={clsx("flex items-center text-green-500", column && "h-20")}>
            <div
              className={clsx(
                "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-green-500 flex justify-center align-center",
                index === step && `bg-green-500 text-white`
              )}
            >
              {content}
            </div>
            <div
              className={clsx(
                "text-center w-32 text-xs font-medium uppercase text-green-500"
              )}
            >
              {text}
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div
              className={clsx(
                "flex-auto transition duration-500 ease-in-out border-green-500",
                column ? "h-20 border-l-2" : "w-20 border-t-2"
              )}
            ></div>
          )}
        </>
      ))}
    </div>
  );
};

export default Stepper;
