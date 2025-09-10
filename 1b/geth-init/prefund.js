const from = eth.accounts[0];
const contractDeployer = "0x404fa3f0Acf620e3d2A3c6aa80E27b07C830EB5a";

// Ensure gas price meets base fee on Geth 1.15 dev chain
var oneGwei = web3.toWei(1, "gwei");
var txHash = eth.sendTransaction({
  from: from,
  to: contractDeployer,
  value: web3.toWei(10, "ether"),
  gasPrice: oneGwei,
});
txHash;
// PK: be44593f36ac74d23ed0e80569b672ac08fa963ede14b63a967d92739b0c8659
