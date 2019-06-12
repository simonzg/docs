
## Intro
You can communicate with Meter via commonly used Web3 interface thanks to our _Meterify_ library.

DApps can use Meter to run on and quickly onboard users, while others can use Meter in order to reach settlement.


## Prerequisites

You will need:

- nodejs version 10.15.1 or above,
    - [Here is the guide](https://tecadmin.net/install-nodejs-with-nvm/#) on how to install Node.js and manage different versions
- [meterify](https://www.npmjs.com/package/meterify)
    - ```bash
    npm i meterify
    ```
- [web3](https://www.npmjs.com/package/web3/v/1.0.0-beta.37) version 1.0.0-beta.37
    - ```bash
    npm i web3@1.0.0-beta.37
    ```
- [solc](https://www.npmjs.com/package/solc/v/0.4.24) version 0.4.24
    - ```bash
    npm i solc@0.4.24
    ```

After everything is set up, you can check if all works properly by testing connection to our testnet by simply running the code below either from the NodeJS REPL environment, or creating an `index.js` file with the code and running `node index.js`:

```js
const meterify = require("meterify").meterify;
const Web3 = require("web3");
const web3 = meterify(new Web3(), "http://test.meter.io:8669");
```

If the code above runs without any errors, it means you're good to go!

For the example please refer to this asciinema: 

![](./_media/meterify.svg "web3 meterify example")

## Getting started

After successfully establishing the connection to our testnet, we can begin interacting with it.

You can use any coding environment that suits your needs, [VS Code](https://code.visualstudio.com/) is one of the good options.

### Create accounts
In this example we would need two accounts, you can create accounts using web3 API method which will return you the private key needed to add your account to the meterify wallet:

```js
web3.eth.accounts.create()
```

Sample accounts:
```
"address": 	"some_address1",
"private key": "some_key1"

"address":	"some_address2",
"private_key": "some_key2"

```

Now we need to add our accounts to wallet using account's private key:

```js
web3.eth.accounts.wallet.add('some_key1')

web3.eth.accounts.wallet.add('some_key2')

web3.eth.accounts.wallet;
```

### Send transactions between accounts

The unit in meterify is Wei. 1 MTR = 10e18 Wei and 1 MTRG = 10e18 WeiG

 - transfer MTR

 ```js
web3.eth.sendTransaction({from: 'some_address1', to: 'some_address2', value: '1000000000000000000', data: '00'}).then(receipt => {}).then(data => {console.log(data)});
```

- transfer MTRG

```js
web3.eth.sendTransaction({from: 'some_address1',to: 'some_address2', value: '1000000000000000000', data: '01'}).then(receipt => {console.log(receipt)})
```


### Compile and deploy the smart contract

We are using sample contract token available [here](https://github.com/meterio/meterify/blob/master/test/sample_token.sol).

Sample code below

- Load the contract

```js
const contractFile = fs.readFileSync('sample_token.sol').toString();
const solc = require('solc');
const compiledCode = solc.compile(contractFile);

const token_abiDefinition = JSON.parse(compiledCode.contracts[':SAMPLEToken'].interface)
let token_byteCode = compiledCode.contracts[':SAMPLEToken'].bytecode
token_byteCode = "0x" + token_byteCode;
```
- Deploy the contract byte code to blockchain

```js
contractInstance = new web3.eth.Contract(token_abiDefinition)
contractInstance.options.data = token_byteCode
contractInstance.deploy({arguments: ['some_address1', '1000000000', 'Sample Token', '3', 'STOKEN']}).send({from: 'some_address1', gas: 4700000 }).then((newContractInstance) => {console.log(newContractInstance.options.address)})
```

- Once the contract is deployed, the contract address is printed out. Set contract option address like the following.

```js
contractInstance.options.address = '0x83DE872pb4C33e77D12a75511C9eA78AD7Q2B4A6'
```

### Register events

After the contract is deployed, we can register the events.

```js
contractInstance.events.allEvents({}, (error, result) => {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
    }
})
```

Some examples of calling contract's methods:


```js
contractInstance.methods._transferFrom('some_address1','some_address2','9999').send({from:'some_address1',gas: 4700000}).then(data => {console.log(data)}).catch(err => {console.log(err)})

contractInstance.methods.getAccountBalanceOf('some_address1').send({from: 'some_address1',gas: 4700000}).then(data => {console.log(data)}).catch(err => {console.log(err)})

contractInstance.methods.getAccountBalanceOf('some_address1').call({from:'some_address1',gas: 4700000}).then(data => {console.log(data)}).catch(err => {console.log(err)})

contractInstance.methods.mintToken('some_address1', '99999999999999999999999').send({from: 'some_address1',gas: 4700000}).then(data => {console.log(data)}).catch(err => {console.log(err)})

```

