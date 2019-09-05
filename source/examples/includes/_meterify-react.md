# Meterify + React

> Install

```bash
$ git clone https://github.com/meterio/hackathon-demo-react.git

$ cd hackathon-demo-react.git

$ npm install
```

> Run

```bash
$ npm start
```

**Web UI**

After starting the application, open [http://localhost:3000](http://localhost:3000) in a web browser.

**Tips**

1. Private key and public address are stored at the browser. Type `localStorage.getItem('private.key')` and `localStorage.getItem('public.address')` in the console to retrieve them.
2. ABI definition is pre-built. There is no solidity compilation included in this demo. (the `solc` library occupies too much memory and it causes failure)
3. `this.setState` is not available in every `then` function provided by web3.
