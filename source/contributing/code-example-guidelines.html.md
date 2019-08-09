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

# Code Examples

Code examples are generally succinct, but fully functional applications. All development tutorials involving code should have a matching example that is available for reference or download. Smaller snippets of the example code are then used in the tutorial, to guide a developer through the steps to complete the application.

More fully featured and less succinct examples, may be alternatively called a demo. The purpose of a demo may be as a more of a showcase for what can be achieved, or accompany an article, and a corresponding tutorial might not be a necessity. However, the code can still provide value as a reference tool for developers, even without any article or tutorial that references it.      

As with API documentation, examples should be written with `meterify` in mind, such as naming conventions. This may primarily come up with variables. To maintain consistency, all examples should use the following for including the necessary dependencies:

_Right_

```js
const meter = require("meterify").meterify;
const Web3 = require("web3");
const meterify = meter(new Web3(), "http://test.meter.io:8669");
```

_Wrong_

```js
const meterify = require("meterify").meterify;
const Web3 = require("web3");
const web3 = meterify(new Web3(), "http://test.meter.io:8669");
```
