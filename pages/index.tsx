import React from "react";
import {useRouter} from "next/router";
import clsx from "clsx";
import Image from "next/image";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";

import metamaskImage from "../public/metamask.png";
import ethereumImage from "../public/ethereum.png";
import appImage from "../public/logo-1-light.png";

import Card from "../shared/components/Card";
import PriceCard from "../shared/components/PriceCard";
import prices from "../shared/constants/prices";
import Features from "../shared/constants/features";

interface LandingCardProps {
  headContent?: JSX.Element;
  content: string | JSX.Element;
  title: string;
  className?: string;
}


const LandingCard: React.FunctionComponent<LandingCardProps> = (props) => {
  const {headContent, content, title, className} = props;

  return (
    <Card className={clsx("w-72", className)}>
      {headContent && (
        <div className="flex justify-center w-40">
          <div className="w-24 h-24 my-4">{headContent}</div>
        </div>
      )}
      <div>
        <h4
          className={clsx(
            "text-lg mb-10 text-gray-800 font-bold text-center",
            !headContent && "mt-6"
          )}
        >
          {title}
        </h4>
        {content}
      </div>
    </Card>
  );
};

interface Props {}

const Landing: React.FunctionComponent<Props> = (props) => {
  const router = useRouter();

  return (
    <>
      <main
        className={clsx(
          "relative flex w-full flex-1 px-10 md:px-20 text-center",
          "bg-gradient-to-r from-two to-three"
        )}
      >
        <img
          src={"https://res.cloudinary.com/daniel23/image/upload/v1674907784/Ethereum_hjwpjh.png"}
          className="absolute right-10 top-40 w-80 h-74 opacity-20 "
        />
        <img
          src={"https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png"}
          className="absolute right-40 top-80 w-74 h-74 opacity-20 "
        />
        <img
          src={"https://res.cloudinary.com/daniel23/image/upload/v1674906215/Polygon-MATIC-Icon_eeqcsc.png"}
          className="absolute right-80 top-40 w-80 h-74 opacity-20"
        />
        
        <div className="relative w-full h-screen flex justify-between max-w-6xl items-center">
          <div className="max-w-md align-left flex flex-col fixed top-25">
            <h1 className="sm:text-5xl text-4xl font-bold text-white text-left leading-snug">
              Create <span className="text-four">tokens</span> for free, quick
              and easy
            </h1>
            <p className="text-white text-left">
              Choose between easy or complex tokens set up
            </p>
            <button
              className="p-2 bg-gray-100 rounded-md text-one my-4 w-40"
              onClick={() => router.push("/create")}
            >
              Start now
            </button>
          </div>
          <div className="absolute md:block hidden bottom-10 w-full flex justify-center">
            <a href="#content-2">
              <button className="py-2 px-8 bg-gray-100 rounded-full">
                Keep Reading <ArrowDownIcon className="ml-4" />
              </button>
            </a>
          </div>
        </div>
      </main>
      <div
        className="flex align-center flex-col w-full z-20 bg-white p-10 pt-20 pb-20 relative"
        id="content-2"
        style={{alignItems: 'center'}}
      >
        <h3 className="text-center text-3xl text-gray-800">How it works</h3>
        <p className="text-center">
          Easy deploy your cryptocurrency following these steps
        </p>
        <div className="flex justify-around sm:flex-row flex-col">
          <LandingCard
            className="h-96 bg-gray-100 transform translate-y-14"
            headContent={<Image src={metamaskImage} />}
            title="Download metamask"
            content={
              <div className="text-center text-gray-600">
                <p>
                  Go to{" "}
                  <a href="https://metamask.io/download.html">metamask.io</a>{" "}
                  and download the wallet
                </p>
                <p>You can also check wich wallets are available in the app</p>
              </div>
            }
          />
          <LandingCard
            className="mt-24"
            headContent={<Image src={ethereumImage} />}
            title="Configure your token"
            content={
              <div className="text-center text-gray-600">
                <p>Set its features, name, symbol, supply, etc.</p>
                <p>
                  You can start doing that <a href="#">here.</a>
                </p>
              </div>
            }
          />
          <LandingCard
            className="h-96 bg-gray-100 transform translate-y-14"
            headContent={<Image src={appImage} />}
            title="Fund your wallet with tokens"
            content={
              <div className="text-center text-gray-600">
                <p className="text-md">Fund your wallet with your token</p>
                <p className="text-md">You can also fund multiple wallets</p>
              </div>
            }
          />
        </div>
      </div>
      <div
        className="flex justify-start w-full z-10 bg-one p-10 flex-col relative"
      >
        <div className="text-center text-white">
          <h3 className="text-3xl">Pricing</h3>
          <p>{`Choose between ${prices.length} token prices`}</p>
        </div>
        <div className="flex items-center overflow-x-scroll overflow-y-hidden py-20">
          {prices.map((tkn, i) => (
            <div className="px-10 m-auto w-96 h-full" key={i}>
              <PriceCard
                classes={{root: "px-10 min-w-full"}}
                title={tkn.title}
                features={Object.values(tkn.conditions)}
                price={tkn.price}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex justify-start w-full z-10 bg-white p-10 flex-col relative"
      >
        <div className="text-center">
          <h3 className="text-3xl">Features</h3>
          <p>
            You will be able to choose from several features for your token.
          </p>
        </div>
        <div className="flex flex-wrap justify-center pt-10 pb-20 z-10 relative">
          {Features.map((feature, i) => (
            <div className="flex justify-center m-4" key={i}>
              <LandingCard
                title={feature.title}
                content={feature.content}
                className="bg-green"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex justify-start items-center w-full z-10 bg-three p-10 flex-col relative"
      >
        <div className="text-center text-white">
          <h3 className="text-3xl">Ready to deploy your Token?</h3>
          <p>
            Try building your ERC20 Token in less than a minute. You can try on
            Test Network before to go live.
          </p>
        </div>
        <button
          className="mt-10 text-2xl bg-gray-100 rounded-md text-one my-4 w-80 h-16"
          onClick={() => router.push("/create")}
        >
          Start now
        </button>
      </div>
    </>
  );
};

export default Landing;
