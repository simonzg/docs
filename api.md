# Web3 API reference

------

### Get MTRG balance
```js
web3.eth.getBalance(address[,blockNumberOrHash])
```

Queries the MTRG balance of an address.

**Parameters**
- `address` _Type_ `string` The address to get the balance of
- _optional_ `blockNumberOrHash` _Type_ `number | string` Block number or block hash

    If you pass this parameter it will not use the default block set with `"latest"`
    - `0`: The genesis block 
    - `"earliest"`: The genesis block
    - `"latest"`: The latest block

**Returns** `Promise` which resolves with `string` representing the balance of account in *wei* (number in string)

**Example**
```js
web3Instance.eth.getBalance(address[,blockNumberOrHash]).then(result => {
	  console.log(result)
})
> "100000000000000000"
```

### Get MTR balance
```js
web3.eth.getEnergy(address[,blockNumberOrHash])
```

Queries the MTR balance of an address

**Parameters**
- `address` _Type_ `string` The address to get the MTR balance of.
- _optional_ `blockNumberOrHash` _Type_ `number | string` Block number or block hash

    If you pass this parameter it will not use the default block set with `"latest"`
    - `0`: The genesis block 
    - `"earliest"`: The genesis block
    - `"latest"`: The latest block

**Returns** `Promise` which resolves with `string` representing the balance in *wei* (number in string)

**Example**
```js
web3Instance.eth.getEnergy(address[,blockNumberOrHash]).then(result => {
	  console.log(result)
})
> "1000000000000000000"
```

### Get genesis block information
```js
web3.eth.getChainTag()
```
Returns genesis block information, chain tag is the last byte of the genesis block ID.

**Returns** `Promise` which resolves to `string` representing the chain tag

**Example**
```js
web3Instance.eth.getChainTag().then(result => {
	  console.log(result)
})
> "0x27"
```

### Query current best block number
```js
web3.eth.getBlockNumber()
```
Gets the current best block number

**Returns** `Promise` resolving with `number`

**Example**
```js
web3Instance.eth.getBlockNumber().then(result => {
	  console.log(result)
})
> 100
```

### Get block by number or hash
```js 
web3.eth.getBlock(blockNumberOrHash)
```
Gets a block matching the block number or block hash.

**Parameters**
- _optional_ `blockNumberOrHash` _Type_ `number | string` Block number or block hash

    If you pass this parameter it will not use the default block set with `"latest"`
    - `0`: The genesis block 
    - `"earliest"`: The genesis block
    - `"latest"`:The latest block

**Returns** `Promise` resolving with `Block` object:
- `number` _Type_ `uint32` number of block
- `id`  _Type_ `string` Identifier of the block(bytes32)
- `parentID`  _Type_ `string` ID of parent block(bytes32)
- `timestamp`  _Type_ `uint64` Unix timestamp of block
- `gasLimit`  _Type_ `uint64` Gas limit of the block
- `beneficiary`  _Type_ `string` Address of account to receive block reward
- `gasUsed`  _Type_ `uint64` Actual gas used of block
- `totalScore`  _Type_ `uint64` Score of the main chain
- `txRoot`  _Type_ `string` Root hash of transaction in the block(bytes32)
- `stateRoot`  _Type_ `string` Root hash of state(bytes32)
- `singer`  _Type_ `string` Address of who signed the block(bytes20)
- `isTrunk`  _Type_ `boolean` Whether the block is in trunk
- `transactions`  _Type_ `Array of strings` Array of transaction IDs

**Example**
```js
web3Instance.eth.getBlock(blockNumberOrHash).then(result => {
	console.log(result)
})
> {
    number: 19183,
    id: "0x00004aef378c84fcbd64341cd635aa03b24ad6304acceeaf1196158870e63f2e",
    size: 238,
    parentID: "0x00004aee9f0270ca602f05e8ed8a1f362b59f9b452af9b23e9429e7b006749de",
    timestamp: 1528620660,
    gasLimit: 10000000,
    beneficiary: "0x25ae0ef84da4a76d5a1dfe80d3789c2c46fee30a",
    gasUsed: 0,
    totalScore: 37385,
    txsRoot: "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
    stateRoot: "0x5dfcf545f0b9aca25c0037dc8b0eb95b7ad1751cc5e6f782b234bd286cf081fd",
    receiptsRoot: "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
    signer: "0x25ae0ef84da4a76d5a1dfe80d3789c2c46fee30a",
    isTrunk: true,
    transactions: [] 
}
```

### Get transaction according to transaction hash
```js
web3.eth.getTransaction(transactionID)
```
Get a transaction matching transaction Hash.

**Parameters**
- `transactionID` _Type_ `string`

**Returns** `Promise` resolving to `Transaction` object:

- `id` _Type_ `string` Identifier of the transaction
- `size` _Type_ `uint32` Byte size of the transaction that is RLP encoded
- `chainTag` _Type_ `uint8` Last byte of genesis block ID  
- `expiration` _Type_ `uint32` Expiration relative to blockRef(in unit block)
- `clauses` _Type_ `Array` Array of Clause Objects:
    - `to` _Type_ `string | Null` Recipient of clause, `Null` for contract deployment 
    - `value` _Type_ `string` Hex form of wei to be transferred
    - `data` _Type_ `string` Input data (bytes)
- `gasPriceCoef` _Type_ `uint8` Coefficient used to calculate the final gas price
- `gas` _Type_ `uint8` Maximum of gas can be consumed to execute this transaction
- `dependsOn` _Type_ `string | Null` ID of the transaction which the current transaction depends(bytes32)
- `nonce` _Type_ `string` Transaction nonce
- `meta` _Type_ `Object` Meta object:
    - `blockID` _Type_ `string` Identifier of the block(bytes32)
    - `blockNumber` _Type_ `uint32` number of block 
    - `blockTimestamp` _Type_ `uint64` Unix timestamp of block
- `blockNumber` _Type_ `uint32` Same as `meta.blockNumer`


**Example**
```js
web3Instance.eth.getTransaction(transactionID).then(result => {
	console.log(result)
})
> { 
    id: "0xb4601cc338aad0ff2d32565fcb9ed06e5a556da8cffe03866e73ba06c4812cf0",
    size: 132,
    chainTag: "0x9a",
    blockRef: "0x000008b8092aff75",
    expiration: 720,
    clauses:
     [ { to: "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e",
         value: "5000000000000000000000000000",
         data: "0x" } ],
    gasPriceCoef: 128,
    gas: 21000,
    dependsOn: null,
    nonce: "0x1538f9a34aa",
    origin: "0xe59D475Abe695c7f67a8a2321f33A856B0B4c71d",
    meta:
     { blockID: "0x000008b91fe9e0654c4fdd7eee4ed8b6e3e09b953993f2e2d91092e086b70423",
       blockNumber: 2233,
       blockTimestamp: 1528451080 },
    blockNumber: 2233 
}
```

### Get transaction receipt by transaction hash
```js
web3.eth.getTransactionReceipt(transactionHash)
```
Get a transaction receipt matching transaction Hash.

**Parameters**

- `TransactionHash` _Type_ `string`

**Returns** `Promise` holding a `TransactionReceipt` object:
- `gasUsed`  _Type_ `uint64` Actual gas used
- `gasPayer`  _Type_ `string` Address of account who paid used gas
- `paid`  _Type_ `string` Hex form of amount of paid energy
- `reward`  _Type_ `string` Hex form of amount of reward
- `reverted`  _Type_ `boolean` true means the transaction was reverted
- `meta` - `Meta` _Type_ `Object`
    - `blockID`  _Type_ `string` Identifier of the block(bytes32)
    - `blockNumber` _Type_ `uint32` number of block 
    - `blockTimestamp`  _Type_ `uint64` Unix timestamp of block
    - `txID`  _Type_ `string` Identifier of the transaction
    - `txOrigin`  _Type_ `string` The one who signed the transaction
- `outputs` _Type_ `Array of Objects` Clause's corresponding output:
    - `contractAddress`  _Type_ `string` Deployed contract address, if the corresponding clause is a contract deployment clause
    - `events` _Type_ `Array of Objects` Event log objects produced during clause execution:
        - `address`  _Type_ `string` The address of contract which produces the event (bytes20)
        - `topics` _Type_ `Array of strings` an array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
        - `data`  _Type_ `string` The data containing non-indexed log parameter.
    - `transfer` _Type_ `Array of Objects` Transfer produced during clause execution
        - `sender`  _Type_ `string` Address that sends wei.
        - `recipient`  _Type_ `string` Address that receives wei.
        - `amount`  _Type_ `string` Amount in *wei*.
- `blockNumber` _Type_ `uint32` Same as `meta.blockNumber`
- `blockHash` _Type_ `string` Same as `meta.BlockID`
- `transactionHash` _Type_ `string` Same as `meta.txID`
- `status`: `0x0` when `revert` is true and `0x1` when `revert` is false

**Example**
```js
web3Instance.eth.getTransactionReceipt(transactionHash).then(result => {
	console.log(result)
})
> { 
    gasUsed: 66846,
    gasPayer: "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e",
    paid: "0x39facb2d5afc30000",
    reward: "0x1164d68d9b4ba8000",
    reverted: false,
    meta:
        { blockID: "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86",
        blockNumber: 2257,
        blockTimestamp: 1528451320,
        txID: "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490",
        txOrigin: "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e" },
    outputs:[
        { contractAddress: null,
          events:
           [ { address: "0x0000000000000000000000000000456E65726779",
               topics: [Array],
               data: "0x00000000000000000000000000000000000000000000010f0cf064dd59200000" } ],
          transfers: [] },
        { contractAddress: null,
          events: [],
          transfers:
           [ { sender: "0x4f6fc409e152d33843cf4982d414c1dd0879277e",
               recipient: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
               amount: "0x10f0cf064dd59200000" } ] }
        ],
    blockNumber: 2257,
    blockHash: "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86",
    transactionHash: "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490",
    status: "0x1" 
}
```


### Send a signed transaction
```js
web3.eth.sendSignedTransaction(signedTransaction)
```
Send a signed transaction to the network.

**Parameters**
- `signedTransaction`  _Type_ `string` Signed transaction in hex format

**Returns** `PromiseEvent` (same as web3) A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:
- `transactionHash` returns `string` Is fired right after the transaction is sent and a transaction hash is available.
- `receipt` returns `TransactionReceipt Object` Is fired when the transaction receipt is available.
- `confirmation` returns `number`, `TransactionReceipt Object` Is fired for every confirmation up to the 12th confirmation. Receives the confirmation number as the first and the receipt as the second argument. Fired from confirmation 0 on, which is the block where its minded.
- `error` returns `Error` Is fired if an error occurs during sending. If a out of gas error, the second parameter is the receipt.

**Example**
```js
web3Instance.eth.sendSignedTransaction(signedTransaction).then(result => {
	  console.log(result)
})
> "TransactionID will be displayed if sent successfully"
```

### Send transaction
```js
web3.eth.sendTransaction(Transaction)
```
**Parameters**
- `Transaction` _Type_ `Object` The transaction object to send:
    - `from`  _Type_ `string | number` Either The address of transaction sender's account or the address/index of a local wallet in `web3Instance.eth.accounts.wallet `.
    - `data` _Type_ `number` By default the transaction token is MTR, first five bytes in `data` field defines if transcation sends MTR or MTRG, `0000000000` for **MTR**, and `0000000001` for **MTRG**. If first five bytes aren't following mentioned pattern, then it's considered as a data of the transaction.
    - _optional_ `to`  _Type_ `string` The destination address of the message, left undefined for a contract-creation transaction.
    - _optional_ `value` _Type_ `string | number | BN | BigNumber` The value, with an unit of *wei*, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type.
    - _optional_ `gas`  _Type_ `number` The maximum amount of gas that can be used by the transaction (unused gas is going to be refunded right after the transaction execution).
    - _optional_ `data`  _Type_ `string` Either the [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract, or the initialization code of a contract-creation transaction.
    - _optional_ `nonce`  _Type_ `number` A random 64-bit scalar value that is different from ethereum"s nonce which is a transaction count. 
    - _optional_ `chainTag`  _Type_ `number` **The last byte** of the genesis block ID representing the identity of a chain.
    - _optional_ `blockRef`  _Type_ `string`, by default, the first 8 bytes of **best block** ID). The BlockRef (an eight-byte array) includes two parts: the first four bytes contains the block height (number) and the rest four bytes is part of the referred block’s ID. If the referred block is future block, blockNumber - "00000000" should be added.
    - _optional_ `expiration`  _Type_ `number`, Default 0, Suggested 720 - number of  blocks that can be used to specify when the transaction expires. Specifically, expiration-blockRef defines the height of the latest block that the transaction can be packed into.
    - _optional_ `gasPriceCoef`  _Type_ `number`, by default 0, Suggested 128, with the range of [0,256) Coefficient that is used to calculate the total gas price.
    - _optional_ `dependsOn`  _Type_ `string` ID of the transaction on which the current transaction depends. When it's set this transaction will be packed after the depended transaction is executed successfully (in this case, the `revert` in depended transaction receipt must be `false`).

**Returns** `PromiseEvent` (same as web3) A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:
- `transactionHash` returns `string` Is fired right after the transaction is sent and a transaction hash is available.
- `receipt` returns `TransactionReceipt Object` Is fired when the transaction receipt is available.
- `confirmation` returns `number`, `TransactionReceipt Object` Is fired for every confirmation up to the 12th confirmation. Receives the confirmation number as the first and the receipt as the second argument. Fired from confirmation 0 on, which is the block where its minded.
- `error` returns `Error` Is fired if an error occurs during sending. If a out of gas error, the second parameter is the receipt.

?> In meter official implementation , the client **DOES NOT** neither manage user's private-key/keyStore nor use private key to sign a Transaction. Unfortunately, meterify can not directly perform `web3Instance.eth.sendTransaction` but there is another way to sign a transaction. 

?> In [web3.js accounts](https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#eth-accounts), it gives the opportunity to add your private-key, stored in your runtime context (In Node.js context, it's stored in memory while in Browser context, it's stored in memory/local storage), to accounts module. When you are trying to send a transaction, the module will check the private key associated with from field. Once the private key and from have been matched, the module will sign the transaction.

The APIs that follows the mechanism are:

- `web3.eth.sendTransaction()`
- `contractInstance.deploy.send()`
- `contractInstance.methods.myMethod.send()`

**Example**
```js
// Initiate the web3 instance
web3Instance.eth.accounts.wallet.add("0xdce1443ht2ef0c2631adc1c67e4c93f13dc23a41c18b536eigjqzpabcd96fb05")

web3Instance.eth.sendTransaction({
    from: "0x7567d83b7b8d80remrj281a71d54fc7b9944ffed",
    to: "0xd3ae58333beadb037703be21ed5ce7c9b1bff602",
    value: 100000000000000000000,
    data: "0000000000"
}).then(ret=>console.log(ret))
// Transaction receipt will be displayed

// Initiate the contract instance
ERC20ContractInstance.methods.transfer("0x7567d83b7b8d80remrj281a71d54fc7b9944ffed",100).send({
  from: "0xd3ae58333beadb037703be21ed5ce7c9b1bff602",
}).then(ret=>console.log(ret))
// Transaction receipt will be displayed
```

!> **This is not the only way for developers signing a transaction! <br>
We encourage developers find a proper way to manage private key and sign a transaction.**

### Execute a non-commited message call 
```js
web3.eth.call(callObject[, blockNumberOrHash])
```
Executes a message call, which is directly executed in the VM based on the specified block's state, but he never committed to the blockchain.

**Parameters**
- `callObject` _Type_ `Object` Transaction Object:
    - _optional_ `from`  _Type_ `string | number` Either The address of transaction sender's account or the address/index of a local wallet in `web3.eth.accounts.wallet `.
    - _optional_ `to`  _Type_ `string` The destination address of the message, left undefined for a contract-creation transaction.
    - _optional_ `value`- `number|string|BN|BigNumber` The value, with an unit of *wei*, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type.
    - _optional_ `gas`   _Type_ `number` The maximum amount of gas that can be used by the transaction (unused gas is going to be refunded right after the transaction execution).
    - _optional_ `data`  _Type_ `string` Either the [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract, or the initialization code of a contract-creation transaction.
    - _optional_ `gasPrice` - `number|string|BN|BigNumber` The price of gas for this transaction in *wei*.
- _optional_ `blockNumberOrHash` _Type_ `number | string` block number or hash

    If you pass this parameter it will not use the default block set with `"latest"`
    - `0`: The genesis block 
    - `"earliest"`: The genesis block
    - `"latest"`:The latest block

**Returns** `Promise` resolving with `string` The returned data of the call(hex string), e.g. a smart contract function returned value.

**Example**
```js
web3Instance.eth.call(callObject[, blockNumberOrHash]).then(result => {
	  console.log(result)
})
> "0x00000000000000000000000000000000000000000000000000000000000000"
```

### Execute a message call or transaction
```js
web3.eth.estimateGas(callObject)
```
Executes a message call or transaction and returns the amount of the gas used.

**Parameters**
- `callObject` _Type_ `Object` The transaction object to send:
    - `from`  _Type_ `string | number` Either The address of transaction sender"s account or the address/index of a local wallet in `web3Instance.eth.accounts.wallet `.
    - _optional_ `to`  _Type_ `string` The destination address of the message, left undefined for a contract-creation transaction.
    - _optional_ `value` _Type_ `string | number | BN | BigNumber` The value, with an unit of *wei*, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type.
    - _optional_ `gas`   _Type_ `number` The maximum amount of gas that can be used by the transaction (unused gas is going to be refunded right after the transaction execution).
    - _optional_ `data`  _Type_ `string` Either the [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract, or the initialization code of a contract-creation transaction.
    - _optional_ `nonce`  _Type_ `number` A random 64-bit scalar value that is different from ethereum"s nonce which is a transaction count. 
    - _optional_ `chainTag`  _Type_ `number` **The last byte** of the genesis block ID representing the identity of a chain.
    - _optional_ `blockRef`  _Type_ `string`, by default, the first 8 bytes of **best block** ID). The BlockRef (an eight-byte array) includes two parts: the first four bytes contains the block height (number) and the rest four bytes is part of the referred block’s ID. If the referred block is future block, blockNumber - "00000000" should be added.
    - _optional_ `expiration`  _Type_ `number`, Default 0, Suggested 720) number of  blocks that can be used to specify when the transaction expires. Specifically, expiration-blockRef defines the height of the latest block that the transaction can be packed into.
    - _optional_ `gasPriceCoef`  _Type_ `number`, by default 0, Suggested 128, with the range of [0,256) Coefficient that is used to calculate the total gas price.
    - _optional_ `dependsOn`  _Type_ `string` ID of the transaction on which the current transaction depends. When it's set this transaction will be packed after the depended transaction is executed successfully (in this case, the `revert` in depended transaction receipt must be `false`).

**Returns** `Promise` resolving with `number | null` the used gas for the simulated call/transaction, `null` when execution reverted.

**Example**
```js
web3Instance.eth.estimateGas(callObject).then(result => {
	  console.log(result)
})
> 1000
```

### Get past logs
```js
web3.eth.getPastLogs(options)
```
Gets past logs, matching the given options.

**Parameters**
- `options` _Type_ `Object` Filter option object:
    - `fromBlock`  _Type_ `number | string` The number of the earliest block.If not set "0" will be set by default.
    - `toBlock`  _Type_ `number | string` The number of the latest block .If not set "latest" will be set by default.
    - `address`  _Type_ `string` An address to only get logs from particular account.
    - `topics` _Type_ `Array` An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use {null}, e.g. `[null, '0x12...']`. You can also pass an array for each topic with options for that topic e.g. `[null, ['option1', 'option2']]`
    - `options` _Type_ `Object` Result pagination option, introduced by meter's API:
        - `offset`  _Type_ `number` Start cursor in result 
        - `limit`  _Type_ `number` Constrain the number of result returned
    - `range` _Type_ `Object` Range options for filter, introduced by meter's API, `fromBlock` and `toBlock` will be ignored if `Range Object` is valid:
        - `unit`  _Type_ `string` `block`(block number) or `time`(timestamp)
        - `from` - `number`
        - `to` - `number` 
    - `order` _Type_ `string` Order option, `DESC` or `ASC`, `ASC` by default

**Returns** `Promise` resolving to `Array` of Log Objects:
- `address`  _Type_ `string` From which this event originated from
- `data`  _Type_ `string` The data containing non-indexed log parameter
- `topics` _Type_ `Array` An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log
- `meta` - `Meta Object`
    - `blockID`  _Type_ `string` Identifier of the block(bytes32) this event was created in
    - `blockNumber` _Type_ `uint32` number of block  this event was created in
    - `blockTimestamp`  _Type_ `uint64` Unix timestamp of block
    - `txID`  _Type_ `string` Identifier of the transaction this event was created in
    - `txOrigin`  _Type_ `string` The one who signed the transaction
- `blockNumber` _Type_ `uint32` Same as `meta.blockNumber`
- `blockHash` _Type_ `string` Same as `meta.blockID`
- `transactionHash` _Type_ `string`Same as `meta.txID`

**Example**
```js
web3Instance.eth.getPastLogs(options).then(result => {
	console.log(result)
})
>[{
    topics:
      [ '0xddf252ad1be2c89b69c2b068fc378daa952ba2f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000004f6fc409e152d36913cf4982d414c1dd0879277e',
        '0x0000000000000000000000009a1e4bf6c41f50c399a128ab488fe4e3883bd872' ],
    data: '0x000000000000000000000000000000000000000000000a968163f0a57b400000',
    meta:
      { blockID: '0x000093b394e9acf567b34a42fe136cb2b676b2bce65ac5772503885b9137ac06',
        blockNumber: 37811,
        blockTimestamp: 1530392510,
        txID: '0xb320dbba768654ac7ff4625130964c8f468603a554f2d36d26c6d4b808b06a64',
        txOrigin: '0x4f6zc409e152d33843cf4982c414c1dd0879277f' },
    blockNumber: 37811,
    blockHash: '0x000093b394e9acf192b34a42fe136cb2b676b2bce65ac3772503885b9137ac06',
    transactionHash: '0xb320dbba757154ac7ff4625149964c8f468603a554f2d36d26c6d4b808b06a64'
  },{...}]
```

### Subscribe to specific events
```js
web3.eth.subscribe(type [, options] [, callback])
```
The `web3Instance.eth.subscribe` function lets you subscribe to specific events in the blockchain.

**Parameters**
- `type`  _Type_ `string` The subscription, you want to subscribe to.
- _optional_ `options` _Type_ `Mixed` Optional additional parameters, depending on the subscription type.
- _optional_ `callback` _Type_ `Function` Optional callback, returns an error object as first parameter and the result as second. **Will be called for each incoming subscription, and the subscription itself as 3 parameter**.

**Returns** `EventEmitter` - a Subscription instance:
- `id`  _Type_ `number` The subscription id, used to identify and unsubscribing the subscription.
- `subscribe([callback])` _Type_ `Function` Can be used to re-subscribe with the same parameters.
- `unsubscribe([callback])` _Type_ `Function` Unsubscribes the subscription and returns TRUE in the callback if success.
- `on('data')` _returns Object_ Fires on each incoming log with the log object as argument.
- `on('changed')` _returns Object_ Fires on each log which was removed from the blockchain. The object will have the additional property `removed: true`.
- `on('error')` _returns Object_ Fires when an error in the subscription occurs.

**Example**
```js
web3Instance.eth.subscribe('logs', {} ,function(){ ... });
```

### Reset subscriptions
```js
web3.eth.clearSubscriptions()
```
Resets subscriptions.

**Example** 
```js
web3Instance.eth.subscribe('logs', {} ,function(){ ... })

...

web3Instance.eth.clearSubscriptions()
```

### Subscribe to new block headers
```js
web3.eth.subscribe('newBlockHeaders')
```
Subscribes to incoming block headers. This can be used as ticker to check for changes on the blockchain.


**Parameters**
- `newBlockHeaders`  _Type_ `string` The type of the subscription.
- _optional_ `pos` _Type_ `string` A saved block ID for resuming the subscription, best block ID is assumed if omitted.
- _optional_ `callback` _Type_ `Function` Optional callback, returns an error object as first parameter and the result as second. **Will be called for each incoming subscription**.

**Returns** `EventEmitter` a [subscription instance](#subscribe) as an event emitter with the following events:

- `data` returns `Block Object` Fires on each incoming block header.
- `changed` returns `Block Object` Fires on each block header which has become the branch block in the blockchain. The object will have the additional property "removed: true"
- `error` returns `string` Fires when an error in the subscription occurs.

`Block Object`:

- `number` _Type_ `uint32` number of block
- `id`  _Type_ `string` Identifier of the block(bytes32)
- `parentID`  _Type_ `string` ID of parent block(bytes32)
- `timestamp`  _Type_ `uint64` Unix timestamp of block
- `gasLimit`  _Type_ `uint64` Gas limit of the block
- `beneficiary`  _Type_ `string` Address of account to receive block reward
- `gasUsed`  _Type_ `uint64` Actual gas used of block
- `totalScore`  _Type_ `uint64` Score of the main chain
- `txRoot`  _Type_ `string` Root hash of transaction in the block(bytes32)
- `stateRoot`  _Type_ `string` Root hash of state(bytes32)
- `singer`  _Type_ `string` Address of who signed the block(bytes20)
- `transactions`  _Type_ `Array of strings` Array of transaction IDs
- `removed`  _Type_ `boolean` Indicates whether the block containing this data become branch block

**Example**

```js
web3Instance.eth.subscribe('newBlockHeaders' [, position, callback])

const subscription = web3Instance.eth.subscribe('newBlockHeaders' , '0x000000003a3e7437634e9ab026cd279a88a8f086c2f332421d424668ac976bc7', (error, result) => {
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})

subscription.on('data', (data)=>{
    console.log(data)
})

subscription.on('changed', (data)=>{
    console.log(data)
})

subscription.on('error', (error)=>{
    console.log(error)
})


subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!')
})

>
{ 
  number: 4579,
  id: "0x000011e3a0c28cf93a531c92afc55b7f7dd8a44f055e9bef83acbacd26e1beb2",
  size: 238,
  parentID: "0x000011e2f7019aa0e0c9a31fdec74d47c1504a1580fa4d3600d23627a6d2b8ca",
  timestamp: 1536842904,
  gasLimit: 10000000,
  beneficiary: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
  gasUsed: 0,
  totalScore: 4579,
  txsRoot: "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
  stateRoot: "0xb861395c3401de6fc3269ec78eec673429dc4a39f250ffe9ce26784b85fd5275",
  receiptsRoot: "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
  signer: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
  transactions: [],
  removed: false 
}
```

### Subscribe to incoming transfers 
```js
web3.eth.subscribe('transfers')
```
Subscribes to incoming wei transfers. This can be used to watch an address's wei balance change.

**Parameters**
- `transfers`  _Type_ `string` The type of the subscription.
- _optional_ `options` _Type_ `Object` `TransferFilterOption Object` The subscription options
- _optional_ `callback` _Type_ `Function` Optional callback, returns an error object as first parameter and the result as second. **Will be called for each incoming subscription**

`TransferFilterOption Object`:

- _optional_ `pos` _Type_ `string` A saved block ID for resuming the subscription, best block ID is assumed if omitted.
- _optional_ `txOrigin` - `string` Signer address of tx 
- _optional_ `sender` - `string` Wei sender address
- _optional_ `recipient` - `string` Wei recipient address

**Returns** `EventEmitter`: An [subscription instance](#subscribe) as an event emitter with the following events:

- `data` _Type_ `Object` `Transfer Object` Fires on each incoming block header.
- `changed` _Type_ `Object` `Transfer Object` Fires on each log when the block containing the log has become the branch block in the blockchain. The object will have the additional property "removed: true"
- `error` _Type_ `string` Fires when an error in the subscription occurs.

`Transfer Object`:

- `sender`  _Type_ `string` Wei sender address
- `recipient`  _Type_ `string` Wei recipient address
- `amount`  _Type_ `string` Amount of *wei*
- `removed`  _Type_ `boolean` Indicates whether the block containing this data become branch block
- `meta` - `Meta Object`

`Meta Object`:

- `blockID`  _Type_ `string` Identifier of the block(bytes32) this event was created in
- `blockNumber` _Type_ `uint32` number of block this event was created in
- `blockTimestamp`  _Type_ `uint64` Unix timestamp of block
- `txID`  _Type_ `string` Identifier of the transaction this event was created in
- `txOrigin`  _Type_ `string` The one who signed the transaction

**Example**
```js
web3Instance.eth.subscribe('transfers', option [, callback])

const subscription = web3Instance.eth.subscribe('transfers' , {
  txOrigin: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'
}, (error, result) => {
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})

subscription.on('data', (data)=>{
    console.log(data)
})

subscription.on('changed', (data)=>{
    console.log(data)
})

subscription.on('error', (error)=>{
    console.log(error)
})


subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!')
})

>
{ 
    sender: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
    recipient: "0xd3ae78222beadb038203be21ed5ce7c9b1bff602",
    amount: "0x64",
    meta:
    { 
        blockID: "0x000014c682b47a840c3defd340513768de25f0e232613cf06ad4437548008c66",
        blockNumber: 5318,
        blockTimestamp: 1536895430,
        txID: "0x3fef2cdeb70ee2412b4059317794557f182764af098461f1badadd827f25dd5a",
        txOrigin: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed" 
    },
    removed: false 
}
```

### Subscribe to logs
```js
web3.eth.subscribe('logs')
```
Subscribes to incoming logs, filtered by the given options.

**Parameters**
- `logs` _Type_ `string` The type of the subscription.
- _optional_ `options` _Type_ `Object` `LogFilterOption Object` The subscription options
- _optional_ `callback` - `Function(optional)`: Optional callback, returns an error object as first parameter and the result as second. **Will be called for each incoming subscription**.

`LogFilterOption Object`:

- _optional_ `pos` - `string` A saved block ID for resuming the subscription, best block ID is assumed if omitted.
- _optional_ `address` - `string`: An address to only get logs from particular account.
- _optional_ `t0` - `string` Topic0 to match
- _optional_ `t1` - `string` Topic1 to match
- _optional_ `t2` - `string` Topic2 to match
- _optional_ `t3` - `string` Topic3 to match
- _optional_ `t4` - `string` Topic4 to match

**Returns** `EventEmitter`: An [subscription instance](#subscribe) as an event emitter with the following events:

- `data` - `Log Object`: Fires on each incoming block header.
- `changed` - `Log Object`: Fires on each transfer when the block containing the log has become the branch block in the blockchain. The object will have the additional property "removed: true"
- `error` - `string(Error message)`:  Fires when an error in the subscription occurs.

`Transfer Object`:

- `address`  _Type_ `string` From which this event originated from
- `data`  _Type_ `string` The data containing non-indexed log parameter
- `topics` _Type_ `Array`: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log
- `removed`  _Type_ `boolean` Indicates whether the block containing this data become branch block
- `meta` - `Meta Object`

`Meta Object`:

- `blockID`  _Type_ `string` Identifier of the block(bytes32) this event was created in
- `blockNumber` _Type_ `uint32` number of block  this event was created in
- `blockTimestamp`  _Type_ `uint64` Unix timestamp of block
- `txID`  _Type_ `string` Identifier of the transaction this event was created in
- `txOrigin`  _Type_ `string` The one who signed the transaction

**Example**
```js
web3Instance.eth.subscribe('logs', option [, callback])

const subscription = web3Instance.eth.subscribe('logs' , {
  pos: '0x000011e3a0c28cf93a531c92afc55b7f7dd8a44f055e9bef83acbacd26e1beb2'
}, (error, result) => {
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})

subscription.on('data', (data)=>{
    console.log(data)
})

subscription.on('changed', (data)=>{
    console.log(data)
})

subscription.on('error', (error)=>{
    console.log(error)
})


subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!')
})

>
{ 
    address: "0x0000000000000000000000000000456e65726779",
    topics:
    [   "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed",
        "0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602" ],
    data: "0x0000000000000000000000000000000000000000000000000000000000000064",
    meta:
    {   blockID: "0x0000001060a426cd19a970b234571690f7e78a4be608fa792aa14a1ab7f7bf7d",
        blockNumber: 16,
        blockTimestamp: 1536906231,
        txID: "0xaa669ab466f6e62740d87ecbdd517adae34339352e0d368a49bd45fefa881aa1",
        txOrigin: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed" },
    removed: false 
}
```

### web3 Contract instance

The `web3Instance.eth.Contract` object makes it easy to interact with smart contracts on the blockchain. When you create a new contract object you give it the json interface of the respective smart contract and web3 will auto convert all calls into low level ABI calls over RESTful HTTP API for you.

This allows you to interact with smart contracts as if they were JavaScript objects.

#### New contract

Creates a new contract instance with all its methods and events defined in its [json interface](https://web3js.readthedocs.io/en/1.0/glossary.html#glossary-json-interface) object.

```js
const contractInstance = new web3Instance.eth.Contract(jsonInterface[, address][, options])
```

**Parameters**
- `jsonInterface` _Type_ `Object` The json interface(ABI Description) for the contract to instantiate
- _optional_ `address` _Type_ `string` The address of the smart contract to call, can be added later using `contractInstance.options.address = '0x1234..`
- _optional_ `options` `Option Object`: The default options of the contract. Some are used as fallbacks for [call](#call), [send](#send) and [encodeABI](#encodeabi):
  - `from` _Type_ `string` The address transactions should be made from
  - `data` _Type_ `string` The byte code of the contract. Used when the contract gets deployed
  - `gas` _Type_ `number` The maximum gas provided for a transaction

**Returns** `Contract Instance` `Object` The contract instance with all its methods and events:

- `options` - `Object`:
  - `address` _Type_ `string` The address for this contract, or `null` if it’s not yet set. All transactions generated by web3.js from this contract will contain this address as the `to`
  - `jsonInterface` _Type_ `Array`: The json interface for this contract. Re-setting this will regenerate the methods and events of the contract instance

```js
  console.log(contractInstance.options.address)
  console.log(contractInstance.options.jsonInterface)
  > "0x1234567890123456789012345678901234567890"
  > [...]

  contractInstance.options.address = "0x1234567890123456789012345678901234567890"
  contractInstance.options.jsonInterface = [...]

```

#### Clone contract

Clones the current contract instance.

**Parameters**

none

**Returns** `Contract Instance` The new contract instance

**Example**
```js
const contractInstance = new web3Instance.eth.Contract(jsonInterface[, address][, options])
const contract2 = contractInstance.clone()
console.log(contract2.options.address === contractInstance.options.address)
> true
contract2.options.address = "another contract address"
console.log(contract2.options.address === contractInstance.options.address)
> false
```

#### Deploy contract

Call of this function will create a `Transaction Object` for deploying the contract to the blockchain. 

**Parameters**
- `options` _Type_ `Object` The options used for deployment
  - `data`  _Type_ `string` The byte code of the contract
  - _optional_ `arguments` _Type_ `Array` The arguments which get passed to the constructor on deployment

**Returns** `Transaction Object` The well prepared transaction object, the object will contain the requirements that needed for the transaction to execute [call](#call), [send](#send), [estimateGas](#estimategas), [encodeABI](#encodeabi):
- `arguments` _Type_ `Array`: The arguments passed to the method before. They can be changed
- `send` _Type_ `Function` Send a transaction to the blockchain(can alter the state), in this case it will deploy the contract. The promise will resolve with the new contract instance, instead of the receipt
- `estimateGas` _Type_ `Function` Will estimate the gas used for the transaction executed on the blockchain, in this case it's deploy a contract
- `encodeABI` _Type_ `Function` Encodes the ABI for the transaction, in this case it's contract data - constructor parameters

**Example**
```js
contractInstance.deploy(options)

// const jsonInterface = [...](ABI definition)
const contractInstance = new web3Instance.eth.Contract(jsonInterface)

contractInstance.deploy({
    data: '0x60...' // contract bytecode
    arguments: [123, 'My string'] // optional(depends on the constructor of contract source)
}).send({
    from: '0x1234567890123456789012345678901234567891'
    gas: 1500000,
}).then((newContractInstance) => {
    console.log(newContractInstance.options.address) // instance with the new contract address
})

// Another example
// const jsonInterface = [...](ABI definition)
const contractInstance = new web3Instance.eth.Contract(jsonInterface)
// When the data is already set as an option to the contract itself
contractInstance.options.data = '0x12345...';

contractInstance.deploy({
    arguments: [123, 'My string'] // optional(depends on the constructor of contract source)
}) // .send .call .encodeABI .estimateGas
```

#### Contract methods

Creates a `Transaction Object` for that method, which then can execute [call](#call), [send](#send), [estimateGas](#estimategas), [encodeABI](#encodeabi).

**Parameters**

Parameters of any method depend on the smart contracts methods, defined in the [JSON interface](https://web3js.readthedocs.io/en/1.0/glossary.html#glossary-json-interface)

**Returns** `Transaction Object`: The well prepared transaction object, the object will contain the requirements that needed for the transaction to execute [call](#call), [send](#send), [estimateGas](#estimategas), [encodeABI](#encodeabi):
- `arguments` _Type_ `Array`: The arguments passed to the method before. They can be changed
- `call` _Type_ `Function` Call the “constant” method and execute its smart contract method in the VM without sending a transaction (can't alter the smart contract state)
- `send` _Type_ `Function` Send a transaction to the blockchain(can alter the state)
- `estimateGas` _Type_ `Function` Estimate the gas used for the transaction executed on the blockchain
- `encodeABI` _Type_ `Function` Encodes the ABI for this method. This can be send using a transaction, call the method or passing into another smart contracts method as argument

**Example**
```js
contractInstance.methods.myMethod([param1[, param2[, ...]]])
```

The methods are also available through:

- The name: `contractInstance.methods.myMethod(123)`
- The name with parameters: `contractInstance.methods['myMethod(uint256)'](123)`
- The signature: `contractInstance.methods['0x58cf5f10'](123)`

This allows calling functions with same name but different parameters from the JavaScript contract object.

For details to the methods see the documentation below.

##### Call
**Parameters**

- `callObject` _Type_ `Object` `Transaction Object`:
    - _optional_ `from`  _Type_ `string | number` Either The address of transaction sender"s account or the address/index of a local wallet in `web3.eth.accounts.wallet `.
    - _optional_ `value`- `number|string|BN|BigNumber` The value, with an unit of *wei*, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type.
    - _optional_ `gas` _Type_ `number` The maximum amount of gas that can be used by the transaction (unused gas is going to be refunded right after the transaction execution).
    - _optional_ `gasPrice` _Type_ `number | string | BN | BigNumber` The price of gas for this transaction in *wei*.
- _optional_ `blockNumberOrHash`  _Type_ `number | string` If you pass this parameter it will not use the default block set with `"latest"`

    `BlockNumberOrHash` parameters can be one of the following:

    _Type_ `number` Block number
    _Type_ `string` Block hash
    - `0`: The genesis block 
    - `"earliest"`: The genesis block
    - `"latest"`:The latest block

**Returns** `Promise` which resolves to _Type_ `Mixed` The return value(s) of the smart contract method. If it returns a single value, it’s returned as is. If it has multiple return values they are returned as an object with properties and indices:
Call the “constant” method and execute its smart contract method in the VM without sending a transaction, can't alter the smart contract state.

**Example**
```js
contractInstance.methods.myMethod([param1[, param2[, ...]]]).call(callObject[, blockNumberOrHash])
```

##### Send

!>Send needs an account, please read [Send Transaction](#send-transaction-1) part first!

Send a transaction to the smart contract and execute its method. Note this can alter the smart contract state

**Parameters**

- `Transaction` _Type_ `Object` The transaction object to send:
    - `from`  _Type_ `string | number` Either The address of transaction sender"s account or the address/index of a local wallet in `web3Instance.eth.accounts.wallet `.
    - _optional_ `value` _Type_ `number | string | BN | BigNumber`:  The value, with an unit of *wei*, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type.
    - _optional_ `gas` _Type_ `number` The maximum amount of gas that can be used by the transaction (unused gas is going to be refunded right after the transaction execution).
    - _optional_ `nonce`  _Type_ `number` A random 64-bit scalar value that is different from ethereum"s nonce which is a transaction count. 
    - _optional_ `chainTag`  _Type_ `number` **The last byte** of the genesis block ID representing the identity of a chain.
    - _optional_ `blockRef` _Type_ `string`, by default, the first 8 bytes of **best block** ID). The BlockRef (an eight-byte array) includes two parts: the first four bytes contains the block height (number) and the rest four bytes is part of the referred block’s ID. If the referred block is future block, blockNumber - "00000000" should be added.
    - _optional_ `expiration` _Type_ `number`, Default 0, Suggested 720) number of  blocks that can be used to specify when the transaction expires. Specifically, expiration-blockRef defines the height of the latest block that the transaction can be packed into.
    - _optional_ `gasPriceCoef` _Type_ `number`, by default 0, Suggested 128, with the range of [0,256) Coefficient that is used to calculate the total gas price.
    - _optional_ `dependsOn` _Type_ `string` ID of the transaction on which the current transaction depends. When it's set this transaction will be packed after the depended transaction is executed successfully (in this case, the `revert` in depended transaction receipt must be `false`).

**Returns** `PromiseEvent` (same as web3): A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `transactionHash` returns `string`: Is fired right after the transaction is sent and a transaction hash is available.
- `receipt` returns `TransactionReceipt Object` Is fired when the transaction receipt is available.
- `confirmation` returns `number`, `TransactionReceipt Object` Is fired for every confirmation up to the 12th confirmation. Receives the confirmation number as the first and the receipt as the second argument. Fired from confirmation 0 on, which is the block where its minded.
- `error` returns `Error` Is fired if an error occurs during sending. If a out of gas error, the second parameter is the receipt.

**Example**
```js
contractInstance.methods.myMethod([param1[, param2[, ...]]]).send(transactionObject[, blockNumberOrHash])
```

##### EstimateGas
**Parameters**
- `callObject` _Type_ `Transaction` `Object`: same as [Call](#call)

Estimate the gas a method execution will take when executed in the VM. The estimation can differ from the actual gas used when later sending a transaction, as the state of the smart contract can be different at that time

**Example**
```js
contractInstance.methods.myMethod([param1[, param2[, ...]]]).estimateGas(callObject)
```

##### EncodeABI

Encodes the ABI for this method. This can be send using a transaction, call the method or passing into another smart contracts method as argument

**Parameters**

none

**Returns** `string` The encoded ABI byte code to send via a transaction or call.

**Example**
```js
const data = contractInstance.methods.myMethod([param1[, param2[, ...]]]).encodeABI()
console.log(data)
> "0xa9059cbb000000000000000000000000e59d475abe695c7f67a8a2321f33a856b0b4c71d0000000000000000000000000000000000000000000000000000000000000064"
```

#### Contract events

##### once
```js
contractInstance.once(event[, options], callback)
```
Subscribes to an event and unsubscribes immediately after the first event or error. Will only fire for a single event.

**Parameters**

- `event`  _Type_ `string` The name of the event in the contract, or `allEvents` to get all events.
- _optional_ `options` _Type_ `LogFilter Object` The options:
    - _optional_ `filter` - `Object`: Lets you filter events by indexed parameters, e.g. {filter: {myNumber: 12}} means all events where “myNumber” is 12, **Subscription doesn't support one array as filter**.
    - _optional_ `topics` _Type_ `Array` This allows you to manually set the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically, **Subscription doesn't support one array as filter**.
- `call` _Type_ `Function` This callback will be fired for the first event as the second argument, or an error as the first argument. See [getPastEvents](#getpastevents) return values for details about the event structure.

**Returns**

none

**Example**
```js
contractInstance.once('Transfer', {
  _from: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'
}), (error, result) => {
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})

> { 
    address: '0x0000000000000000000000000000456e65726779',
    meta:
    {   blockID: '0x0000000bb5ece55e16c426157c2bd14e49f5de58b1d56b11db4beec9578715c8',
        blockNumber: 11,
        blockTimestamp: 1536906181,
        txID: '0x035d6ff4b64f9753aa59102f15233a7a721092f4b1ebc11a8f2990fd9b9099ac',
        txOrigin: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed' },
    removed: false,
    returnValues:
    {   _from: '0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed',
        _to: '0xD3ae78222BEADB038203bE21eD5ce7C9B1BfF602',
        _value: '100' },
    event: 'Transfer',
    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    raw:
    {   data: '0x0000000000000000000000000000000000000000000000000000000000000064',
        topics:
          [   '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed',
              '0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602' ] 
    } 
}
```

##### myEvent
```js
contractInstance.events.myEvent( [options][, callback])
```
Subscribe to an event

**Parameters**
- _optional_ `options` _Type_ `LogFilter Object` The options:
    - _optional_ `filter` - `Object`: Lets you filter events by indexed parameters, e.g. {filter: {myNumber: 12}} means all events where “myNumber” is 12, **Subscription doesn't support one array as filter**.
    - _optional_ `topics` _Type_ `Array` This allows you to manually set the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically, **Subscription doesn't support one array as filter**.
- `call` _Type_ `Function` This callback will be fired for the first event as the second argument, or an error as the first argument. See [getPastEvents](#getpastevents) return values for details about the event structure.

**Returns** `EventEmitter` An [subscription instance](#subscribe) as an event emitter with the following events:
- `data` _Type_ `Log Object` Fires on each incoming block header
- `changed` _Type_ `Log Object` Fires on each log when the block containing the log has become the branch block in the blockchain. The object will have the additional property "removed: true"
- `error` _Type_ `string` Fires when an error in the subscription occurs

For the structure of a returned `Log Object` see [getPastEvents](#getpastevents) return values.

**Example**
```js
contractInstance.events.myEvent({
  _from: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'
}), (error, result) => {
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})

> { 
    address: '0x0000000000000000000000000000456e65726779',
    meta:
    {   blockID: '0x0000000bb5ece55e16c426157c2bd14e49f5de58b1d56b11db4beec9578715c8',
        blockNumber: 11,
        blockTimestamp: 1536906181,
        txID: '0x035d6ff4b64f9753aa59102f15233a7a721092f4b1ebc11a8f2990fd9b9099ac',
        txOrigin: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed' },
    removed: false,
    returnValues:
    {   _from: '0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed',
        _to: '0xD3ae78222BEADB038203bE21eD5ce7C9B1BfF602',
        _value: '100' },
    event: 'Transfer',
    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    raw:
    {   data: '0x0000000000000000000000000000000000000000000000000000000000000064',
        topics:
          [   '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed',
              '0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602' ] 
    } 
}
```

##### allEvents

Same as [myEvent](#myevent) but receives all events from this smart contract. Optionally the filter property can filter those events.

##### GetPastEvents
```js
contractInstance.getPastEvents(event[, options])
```
Gets past events for this contract

**Parameters**
- `event` _Type_ `string` The name of the event in the contract, or "allEvents" to get all events
- `options` _Type_ `Filter Option Object`:
    - _optional_ `filter` _Type_ `Object` Lets you filter events by indexed parameters, e.g. `{filter: {myNumber: [12,13]}}` means all events where “myNumber” is 12 or 13.
    - `fromBlock` _Type_ `number | string` The number of the earliest block.If not set "0" will be set by default.
    - `toBlock` _Type_ `number | string` The number of the latest block .If not set "latest" will be set by default.
    - `topics` _Type_ `Array` This allows manually setting the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically
    - `options` _Type_ `Option Object` Result pagination option, introduced by meter's API:
        - `offset` _Type_ `number` Start cursor in result 
        - `limit` _Type_ `number` Constrain the number of result returned
    - `range` _Type_ `Range Object` Range options for filter, introduced by meter's API, `fromBlock` and `toBlock` will be ignored if `Range Object` is valid
        - `unit` _Type_ `string`, `block`(block number) or `time`(timestamp)
        - `from` _Type_ `number`
        - `to` _Type_ `number`
    - `order` _Type_ `string` Order option, `DESC` or `ASC`, `ASC` by default

**Returns** `Promise` returns `Array of Log Objects` matching the given event name and filter
`Log Object`:
- `event` _Type_ `string` The event name.
- `signature` _Type_ `string | Null` The event signature, `null` if it’s an anonymous event.
- `returnValues` _Type_ `Object` The return values coming from the event, e.g. `{myVar: 1, myVar2: '0x234...'}`
- `address`  _Type_ `string` From which this event originated from
- `raw.data`  _Type_ `string` The data containing non-indexed log parameter
- `raw.topics` _Type_ `Array`: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log
- `meta` _Type_ `Meta Object`:
    - `blockID` _Type_ `string` Identifier of the block(bytes32) this event was created in
    - `blockNumber` _Type_ `uint32` number of block  this event was created in
    - `blockTimestamp` _Type_ `uint64` Unix timestamp of block
    - `txID` _Type_ `string` Identifier of the transaction this event was created in
    - `txOrigin` _Type_ `string` The one who signed the transaction
- `blockNumber` _Type_ `numner` Same as `meta.blockNumber`
- `blockHash` _Type_ `string` Same as `meta.blockID`
- `transactionHash` _Type_ `string` Same as `meta.txID`

**Example**
```js
contractInstance.getPastEvents(event[, options]).then(logs =>{
    console.log(logs)
})
> [{
   meta:
   { blockID: '0x00003ac13ec041f0ea2f879ccfcbb615133cfdfcbe5b43a74a6bf324c3bed3f2',
     blockNumber: 15041,
     blockTimestamp: 1530164810,
     txID: '0x316072e16a794a8f385e9f261a102c49947aa82a0355006289707b667e841cdc',
     txOrigin: '0xe59d475abe695c7f67a8a2321f33a856b0b4c71d' },
  blockNumber: 15041,
  blockHash: '0x00003ac13ec041f0ea2f879ccfcbb615133cfdfcbe5b43a74a6bf324c3bed3f2',
  transactionHash: '0x316072e16a794a8f385e9f261a102c49947aa82a0355006289707b667e841cdc',
  returnValues:
   Result {
     '0': '0xe59D475Abe695c7f67a8a2321f33A856B0B4c71d',
     '1': '0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed',
     '2': '1000000000000000000000000',
     _from: '0xe59D475Abe695c7f67a8a2321f33A856B0B4c71d',
     _to: '0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed',
     _value: '1000000000000000000000000' },
  event: 'Transfer',
  signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  raw:
   { data: '0x00000000000000000000000000000000000000000000d3c21bcecceda1000000',
     topics:
      [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000e59d475abe695c7f67a8a2321f33a856b0b4c71d',
        '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed' ] 
    } 
  },{...}]
```
