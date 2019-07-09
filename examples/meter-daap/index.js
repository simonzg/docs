const fs = require("fs");
const meterify = require("meterify").meterify;
const Web3 = require("web3");
const web3 = meterify(new Web3(), "http://test.meter.io:8669");

var accounts = createAccounts({"alice":{},"bob":{}});
addAccountsToWallet(accounts);

//send_MTR(accounts.alice.address, accounts.bob.address);
//send_MTRG(accounts.alice.address, accounts.bob.address);

var data = loadContract('sample_token.sol');

//deployContract(data,accounts.alice.address);

function createAccounts(accounts){
  console.log("Creating Accounts");

  for(key in accounts){
    accounts[key] = web3.eth.accounts.create();
    console.log("Account "+accounts[key].address+" Created.");
  }

  console.log("All Accounts Created");
  return accounts;
}

function addAccountsToWallet(accounts){
  console.log("Adding Accounts to Wallet");

  for(var key in accounts){
    web3.eth.accounts.wallet.add(accounts[key].privateKey);
    console.log("Added Private Key "+accounts[key].privateKey+" to Wallet");
  }

  console.log("Added All Accounts to Wallet");
  //web3.eth.accounts.wallet;
  return;
}

function send_MTR(fromAddress,toAddress){
  console.log("Sending MTR from Alice to Bob");

  web3.eth.sendTransaction(
    {
      from: fromAddress,
      to: toAddress,
      value: '1000000000000000000',
      data: '00'
    }
  ).then(
    receipt => {}
  ).then(
    data => {
      console.log("MTR sent from Alice to Bob: "+JSON.stringify(data));
      next();
    }
  ).catch(function(error){
    console.log("Error: "+error);
  });
}

function send_MTRG(fromAddress,toAddress){
  console.log("Sending MTRG from Alice to Bob");

  web3.eth.sendTransaction(
    {
      from: fromAddress,
      to: toAddress,
      value: '1000000000000000000',
      data: '01'
    }
  ).then(
    receipt => {}
  ).then(
    data => {
      console.log("MTRG sent from Alice to Bob: "+JSON.stringify(data));
      next();
    }
  ).catch(function(error){
    console.log("Error: "+error);
  });
}

function loadContract(file){
  console.log("Loading contract: "+file);
  const contractFile = fs.readFileSync(file).toString();
  const solc = require('solc');
  const compiledCode = solc.compile(contractFile);

  var data = {};

  data.token_abiDefinition = JSON.parse(compiledCode.contracts[':SAMPLEToken'].interface)
  let token_byteCode = compiledCode.contracts[':SAMPLEToken'].bytecode
  data.token_byteCode = "0x" + token_byteCode;

  console.log("Contract Loaded.");
  return data;
}

function deployContract(data,address){
  console.log("Deploying contract.");

  contractInstance = new web3.eth.Contract(data.token_abiDefinition)
  contractInstance.options.data = data.token_byteCode
  contractInstance.deploy(
    {
      arguments: [
        address,
        '1000000000',
        'Sample Token',
        '3',
        'STOKEN'
      ]
    }
  ).send(
    {
      from: address,
      gas: 4700000
    }
  ).then(
    (
      newContractInstance
    ) => {
      console.log("Contract deployed.");
      contractInstance.options.address = newContractInstance.options.address;
      registerEvents(contractInstance);
    }
  );
}

function registerEvents(contractInstance){
  contractInstance.events.allEvents(
    {}, (error, result) => {
      if (error) {
          console.log(error)
      } else {
          contractReady(result,contractInstance);
      }
  })
}

function contractReady(result,contractInstance){
  console.log(result);
  transferFrom(contractInstance, accounts.alice.address, accounts.bob.address);
}

function transferFrom(contractInstance, fromAddress, toAddress){
  contractInstance.methods._transferFrom(
    fromAddress,
    toAddress,
    '9999'
  ).send(
    {
      from:fromAddress,
      gas: 4700000
    }
  ).then(
    data => {
      console.log(data)}
    ).catch(
      err => {console.log(err)}
  )
}

function getAccountBalanceOf(contractInstance,address){
  contractInstance.methods.getAccountBalanceOf(
    address
  ).send(
    {
      from: address,
      gas: 4700000
    }).then(
      data => {
        console.log(data)
      }
    ).catch(err => {
      console.log(err)
    }
  )
}

function mintToken(contractInstance,address){
  contractInstance.methods.mintToken(
    address,
    '99999999999999999999999'
  ).send(
    {
      from: 'some_address1',
      gas: 4700000
    }
  ).then(
    data => {
      console.log(data)
    }
  ).catch(
    err => {
      console.log(err)
    }
  )
}
