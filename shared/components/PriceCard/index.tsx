import React from "react";
import clsx from "clsx";

const checkIcon = (
    <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
);
const forbidIcon = (
    <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
);

interface Props {
    title: string;
    price: number;
    features: {title: string; available: boolean}[];
    classes?: Partial<Record<"root", string>>;
}

const PriceCard: React.FunctionComponent<Props> = (props) => {
    const {features, title, price, classes} = props;

    return (
        <div
            className={clsx(
                "w-full h-full px-4 py-4 bg-white mt-6 shadow-lg rounded-lg",
                classes?.root
            )}
        >
            <div className="px-6 py-8 w-60">
                <div className="text-center w-full">
                    <span className="rounded-full text-lg leading-5">
                        {title}
                    </span>
                </div>
                <div className="mt-4 text-6xl text-center font-extrabold w-full">
                    {`$${price}`}
                </div>
            </div>
            <p className="text-md mt-4">Plan include :</p>
            <ul className="text-sm w-full mt-6 mb-6">
                {features.map((feature, i) => (
                    <li className="mb-3 flex items-center " key={i}>
                        <svg
                            className="h-6 w-6 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="6"
                            stroke="currentColor"
                            fill={feature.available ? "green" : "red"}
                            viewBox="0 0 1792 1792"
                        >
                            {feature.available ? checkIcon : forbidIcon}
                        </svg>
                        {feature.title}
                    </li>
                ))}
            </ul>
            <button
                type="button"
                className="w-full px-3 py-3 text-sm shadow rounded-lg text-green-500 hover:text-white bg-white hover:bg-green-500 transition-colors duration-700 transform"
            >
                Continue
            </button>
        </div>
    );
};

export default PriceCard;
