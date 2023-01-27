export const freePlan = {
  id: "0",
  title: "Free Token",
  price: 50,
  conditions: {
    ethereumCompatible: {
      title: "Ethereum compatible",
      available: true,
    },
    sourceCode: {
      title: "Verified source code",
      available: true,
    },
    erc20Compatible: {
      title: "ERC20 Complete",
      available: true,
    },
    removeCopyright: {
      title: "Remove copyright",
      available: false,
    },
    customizableDecimals: {
      title: "Customizable decimals",
      available: false,
    },
    customizableSupply: {
      title: "Customizable supply",
      available: false,
    },
    cappital: {
      title: "Custom max supply",
      available: false,
    },
    mintable: {
      title: "Mintable",
      available: false,
    },
    burnable: {
      title: "Burnable",
      available: false,
    },
  },
};

export const basePlan = {
  id: "1",
  title: "Basic Token",
  price: 150,
  conditions: {
    ethereumCompatible: {
      title: "Ethereum compatible",
      available: true,
    },
    sourceCode: {
      title: "Verified source code",
      available: true,
    },
    erc20Compatible: {
      title: "ERC20 Complete",
      available: true,
    },
    removeCopyright: {
      title: "Remove copyright",
      available: true,
    },
    customizableDecimals: {
      title: "Customizable decimals",
      available: false,
    },
    customizableSupply: {
      title: "Customizable supply",
      available: false,
    },
    cappital: {
      title: "Custom max supply",
      available: false,
    },
    mintable: {
      title: "Mintable",
      available: false,
    },
    burnable: {
      title: "Burnable",
      available: false,
    },
  },
};

export const customPlan = {
  id: "2",
  title: "Custom Token",
  price: 200,
  conditions: {
    ethereumCompatible: {
      title: "Ethereum compatible",
      available: true,
    },
    sourceCode: {
      title: "Verified source code",
      available: true,
    },
    erc20Compatible: {
      title: "ERC20 Complete",
      available: true,
    },
    removeCopyright: {
      title: "Remove copyright",
      available: true,
    },
    customizableDecimals: {
      title: "Customizable decimals",
      available: true,
    },
    customizableSupply: {
      title: "Customizable supply",
      available: true,
    },
    cappital: {
      title: "Custom max supply",
      available: false,
    },
    mintable: {
      title: "Mintable",
      available: false,
    },
    burnable: {
      title: "Burnable",
      available: false,
    },
  },
};

export const mintable = {
  id: "3",
  title: "Mintable Token",
  price: 250,
  conditions: {
    ethereumCompatible: {
      title: "Ethereum compatible",
      available: true,
    },
    sourceCode: {
      title: "Verified source code",
      available: true,
    },
    erc20Compatible: {
      title: "ERC20 Complete",
      available: true,
    },
    removeCopyright: {
      title: "Remove copyright",
      available: true,
    },
    customizableDecimals: {
      title: "Customizable decimals",
      available: true,
    },
    customizableSupply: {
      title: "Customizable supply",
      available: true,
    },
    cappital: {
      title: "Custom max supply",
      available: false,
    },
    mintable: {
      title: "Mintable",
      available: true,
    },
    burnable: {
      title: "Burnable",
      available: false,
    },
  },
};

export const unlimited = {
  id: "4",
  title: "Unlimited Token",
  price: 300,
  conditions: {
    ethereumCompatible: {
      title: "Ethereum compatible",
      available: true,
    },
    sourceCode: {
      title: "Verified source code",
      available: true,
    },
    erc20Compatible: {
      title: "ERC20 Complete",
      available: true,
    },
    removeCopyright: {
      title: "Remove copyright",
      available: true,
    },
    customizableDecimals: {
      title: "Customizable decimals",
      available: true,
    },
    customizableSupply: {
      title: "Customizable supply",
      available: true,
    },
    cappital: {
      title: "Custom max supply",
      available: true,
    },
    mintable: {
      title: "Mintable",
      available: true,
    },
    burnable: {
      title: "Burnable",
      available: false,
    },
  },
};

export const fullToken = {
  id: "5",
  title: "Full Token",
  price: 350,
  conditions: {
    ethereumCompatible: {
      title: "Ethereum compatible",
      available: true,
    },
    sourceCode: {
      title: "Verified source code",
      available: true,
    },
    erc20Compatible: {
      title: "ERC20 Complete",
      available: true,
    },
    removeCopyright: {
      title: "Remove copyright",
      available: true,
    },
    customizableDecimals: {
      title: "Customizable decimals",
      available: true,
    },
    customizableSupply: {
      title: "Customizable supply",
      available: true,
    },
    cappital: {
      title: "Custom max supply",
      available: true,
    },
    mintable: {
      title: "Mintable",
      available: true,
    },
    burnable: {
      title: "Burnable",
      available: true,
    },
  },
};

export default [freePlan, basePlan, customPlan, mintable, unlimited, fullToken];
