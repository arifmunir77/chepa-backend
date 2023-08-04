const Web3 = require("web3");
const { updateMintStatus } = require("../model/nftModel");
const { CONTRACT_ABI, CONTRACT_ADDRESS } = require("../contract");
const { saveEvent } = require("../model/eventModel");

let web3State = {
  web3: null,
  web3Socket: null,
  contractSocket: null,
  contract: null,
  socketUrl: "wss://goerli.infura.io/ws/v3/9043c5907b4f4696a35189799c013dee",
  rpc: "https://speedy-nodes-nyc.moralis.io/80308a68489ec7cfba4b7a43/eth/ropsten",
};

const loadBlockchain = async () => {
  try {
    const web3Socket = new Web3(
      new Web3.providers.WebsocketProvider(web3State.socketUrl)
    );
    const web3 = new Web3(web3State.rpc);

    web3State.contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    web3State.contractSocket = new web3Socket.eth.Contract(
      CONTRACT_ABI,
      CONTRACT_ADDRESS
    );
    web3State.web3 = web3;
    web3State.web3Socket = web3Socket;
  } catch (error) {
    console.log("error", error);
  }
};

const listMintEvents = () => {
  web3State.contractSocket.events.Transfer({}, async (error, event) => {
    console.log(event.returnValues, "resturnValues");

    //update the mint status after minting successfully
    const update = await updateMintStatus(+event.returnValues.tokenId);

    //save event into db
    const saved = await saveEvent(event.returnValues);
  });
};

module.exports = { web3State, listMintEvents, loadBlockchain };
