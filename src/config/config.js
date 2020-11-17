require('dotenv').config()

const config = {
  infuraProvider: process.env.REACT_APP_PROVIDER,
  gasPriceURL: "https://gasprice.poa.network/",
  githubAPI: process.env.REACT_APP_GITHUB_API,
  etherscanAPI: process.env.REACT_APP_ETHERSCAN_API,
  etherscanAPIKey: process.env.REACT_APP_ETHERSCAN_KEY,

  liquidityAddress: '0x375Da3e307Ef2E1A9D9e1516f80738Ca52cb7B85',
  governanceAddress: '0x0bA94c028240Ed459E0982cE8406385a79BFab35',
  rewardsAddress: '0x5b3f693efd5710106eb2eac839368364acb5a70f',

  keeperAddress: '0x5b3f693efd5710106eb2eac839368364acb5a70f',
  keeperAddressLegacy :'0xf771733a465441437EcF64FF410e261516c7c5F3',
  jobRegistryAddress: '0x3eB195B8BC0653E67f0aD14E0111755E01921B7D',

  swapAddress : '0x9BA7df487877A7E216856FBEeD93CE5920722cCa'

};

export default config;
