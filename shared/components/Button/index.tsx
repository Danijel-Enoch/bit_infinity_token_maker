import React from "react";
import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  return (
    <button
      {...rest}
      className={clsx("inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", rest.className)}
    >
      {children}
    </button>
  );
};

export default Button;

