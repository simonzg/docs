---
title: DApps Using Meter

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
- <a href='./index.html'>Documentation Home</a>
- <a href='./meterify.dapps.html'>DApp Tutorials</a>
- <a href='./examples/index.html'>Examples</a>
- <a href='./mining.html'>Mining Guide</a>
- <hr>
- API Documentation
- <a href='./meterify.html'>meterify</a>
- <a href='./meterify.module.options.html'>meterify.module.options</a>
- <a href='./meterify.eth.html'>meterify.eth</a>
- <a href='./meterify.eth.Contract.html'>meterify.eth.Contract</a>
- <a href='./meterify.eth.accounts.html'>meterify.eth.accounts</a>
- <a href='./meterify.utils.html'>meterify.utils</a>
- <a href='./callbacks-promises-events.html'>Callbacks Promises Events</a>
- <!--<a href='./meterify.eth.subscribe.html'>meterify.eth.subscribe</a>
- <a href='./meterify.eth.Iban.html'>meterify.eth.Iban</a>
- <a href='./meterify.eth.personal.html'>meterify.eth.personal</a>
- <a href='./meterify.eth.ens.html'>meterify.eth.ens</a>
- <a href='./meterify.eth.abi.html'>meterify.eth.abi</a>
- <a href='./meterify.eth.net.html'>meterify.eth.net</a>
- <a href='./meterify.shh.html'>meterify.shh</a>-->
- <hr>  
- <a href='https://www.meter.io/claim-your-meter/'>Request Test Tokens</a>
- <a href='https://www.meter.io'>Meter.io</a>

search: true
---

# DApps Using Meter

DApps are decentralized applications that utilize blockchains to store a history of operations (e.g. transactions). They can also consist of functional code, called smart contracts, that are published to the blockchain. DApps interfaces can be graphical, console-based, or APIs.

Popular categories for DApps include finance, exchanges, and gambling, but social applications and games also exist.

One of the primary use cases for a DApp is sending cryptocurrency between two accounts. For example, when Alice wishes to send some MTR and MTRG to Bob's account. Application developers can create methods for this on the Meter blockchain using `meterify`, an extended version of `Web3` (AKA the Ethereum JavaScript API library).

The final project files can be found here:

* [index.js](https://github.com/meter-io-docs/meter-io-docs.github.io/blob/master/examples/includes/meter-dapp/index.js)
* [sample_token.sol](https://github.com/meter-io-docs/meter-io-docs.github.io/blob/master/examples/includes/meter-dapp/sample_token.sol)
* [docker-compose.yml](https://github.com/meter-io-docs/meter-io-docs.github.io/blob/master/examples/includes/meter-dapp/docker-compose.yml)

## Prerequisites

Meterify requires that Node.js version 10.15.1 or above is  [installed](https://nodejs.org/en/download/package-manager/), as well as `npm`.

```bash
$ node --version

v10.16.3

$ npm --version

6.9.0
```

## Step 1 - Project Setup

Create a directory (e.g. meter-dapp) and initialize a new project using `npm`. Then install the app prerequisites `meterify` and `web3`, plus the JavaScript bindings for the Solidity compiler (`solc`).

```bash
$ mkdir meter-dapp

$ cd meter-dapp

$ npm init

$ npm install meterify --save

$ npm install web3@1.0.0-beta.37 --save

$ npm install solc@0.4.24 --save
```

### Step 2 - Test the Connection

Create a file called `index.js`, and include the `meterify` and `web3` requirements, then call the file with `node` to test the connection to the testnet.

> index.js

```js
const mtr = require("meterify").meterify;
const Web3 = require("web3");
const meterify = mtr(new Web3(), "http://test.meter.io:8669");
```

```bash
$ node index.js
```

If the code runs without any errors the connection was successful.

<a name="create-application-functions"/>

## Create the Application Functions

Next, follow each step to add function and other code snippets `index.js`.

## Step 3 - Creating an Account Generating Function

```javascript
meterify.eth.accounts.create()
```

The `meterify.eth.accounts` package contains functions for generating accounts and signing transactions and data. Create an object, using Alice's and Bob's names as keys. Perform a loop on the object, calling the `create` function. This will generate new local accounts that contain both a private key and a public key. Add each account to the object as is created.

```js
var accounts = createAccounts({"alice":{},"bob":{}});

function createAccounts(accounts){

  for(key in accounts){
    accounts[key] = meterify.eth.accounts.create();
  }

  return accounts;
}

```

### Step 4 - Add Accounts to a Wallet.

```js
meterify.eth.accounts.wallet;
```

`meterify.eth.accounts` also contains an in memory wallet to store multiple accounts. Loop through the object returned by the `createAccounts` function, and add Alice's and Bob's accounts to the wallet, using each account's private key.

```js
function addAccountsToWallet(accounts){

  for(var key in accounts){
    meterify.eth.accounts.wallet.add(accounts[key].privateKey);
  }

}
```

## Step 5 - Send MTR to an Account

Use the `eth` package's `sendTransaction` method to create a function for sending some MTR and MTRG from Alice to Bob.

Units in `meterify` are Wei, where 1 MTR = 10e18 Wei. Note that the identifier code for MTR is `0000000000`, while MTRG is `0000000001`. `sendTransaction` returns a [`promiEvent`](callbacks-promises-events.html#promievent) that is considered resolved once the `receipt` becomes available

```js

/* Note: Alice's account should already contain some MTR and MTRG
 * for this example code to work.
 */

sendCrypto(accounts.alice.address, accounts.bob.address, '0000000000', '1000000000000000000');

sendCrypto(accounts.alice.address, accounts.bob.address, '0000000001', '1000000000000000000');

function sendCrypto(fromAddress, toAddress, code, amount){

  meterify.eth.sendTransaction(
    {
      from: fromAddress,
      to: toAddress,
      value: amount,
      data: code
    }
  ).then(
    receipt => {}
  ).then(
    data => {
      console.log("MTR sent: "+JSON.stringify(data));
      next();
    }
  ).catch(function(error){
    console.log("Error: "+error);
  });
}
```

### Step 6 - Run the application.

```bash
$ node index.js
```

<a name="example-smart-contract"/>

## Load, Deploy, and Test a Smart Contract

The following modifications to the example demonstrate the use of a sample smart contract on the Meter blockchain. Again, follow the steps to add code snippets to the existing `index.js` file.

### Step 1 - Load a Smart Contract.

The file can be found here: [sample_token.sol](https://github.com/meter-io-docs/meter-io-docs.github.io/blob/master/examples/includes/meter-dapp/sample_token.sol)

```js
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
```

### Step 2 - Deploy a Smart Contract

```js
function deployContract(data,address){
  console.log("Deploying contract.");

  contractInstance = new meterify.eth.Contract(data.token_abiDefinition)
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
```

### Step 3 - Register Contract Events

Additionally, call some example functions within `contractReady` when the contract is ready.

```js
function registerEvents(contractInstance){
  contractInstance.events.allEvents(
    {}, (error, result) => {
      if (error) {
          console.log(error)
      } else {
        console.log("Contract Ready.");
          contractReady(result,contractInstance);
      }
  })
}

function contractReady(result,contractInstance){
  transferFrom(contractInstance, accounts.alice.address, accounts.bob.address);
}

```

### Step 4 - Transfer Between Accounts.

```js
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
```

### Step 4 - Get a Balance.

```js
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
```

### Step 5 - Mint Some Coins.

```js
function mintToken(contractInstance,address){
  contractInstance.methods.mintToken(
    address,
    '99999999999999999999999'
  ).send(
    {
      from: address,
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

```

<a name="example-with-docker"/>

## Using Docker

### Step 1 - Ensure `docker-compose` is Installed.

```bash
$ sudo curl -L https://github.com/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose

$ docker-compose --version

docker-compose version 1.24.1, build 4667896b
```

### Step 2 - Create `docker-compose.yml`

A copy of this file can be found here: [docker-compose.yml](https://github.com/meter-io-docs/meter-io-docs.github.io/blob/master/examples/includes/meter-dapp/docker-compose.yml)

```
version: '3.5'
services:
  node:
    image: "node:10"
    user: "node"
    working_dir: /home/node/meter-daap
    volumes:
      - ./:/home/node/meter-daap
    command: >
      sh -c "rm -rf node_modules
            npm init -y &&
            npm install meterify --save &&
            rm -rf node_modules/*/.git/
            npm install web3@1.0.0-beta.37 --save &&
            npm install solc@0.4.24 --save &&
            node index.js"
```

### Step 3 - Run `docker-compose`

Initiate the test application with `docker-compose`.

```bash
$ docker-compose up
```

If there are no errors the connection was successful.

> Stop Docker using `Ctrl+C`.

```bash
Ctrl+C
```

### Step 4 - Comment out dependency installation.

After the first run in `docker-compose.yml`, stop repeated initialization and dependency installation by commenting out the following lines.

```
version: '3.5'
services:
  node:
    image: "node:10"
    user: "node"
    working_dir: /home/node/meter-daap
    volumes:
      - ./:/home/node/meter-daap
    command: node index.js
#    command: >
#      sh -c "rm -rf node_modules
#            npm init -y &&
#            npm install meterify --save &&
#            rm -rf node_modules/*/.git/
#            npm install web3@1.0.0-beta.37 --save &&
#            npm install solc@0.4.24 --save &&
#            node index.js"
```
