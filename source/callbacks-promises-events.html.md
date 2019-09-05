---
title: Callbacks Promises Events

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

# Callbacks Promises Events

<a name="promievent"/>

## PromiEvent

To help web3 integrate into all kind of projects with different standards
we provide multiple ways to act on asynchronous functions.

Most web3.js objects allow a callback as the last parameter, as well as returning promises to chain functions.

Meter as a blockchain has different levels of finality and therefore needs to return multiple "stages" of an action.

To cope with requirement we return a "PromiEvent" for functions like [`web3.eth.sendTransaction`](meterify.eth.html#eth-sendtransaction-return) or contract methods.
These stages are encapsulated into a "PromiEvent", which combines a promise with an event emitter.

The event emitter fires an event for each of the finality stages.

An example of a function that benefits from a PromiEvent is the [`web3.eth.sendTransaction`](meterify.eth.html#eth-sendtransaction-return) method.

```javascript

    web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
    .once('transactionHash', function(hash){ ... })
    .once('receipt', function(receipt){ ... })
    .on('confirmation', function(confNumber, receipt){ ... })
    .on('error', function(error){ ... })
    .then(function(receipt){
        // will be fired once the receipt is mined
    });
```
