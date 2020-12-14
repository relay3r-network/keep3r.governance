export const OwnableABI = [{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"gbethelper","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"RLR","outputs":[{"internalType":"contract IKeep3rV1Mini","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"destructJob","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"executeSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"iGBETH","outputs":[{"internalType":"contract IGetBackETHHelperV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"workableQueue","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"workableSwap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];