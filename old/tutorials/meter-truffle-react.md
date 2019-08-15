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

Modify it so that it will only wait for the web3 instance, and then call the `getBlock` method for best block. Remove the unnecessary lines of code and add the call to `getBlock`.

```js
try {
  // Get network provider and web3 instance.
  const web3 = await getWeb3();

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

## Update the View

Sending data to the console is fine for testing and troubleshooting. But a React app is nothing without its GUI. There are just a few adjustments to the code to make to send the `getBlock` return data onto the screen.

First, take a look at the `render` function at the end of `App.js`.

```js
render() {
  if (!this.state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show
        a stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 40</strong> of App.js.
      </p>
      <div>The stored value is: {this.state.storageValue}</div>
    </div>
  );
}
```

Modify the text slightly to align more closely with the data we receive from `getBlock`.

```js
render() {
  if (!this.state.block) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <h1>Best Block Data</h1>
      <ul>
        <li>Number: {this.state.block.number}</li>
        <li>ID: {this.state.block.id}</li>
        <li>Size: {this.state.block.size}</li>
        <li>Parent ID: {this.state.block.parentID}</li>
        <li>Timestamp: {this.state.block.timestamp}</li>
      </ul>
    </div>
  );
}
```

As you can see, the data in the rendered view is going to come from the `this.state.block` object. This object does not yet exist in the code. Add it up just below the start of the `App` component definition.

```js
class App extends Component {
  state = { block: {number:0, id: null, size: 0, parentID: null, timestamp: 0} };

  ...

}  
```

Now, the next important step is to update the state after the data becomes available from the `getBlock` function call. Otherwise the `block` object will remain in its default state.

Remember the code section where `getBlock` was called.

```js
web3.eth.getBlock("best").then(
  res => console.log(res)
);
```

Instead of sending `res` to the console, use it to update `state` instead.

```js
web3.eth.getBlock("best").then(
  res => {
    this.setState({ block:res });
  }
);
```

## Getting More Advanced With Meter and React  

The basic fundamentals of working with the `meterify` library and React are now in place. However, the Meter blockchain exists for more than simply displaying some basic read-only info in a view. This is only the first step. Let's add some additional functionality that is likely to be more common, sending a transaction between two accounts.

This part of the tutorial is going to need at least one extra thing, and that is the public and private keys of an existing testnet account that has some MTR and/or MTRG. This will be the sender. Let's call her Alice. She wants to send some cryptocurrency to her friend Bob, the receiver.

First let's make some changes to the view to show the wallets of Alice and Bob. The app should have a nice presentation, without spending too much time on the layout and styling. Bootstrap is good choice to help with this. Install it, together with `jquery` and `popper.js`, as a dependencies in the `client` directory of the project.

```bash
$ npm install bootstrap jquery popper.js material-ui --save
```

Then, open `index.js`, also located in the `src` directory. Add them to the very top of `index.js`, where the other import statements are located.

```js
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
```

The entire `index.js` file should now look something like this:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```

Close `index.js`. No more changes need to be made to it.

Back in `App.js` it is time to adjust the UI to display two accounts, one for Alice and one for Bob. Change the content of the render function. Don't worry if you don't understand how to create a layout in Bootstrap. Some comment annotations have been added to make clear what is important to focus on. The comments can be found in the `{/* ... */}` sections (React doesn't use HTML commenting style when rendering).

```js
render() {
  if (!this.state.block) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <div class="card-deck">

        {/* This card is the UI for the account of Alice */}
        <div class="card">
          <div class="card-header bg-primary"><h2>Alice</h2></div>
          <div class="card-body">Balance: {}</div>
          <div class="card-footer"><!--Leave empty for now. --></div>
        </div>

        {/* This card is the UI for the account of Bob */}
        <div class="card">
          <div class="card-header bg-success"><h2>Bob</h2></div>
          <div class="card-body">Balance: {}</div>
          <div class="card-footer"><!--Leave empty for now. --></div>
        </div>

      </div>
    </div>

  );
}
```

Bob's doesn't yet have an account, and Alice's existing account details need to be entered before any sending transaction from her can happen. Bob's account can be generated with added changes to the app, again using the `meterify` library, and then a button in the view can trigger the account creation.

Modify Bob's account card to add the button, and two fields to hold his account details, for the public key (AKA address), and private key. If anyone was able to get a hold of Bob's private key they would be able to sign transactions on his account, and potentially take all his Meter. This is why a password field is used for the private key, to keep it hidden from anyone else (even Alice).

```js
{/* This card is the UI for the account of Bob */}
<div class="card">
  <div class="card-header bg-success"><h2>Bob</h2></div>
  <div class="card-body">
    <div class="form-group">
      {/* Text field for the public key (AKA account) */}
      <label for="bob-account">Public Key:</label>
      <input type="text" class="form-control" id="bob-account">
    </div>
    <div class="form-group">
      {/* Password field for masking the secret key */}
      <label for="bob-privateKey">Secret Key:</label>
      <input type="password" class="form-control" id="bob-privateKey">
    </div>
    Balance: {}
  </div>
  <div class="card-footer">
  {/* Add the account create button here. */}
  <button type="button" class="btn btn-secondary" id="create-bob-account">Create New Account</button>
  </div>
</div>
```

Now, Alice will need a place to enter her public and private keys, the amount she wants to send to Bob, and something to initiate the transaction.

Modify Alice's account card to add a text field for her account public key, a password field to mask her private key that signs the transaction, another text field for the amount she will send Bob, and a button to begin sending.

```js
{/* This card is the UI for the account of Alice */}
<div class="card">
  <div class="card-header bg-primary"><h2>Alice</h2></div>
  <div class="card-body">
    <div class="form-group">
      {/* Text field for the public key (AKA account) */}
      <label for="alice-account">Public Key:</label>
      <input type="text" class="form-control" id="alice-account">
    </div>
    <div class="form-group">
      {/* Password field for masking the secret key */}
      <label for="alice-privateKey">Secret Key:</label>
      <input type="password" class="form-control" id="alice-privateKey">
    </div>
    Balance: {}
  </div>
  <div class="card-footer">
    <div class="form-group">
      {/* Text field for the amount */}
      <label for="alice-send-crypto-amount">Amount to Send:</label>
      <input type="text" class="form-control" id="alice-send-crypto-amount">
    </div>
    {/* Add the send crypto button here. */}
    <button type="button" class="btn btn-secondary" id="alice-send-crypto-btn">Send Crypto</button>
  </div>
</div>
```

We will make some other small changes to the render function later. For now, recall our `state` definition from earlier.

```js
class App extends Component {
  state = { block: {number:0, id: null, size: 0, parentID: null, timestamp: 0} };
  ...
}
```

This needs to be modified to reflect the current scenario. The state should hold some of the account details for Alice and Bob, particularly the accounts, private keys, and balances. We have a very convenient way to do this, by simply tracking the state of the `web3` instance. This will become obvious later why this is a good way to approach this.

```js
class App extends Component {
  state = { web3: null };
...
}
```

Next, remove or comment out the `getBlock` section of code, and replace it with a call to `setState`, but using the `web3` instance instead.

```js

/*web3.eth.getBlock("latest").then(
  res => {
    this.setState({ block: res });
  }
);*/

this.setState({ web3 });
```
