---
title: Glossary

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
- <a href='./index.html'>Meter Documentation</a>
- <hr>
- <a href='./index.html'>Examples</a>
- <a href='./meterify.html'>API Documentation</a>
- <a href='./meterify.dapps.html'>DApp Tutorial</a>
- <a href='./mining.html'>Mining Guide</a>
- <a href='./index.html'>Contributing Home</a>
- <a href='./glossary.html'>Glossary</a>
- <hr>  
- <a href='https://www.meter.io/claim-your-meter/'>Request Test Tokens</a>
- <a href='https://www.meter.io'>Meter.io</a>

search: true
---

#Glossary

<a name="json-interface">

## json interface
The json interface is a json object describing the Application Binary Interface (ABI) for a smart contract.

Using this json interface web3.js is able to create JavaScript object representing the smart contract and its methods and events using the web3.eth.Contract object.

<a name="specification">

### Specification


Functions:

- ``type``: ``"function"``, ``"constructor"`` (can be omitted, defaulting to ``"function"``; ``"fallback"`` also possible but not relevant in web3.js);
- ``name``: the name of the function (only present for function types);
- ``constant``: ``true`` if function is specified to not modify the blockchain state;
- ``payable``: ``true`` if function accepts ether, defaults to ``false``;
- ``stateMutability``: a string with one of the following values: ``pure`` (specified to not read blockchain state), ``view`` (same as ``constant`` above), ``nonpayable`` and ``payable`` (same as ``payable`` above);
- ``inputs``: an array of objects, each of which contains:

  - ``name``: the name of the parameter;
  - ``type``: the canonical type of the parameter.
- ``outputs``: an array of objects same as ``inputs``, can be omitted if no outputs exist.

<a name="events">

Events:

- ``type``: always ``"event"``
- ``name``: the name of the event;
- ``inputs``: an array of objects, each of which contains:

  - ``name``: the name of the parameter;
  - ``type``: the canonical type of the parameter.
  - ``indexed``: ``true`` if the field is part of the log's topics, ``false`` if it one of the log's data segment.
- ``anonymous``: ``true`` if the event was declared as ``anonymous``.



Example


```javascript

    contract Test {
        uint a;
        address d = 0x12345678901234567890123456789012;

        function Test(uint testInt)  { a = testInt;}

        event Event(uint indexed b, bytes32 c);

        event Event2(uint indexed b, bytes32 c);

        function foo(uint b, bytes32 c) returns(address) {
            Event(b, c);
            return d;
        }
    }

    // would result in the JSON:
    [{
        "type":"constructor",
        "payable":false,
        "stateMutability":"nonpayable"
        "inputs":[{"name":"testInt","type":"uint256"}],
      },{
        "type":"function",
        "name":"foo",
        "constant":false,
        "payable":false,
        "stateMutability":"nonpayable",
        "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
        "outputs":[{"name":"","type":"address"}]
      },{
        "type":"event",
        "name":"Event",
        "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
        "anonymous":false
      },{
        "type":"event",
        "name":"Event2",
        "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
        "anonymous":false
    }]
```
