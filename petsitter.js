const { Console } = require("console");

async function Launcher() {
    const myAddress = require("./config.js")["config"]["myAddress"];
    const MyAccount = require("./MyAddress.js")["NewAccount"];
    const Web3 = require("web3");
    const provider = require("./config.js")["config"]["provider"];
    const web3 = new Web3(provider);
    const petABI = require("./petABI.js")["petABI"];
    const gotchiFacetABI = require("./gotchiFacetABI.js")["gotchiFacetABI"];
    const diamondAddress = require("./config.js")["config"]["diamondAddress"];
    const contractpet = new web3.eth.Contract(petABI, diamondAddress);
    const contractGotchi = new web3.eth.Contract(gotchiFacetABI, diamondAddress);
    let GasPrice = await web3.eth.getGasPrice();
    let nonce = await web3.eth.getTransactionCount(myAddress, "pending");
    GasPrice =
      parseInt(GasPrice) +
      parseInt(web3.utils.toHex(web3.utils.toWei("0.8888", "gwei")));
    GasPrice = GasPrice.toFixed(0);
  
    const rawTransaction = {
      from: myAddress,
      to: myAddress,
      value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
      gasPrice: GasPrice,
      gas: 21000,
      chainId: 137,
      nonce: nonce,
    };

    async function findMyGotchis() {
      
    let tellGotchis = await contractGotchi.methods
    .tokenIdsOfOwner(myAddress)
    .call();

    let GotchiArray = [];

    for (i in tellGotchis) {
    GotchiArray.push(parseInt(tellGotchis[i]));
    }
    return GotchiArray
    };

    async function sleep(ms) {
      return new Promise(
        resolve => setTimeout(resolve, ms)
      );
    };



    async function sync() {
      yourGotchis = await contractGotchi.methods
        .allAavegotchisOfOwner(myAddress)
        .call();
      GotchiLastInteracted = yourGotchis[0]["lastInteracted"] * 1000;
      DateNow = Date.now();
      Timeremaining = GotchiLastInteracted + 43200000 - DateNow;
      return Timeremaining;
    }
  
    async function FillRawTx() {
      let GotchiArray = await findMyGotchis()
      rawTransaction.data = contractpet.methods.interact(GotchiArray).encodeABI();
      rawTransaction.to = diamondAddress;
      rawTransaction.gas = 100000;
      rawTransaction.nonce = await web3.eth.getTransactionCount(
        myAddress,
        "pending"
      );
  
      return rawTransaction;
    }
  
    async function petTheGotchi() {
      await sync();
      console.log(Timeremaining, "time for next pet");
      if (Timeremaining < 0) {
        await FillRawTx();
        signedTx = await MyAccount.signTransaction(rawTransaction);
        try {
          sendTx = await web3.eth
            .sendSignedTransaction(signedTx.rawTransaction)
            .on("receipt", function (receipt) {
              console.log(receipt);
              console.log("Aavegotchi got his pet pet, he is happy now");
            });
        } catch (error) {
          console.log(error);
          await sleep(20000)
          console.log("oh no an error")
          await petTheGotchi();
        }
      } else {
        console.log("Gotchi Already happy ser, wait a bit", Timeremaining);
        
      }
  
      delete rawTransaction.nonce;
      console.log("ah damn he we go again");
    }
    await sleep(20000)
    setInterval(petTheGotchi, 100000)
  }
  Launcher();
  
