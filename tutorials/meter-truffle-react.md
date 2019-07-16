# Meter + Truffle + React

[Truffle](https://www.trufflesuite.com) is a well known and powerful blockchain development environment, generally for the Ethereum Virtual Machine (EVM). Because of some differences between Meter and the EVM, it isn't always possible to use every development tool out of the box. Truffle however is one of the exceptions to this. Using Truffle to create applications for the Meter blockchain is relatively straightforward, with very few changes necessary to make it all work.

The easiest way to get started is using a `Truffle Box`, a boilerplate approach to creating DApps using Truffle. There is a blueprint to [create a box from scratch](https://www.trufflesuite.com/boxes/blueprint), as well as numerous [ready-made boxes available](https://www.trufflesuite.com/boxes), including one for quickly setting up the scaffolding of a [React application](https://www.trufflesuite.com/boxes/react). This box contains a setup with Webpack and React, and so it makes a great start for building a GUI for any DApp that can use Truffle.

As in the case of other Meter DApps, one of highlights to be aware of, is the use of the `meterify` library, to extend the functionality of `Web3` and interact with the Meter blockchain. However, it only takes one small modification to the React Truffle Box boilerplate code, which we will see further along in this tutorial. It is not necessary to be familiar with `meterify` for this one little enabling step, but for developing a more robust solution see the [DApp]() and [API]() documentation for additional details.

## Setting up Truffle

Installation of Truffle for Windows, Linux, or Mac OS X requires NodeJS version 8.9.4 or later.

```bash
$ npm install -g truffle
```

As the official Truffle documentation states, there Windows users might run into some difficulties. [See here](https://www.trufflesuite.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows) for more details.

## Creating the React Truffle Box

With Truffle already installed, create a directory for your new DApp and cd into it.

```bash
$ mkdir meter-react-dapp
$ cd meter-react-dapp
```

Unbox React using Truffle.

```bash
$ truffle unbox react
✔ Preparing to download
✔ Downloading
✔ Cleaning up temporary files
✔ Setting up box

Unbox successful. Sweet!

Commands:

  Compile:              truffle compile
  Migrate:              truffle migrate
  Test contracts:       truffle test
  Test dapp:            cd client && npm test
  Run dev server:       cd client && npm run start
  Build for production: cd client && npm run build
```

For now there is no need to run any of these commands. The initial configuration is still EVM specific. It's time to make it Meter specific.

## Adding the meterify library

As indicated in the output for the `unbox` command, there is a `client` sub-directory created. This is where the boilerplate for the DApp is located.

```bash
$ cd client
```

Add `meterify` as a dependency.

```bash
npm install meterify --save
```

Within that same directory you will find the `src` directory for the DApp.

```
$ cd src
$ ls
App.css  App.test.js  index.js  serviceWorker.js
App.js   index.css    logo.svg  utils
```

The `utils` directory contains another important file called `getWeb3.js`

```
$ ls utils
getWeb3.js
```

It is in this file where changes need to be made to add the `meterify` library. Open the file and change the first line `import Web3 from "web3";` to the following:

```js
const meterify = require("meterify").meterify;
const Web3 = require("web3");
const web3 = meterify(new Web3(), "http://test.meter.io:8669");
```

The next section that needs adjustment is where normally the Web3 library would be configured for one of three EVM scenarios, and sent back to the main part of the application (`App.js`). This needs to be modified to use `meterify` instead. Scroll down to the following block of code:

```js
if (window.ethereum) {
  const web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    await window.ethereum.enable();
    // Acccounts now exposed
    resolve(web3);
  } catch (error) {
    reject(error);
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  // Use Mist/MetaMask's provider.
  const web3 = window.web3;
  console.log("Injected web3 detected.");
  resolve(web3);
}
// Fallback to localhost; use dev console port by default...
else {
  const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:9545"
  );
  const web3 = new Web3(provider);
  console.log("No web3 instance injected, using Local web3.");
  resolve(web3);
}
```

Remove this entire `if...elseif....else` section, and replace with the following:

```js
console.log("Using meterify.");
resolve(web3);
```

The entire `getWeb3.js` file should now look like this:

```js
const meterify = require("meterify").meterify;
const Web3 = require("web3");
const web3 = meterify(new Web3(), "http://test.meter.io:8669");

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
        console.log("Using meterify.");
        resolve(web3);
      });
  });

export default getWeb3;
```

## Modifying the App.js File

In the `src` directory is a file called `App.js` that was created. It contains code specific to the EVM, and in order to test for the Meter blockchain it instead needs to be modified for the `meterify` library API.

While `meterify` does contain a subset of `Web3` functionality, there are some differences. One of those differences is the method `getBlock(String|Number)`, which returns a block based on the specified input parameter. This can either be a block number, block hash or, in the case of the EVM, one of `genesis`, `latest` or `pending`. With Meter there is the additional option of specifying `best`, which makes it an easy and accurate test to check if `meterify` is properly setup.

Open `App.js` from the `client/src` directory. Comment out the second line, referencing SimpleStorageContract.

```js
import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
```

Find the `try` block in `componentDidMount`.

```js
try {
  // Get network provider and web3 instance.
  const web3 = await getWeb3();

  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SimpleStorageContract.networks[networkId];
  const instance = new web3.eth.Contract(
    SimpleStorageContract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  // Set web3, accounts, and contract to the state, and then proceed with an
  // example of interacting with the contract's methods.
  this.setState({ web3, accounts, contract: instance }, this.runExample);
}
```

Modify it so that it will only wait for the web3 instance, and then call the `getBlock` method for best block. For now comment out the unnecessary lines of code and add the call to `getBlock`.

```js
try {
  // Get network provider and web3 instance.
  const web3 = await getWeb3();

  /*
  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SimpleStorageContract.networks[networkId];
  const instance = new web3.eth.Contract(
    SimpleStorageContract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  // Set web3, accounts, and contract to the state, and then proceed with an
  // example of interacting with the contract's methods.
  this.setState({ web3, accounts, contract: instance }, this.runExample);
  */
  web3.eth.getBlock("best").then(
    res => console.log(res)
  );
}
```

## Launching the App

To test the modifications follow the instructions from the console output earlier, when the box was created.

```bash
$ npm run start
Starting the development server...
```

This will launch the app, and will automatically open a web browser tab pointing to http://localhost:3000. Once it is up and running, open the Javascript console. It should contain something similar to the following:

```
Using meterify.
App.js:31 {number: 108368, id: "0x0001a7508282b4eb009eb87c2a2394bcc504242fccfff2f1d811565589e83c78", size: 782, parentID: "0x0001a74f39fcc39b38dbbf4ce2a5cefa4ab274bc956c918acea64894de849553", timestamp: 1563282171, …}
```

## Getting More Advanced  
