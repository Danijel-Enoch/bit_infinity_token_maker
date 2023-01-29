import React from "react";
import {useRouter} from "next/router";
import axios from "axios";
import * as Yup from "yup";
import {Form, Formik, FormikValues} from "formik";

import tokens from "../../shared/web3/tokens";
import Button from "../../shared/components/Button";
import SelectInput from "../../shared/components/Select";
import Card from "../../shared/components/Card";
import TextInput from "../../shared/components/TextInput";
import Stepper from "../../shared/components/Stepper";
import Toggle from "../../shared/components/Toggle";
import Dialog from "../../shared/components/Dialog";
import tokenTypes from "../../shared/constants/prices";
import {
  deploy,
  makePayment,
  isWeb3Enabled,
  networkMapper,
  connectMetamask,
  ContractArguments,
} from "../../shared/web3";

const priceUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cbinance-coin%2Cuniswap%2Clink%2Cbitcoin%2Cshiba-inu&vs_currencies=usd";

interface Props {}

const Create: React.FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const [cryptoPrices, setCryptoPrices] = React.useState<Currency[]>([]);
  const [step, setStep] = React.useState(0);

  const onSubmit = async (
    data: ContractArguments & {tokenType: string; payment: string; network: string}
  ) => {
    try {
      setStep((prev) => prev + 1);
      const {price} = tokenTypes.find((tkn) => tkn.id === data.tokenType);
      const paymentToken = cryptoPrices.find((price) => price.id === data.payment);
      const provider = await isWeb3Enabled();
      console.log({data})

      if (!provider) return;

      console.log({price})
      if(price===0){
        setStep((prev) => prev + 1);
      const tx = await deploy(data);
      setStep(0);
      console.log({tx});
      }else{

      await makePayment({
        amount: price,
        paymentToken: {
          ...paymentToken,
          address: tokens[data.network][paymentToken.id].address,
        },
      }).then(async(res:any)=>{
        if(res){
        setStep((prev) => prev + 1);
      const tx = await deploy(data);
      setStep(0);
      console.log({tx});
        }
      });
    }
    } catch (err) {
      console.log({err});
    }
  };

  const initializeForm = async () => {
    try {
      await (window.ethereum as any).request({
        method: "wallet_switchEthereumChain",
        params: [{chainId: networkMapper.binance.id}],
      });
      const {data} = await axios.get(priceUrl);
      const paymentTokens = Object.entries(tokens.binance);
      const prices = paymentTokens.map((entry) => {
       // console.log({entry})
        const [match, pay] = entry;
        if (data[match]) return {...pay, price: data[match].usd, id: match};
        return {...pay, price: 1};
      });
      await connectMetamask()
      console.log({prices})
      setCryptoPrices(prices);
    } catch (err) {
      console.log("Error on initialize", err);
    }
  };

  React.useEffect(() => {
    initializeForm();
  }, []);

  return (
    <div className="flex md:justify-between justify-center items-center pt-24 p-10 md:p-24">
      <Formik
        validationSchema={Yup.lazy((values) =>
          Yup.object({
            symbol: Yup.string().required("Campo requerido"),
            name: Yup.string().required("Campo requerido"),
            decimals: Yup.string().required("Campo requerido"),
            initialSupply: Yup.string().required("Campo requerido"),
          })
        )}
        onSubmit={onSubmit as any}
        initialValues={{
          symbol: "MTKN",
          name: "My token",
          decimals: "18",
          initialSupply: "10000000",
          maxSupply: "10000000",
          cappital: "10000000",
          payment: "ethereum",
          network: "binance",
          tokenType: "0",
          burnable: false,
          mintable: false,
          pausable: false,
          cappable: false,
        }}
        enableReinitialize={false}
      >
        {({setFieldValue, values}: any) => {
          const currentToken = tokenTypes.find((tkn) => tkn.id === values.tokenType);
          const changeWalletAddress = async (
            nxtNetwork: "polygon" | "binance"
          ) => {
            await (window.ethereum as any).request({
              method: "wallet_switchEthereumChain",
              params: [{chainId: networkMapper[nxtNetwork].id}],
            });
            setFieldValue("network", nxtNetwork);
          };

          return (
            <>
              <div className="flex flex-col justify-around w-full md:w-2/3">
                <div
                  className="flex justify-around flex-col sm:flex-row w-full"
                  style={{alignItems: "center"}}
                >

                  {console.log({cryptoPrices})}
                  <SelectInput
                    onChange={(val) => setFieldValue("payment", val)}
                    value={values.payment}
                    label="Payment token"
                    classes={{root: "w-40"}}
                    options={cryptoPrices.map((currency) => ({
                      node: currency.name,
                      value: currency.id,
                      img: currency.img as any,
                    }))}
                  />
                  
                  <SelectInput
                    label='Token type '
                    value={values.tokenType}
                    classes={{root: "w-40"}}
                    onChange={(value: string) => setFieldValue("tokenType", value)}
                    options={tokenTypes.map(({id, title}) => ({node: title, value: id}))}
                  />
                  
                  <SelectInput
                    label="Network"
                    value={values.network}
                    classes={{root: "w-40"}}
                    onChange={changeWalletAddress}
                    options={[
                      {node: "Polygon", value: "polygon"},
                      {node: "Binance", value: "binance"},
                    ]}
                  />
                  Price:$
                  {(tokenTypes.find((tkn) => tkn.id === values.tokenType).price).toString()}
                </div>
                <Form
                  noValidate
                  className="w-full z-10 flex justify-center"
                  autoComplete="off"
                >
                  <Card className="w-full z-10 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <h4 className="text-lg text-center">Create {values.network==="binance"?"BEP20":"MRC20"} Token</h4>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <TextInput label="Token name" name="name" />
                      <TextInput label="Token symbol" name="symbol" />
                      <TextInput
                        label="Token decimals"
                        type="number"
                        name="decimals"
                        disabled={!currentToken.conditions.customizableDecimals.available}
                      />
                      <TextInput
                        label="Initial supply"
                        type="number"
                        name="initialSupply"
                        disabled={!currentToken.conditions.customizableSupply.available}
                      />
                      <TextInput
                        label="Max supply"
                        type="number"
                        name="maxSupply"
                        disabled={!currentToken.conditions.cappital.available}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 h-full">
                      <h4 className="text-center text-md mt-6 col-span-2">
                        Advanced configuration
                      </h4>
                      <div className="flex justify-around flex-col sm:flex-row mt-4">
                        <Toggle
                          label="Burnable"
                          value={values.burnable}
                          onChange={() => setFieldValue("burnable", !values.burnable)}
                          classes={{root: "flex-start flex sm:my-0 my-2"}}
                          disabled={!currentToken.conditions.burnable.available}
                        />
                        <Toggle
                          label="Mintable"
                          value={values.mintable}
                          onChange={() => setFieldValue("mintable", !values.mintable)}
                          classes={{root: "flex-start flex"}}
                          disabled={!currentToken.conditions.mintable.available}
                        />
                      </div>
                      <div className="flex justify-around flex-col sm:flex-row mt-4">
                        <Toggle
                          label="Pausable"
                          value={values.pausable}
                          onChange={() => setFieldValue("pausable", !values.pausable)}
                          classes={{root: "flex-start flex sm:my-0 my-2"}}
                        />
                        <Toggle
                          label="Cappable"
                          value={values.cappable}
                          onChange={() => setFieldValue("cappable", !values.cappable)}
                          classes={{root: "flex-start flex"}}
                          disabled={!currentToken.conditions.cappital.available}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Button type="submit">submit</Button>
                    </div>
                    <Dialog></Dialog>
                  </Card>
                </Form>
              </div>
            </>
          );
        }}
      </Formik>
      <div className="w-1/4 hidden md:block">
        <Stepper
          steps={[
            {text: "Set your token features", content: "1"},
            {text: "Submit and accept payment", content: "2"},
            {text: "Accept token creation", content: "3"},
          ]}
          step={step}
          column
        />
      </div>
    </div>
  );
};

export default Create;
