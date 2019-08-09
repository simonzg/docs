---
title: Meter Documentation

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
- <a href='./index.html'>Meter Documentation</a>
- <hr>
- Contributing
- <a href='./index.html'>Contributing Home</a>
- <a href='./documentation-guidelines.html'>Documentation Guidelines</a>
- <a href='./api-doc-guidelines.html'>Writing API Docs</a>
- <a href='./tutorials-guidelines.html'>How to Create Tutorials</a>
- <a href='./article-guidelines.html'>What is an Article</a>
- <a href='./code-example-guidelines.html'>Instructions for Examples</a>
- <hr>
- <a href='./meterify.html'>API Documentation</a>
- <a href='./meterify.dapps.html'>DApp Tutorial</a>
- <a href='./meterify.examples.html'>Examples</a>
- <a href='./mining.html'>Mining Guide</a>
- <hr>  
- <a href='https://www.meter.io/claim-your-meter/'>Request Test Tokens</a>
- <a href='https://www.meter.io'>Meter.io</a>

search: true
---

# API Documentation Guidelines

The Meter API documentation focuses on the use of the [`meterify`](https://github.com/meterio/meterify) library, which is a modified version of [`web3`](https://github.com/ethereum/web3.js). The content is a combination of the `web3` documentation, and content specific to `meterify` and the Meter blockchain.  

All API documentation should be written to reflect `meterify`. So where existing content that has been ported `web3` is mentioned, this should be replaced to the greatest extent possible with `meterify`. Some code snippets provide a good example of these kinds of changes.

_web3_

```js
import Web3 from 'web3';

// "Web3.givenProvider" will be set in a Ethereum supported browser.
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546', net, options);

web3.version
```

_meterify_

```js
const meter = require("meterify").meterify;
const Web3 = require("web3");
const meterify = meter(new Web3(), "http://test.meter.io:8669");

meterify.version
```

Another example, where `web3` content might read:

```markdown
For `web3.eth.subscribe` see the [`subscribe`](web3.eth.subscribe.html) reference documentation.
```

Modify it to read:

```markdown
For `meterify.eth.subscribe` see the [`subscribe`](meterify.eth.subscribe.html) reference documentation.
```
