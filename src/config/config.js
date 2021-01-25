require('dotenv').config()

const config = {
  infuraProvider: process.env.REACT_APP_PROVIDER,
  gasPriceURL: "https://gasprice.poa.network/",
  githubAPI: process.env.REACT_APP_GITHUB_API,
  etherscanAPI: process.env.REACT_APP_ETHERSCAN_API,
  etherscanAPIKey: process.env.REACT_APP_ETHERSCAN_KEY,
  supportedChainIDs :[1],
  liquidityAddress: '0x375Da3e307Ef2E1A9D9e1516f80738Ca52cb7B85',
  governanceAddress: '0x0bA94c028240Ed459E0982cE8406385a79BFab35',
  rewardsAddress: '0x0E3EF895c59E7Db27214AB5bbf56347cE115A3f4',

  keeperAddress: '0x0E3EF895c59E7Db27214AB5bbf56347cE115A3f4',
  keeperAddressLegacy :'0x5b3f693efd5710106eb2eac839368364acb5a70f',
  jobRegistryAddress: '0x183659D5088fFeeB57504B390D3bc4905e617D39',

  swapAddress : '0xF712977c9c201d012531085F01e168d05be590E5'

};

export default config;
