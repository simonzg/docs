# Guide on mining Meter

Meter mining is very similar to bitcoin mining, so it requires minimum changes.

A [mining pool](https://en.wikipedia.org/wiki/Mining_pool) is the pooling of resources by miners, who share their processing power over a network, to split the reward equally, according to the amount of work they contributed to the probability of finding a block. 

?> To start mining you should either join to a mining pool or create one by yourself

**Production parameters**

Testnet mining Tuned for AntMiner S9, mainnet will target at efficiency frontier

|                      | Power | Hash | Efficiency | Meter/Day | Margin Index |
|----------------------|-------|------|------------|-----------|--------------|
| AntMiner S9          | 1323  | 13.5 | 98         | 31.75     | 1.00         |
| WhatsMiner M10       | 3500  | 55   | 63.64      | 129.36    | 1.54         |
| Inno Silicon T3+ 52T | 2200  | 52   | 42.31      | 79.42     | 2.32         |
| AntMiner S17Pro      | 2094  | 53   | 39.51      | 80.95     | 2.48         |



## Join a mining pool

To efficiently mine Meter coins you will need ASIC miners. Follow [this guide](https://www.bitcoin.com/guides/how-to-setup-a-bitcoin-asic-miner-and-what-they-are) on installing and configuring your ASICs.

We have two mining pools currently running for test purposes, you can connect to them here:
```
stratum+tcp://34.222.111.82:3256
stratum+tcp://54.184.235.97:3256
```

## Start your own mining pool on Meter network 

In order to start a mining pool you will need our NodeJS mining portal application. Which is located here [github.com/meterio/meter-nomp](https://github.com/meterio/meter-nomp). Download it and follow instructions below.

### Requirements
* [Node.js](http://nodejs.org/) v0.10+ ([follow these installation instructions](https://tecadmin.net/install-nodejs-with-nvm/#))
* [Redis](http://redis.io/) key-value store v2.6+ ([follow these instructions](http://redis.io/topics/quickstart))
* Connection to coin daemon

    Coin daemon is a program that implements the Meter protocol for remote procedure call (RPC) use.  
    
    You will need to connect to our coin daemon in order to run the pool. Later on we will publish source code of our daemon, so everyone can run the daemon locally.
    
    Here is Meter public coin daemon's configuration:
    
    ```js
    {
        "host": "n01.meter.io",
        "port": 8332,
        "user": "testuser",
        "password": "testpass"
    }
    ```

#### Be aware {docsify-ignore}
Those are minimal requirements. If you use old versions of Node.js or Redis that may come with your system package manager then you will have problems. Follow the linked instructions to get the last stable versions.


[**Redis security warning**](http://redis.io/topics/security): be sure firewall access to redis - an easy way is to
include `bind 127.0.0.1` in your `redis.conf` file. Also it's a good idea to learn about and understand software that
you are using - a good place to start with redis is [data persistence](http://redis.io/topics/persistence).

### Downloading & Installing

Clone the repository and run `npm update` for all the dependencies to be installed:

```bash
git clone https://github.com/meterio/meter-nomp.git
cd meter-nomp
npm update
```
### Configuration

#### Portal config
Inside the `config_example.json` file, ensure the default configuration will work for your environment, then copy the file to `config.json`.

Explanation for each field:
````js
{
    /* Specifies the level of log output verbosity. Anything more severe than the level specified
       will also be logged. */
    "logLevel": "debug", //or "warning", "error"
    
    /* By default meter-NOMP logs to console and gives pretty colors. If you direct that output to a
       log file then disable this feature to avoid nasty characters in your log file. */
    "logColors": true, 


    /* The NOMP CLI (command-line interface) will listen for commands on this port. For example,
       blocknotify messages are sent to NOMP through this. */
    "cliPort": 17117,

    /* By default 'forks' is set to "auto" which will spawn one process/fork/worker for each CPU
       core in your system. Each of these workers will run a separate instance of your pool(s),
       and the kernel will load balance miners using these forks. Optionally, the 'forks' field
       can be a number for how many forks will be spawned. */
    "clustering": {
        "enabled": true,
        "forks": "auto"
    },
    
    /* Pool config file will inherit these default values if they are not set. */
    "defaultPoolConfigs": {
    
        /* Poll RPC daemons for new blocks every this many milliseconds. */
        "blockRefreshInterval": 1000,
        
        /* If no new blocks are available for this many seconds update and rebroadcast job. */
        "jobRebroadcastTimeout": 55,
        
        /* Disconnect workers that haven't submitted shares for this many seconds. */
        "connectionTimeout": 600,
        
        /* (For MPOS mode) Store the block hashes for shares that aren't block candidates. */
        "emitInvalidBlockHashes": false,
        
        /* This option will only authenticate miners using an address or mining key. */
        "validateWorkerUsername": true,
        
        /* Enable for client IP addresses to be detected when using a load balancer with TCP
           proxy protocol enabled, such as HAProxy with 'send-proxy' param:
           http://haproxy.1wt.eu/download/1.5/doc/configuration.txt */
        "tcpProxyProtocol": false,
        
        /* If under low-diff share attack we can ban their IP to reduce system/network load. If
           running behind HAProxy be sure to enable 'tcpProxyProtocol', otherwise you'll end up
           banning your own IP address (and therefore all workers). */
        "banning": {
            "enabled": true,
            "time": 600, //How many seconds to ban worker for
            "invalidPercent": 50, //What percent of invalid shares triggers ban
            "checkThreshold": 500, //Perform check when this many shares have been submitted
            "purgeInterval": 300 //Every this many seconds clear out the list of old bans
        },
        
        /* Used for storing share and block submission data and payment processing. */
        "redis": {
            "host": "127.0.0.1",
            "port": 6379
        }
    },

    /* This is the front-end. Its not finished. When it is finished, this comment will say so. */
    "website": {
        "enabled": true,
        /* If you are using a reverse-proxy like nginx to display the website then set this to
           127.0.0.1 to not expose the port. */
        "host": "0.0.0.0",
        "port": 8088,
        /* Used for displaying stratum connection data on the Getting Started page. */
        "stratumHost": "example.com",
        "stats": {
            /* Gather stats to broadcast to page viewers and store in redis for historical stats
               every this many seconds. */
            "updateInterval": 15,
            /* How many seconds to hold onto historical stats. Currently set to 24 hours. */
            "historicalRetention": 43200,
            /* How many seconds worth of shares should be gathered to generate hashrate. */
            "hashrateWindow": 300
        },
        /* Not done yet. */
        "adminCenter": {
            "enabled": true,
            "password": "password"
        }
    },

    /* Redis instance of where to store global portal data such as historical stats, proxy states,
       ect.. */
    "redis": {
        "host": "127.0.0.1",
        "port": 6379
    },


    /* With this switching configuration, you can setup ports that accept miners for work based on
       a specific algorithm instead of a specific coin. Miners that connect to these ports are
       automatically switched a coin determined by the server. The default coin is the first
       configured pool for each algorithm and coin switching can be triggered using the
       cli.js script in the scripts folder.

       Miners connecting to these switching ports must use their public key in the format of
       RIPEMD160(SHA256(public-key)). An address for each type of coin is derived from the miner's
       public key, and payments are sent to that address. */
    "switching": {
        "switch1": {
            "enabled": false,
            "algorithm": "sha256",
            "ports": {
                "3333": {
                    "diff": 10,
                    "varDiff": {
                        "minDiff": 16,
                        "maxDiff": 512,
                        "targetTime": 15,
                        "retargetTime": 90,
                        "variancePercent": 30
                    }
                }
            }
        },
        "switch2": {
            "enabled": false,
            "algorithm": "scrypt",
            "ports": {
                "4444": {
                    "diff": 10,
                    "varDiff": {
                        "minDiff": 16,
                        "maxDiff": 512,
                        "targetTime": 15,
                        "retargetTime": 90,
                        "variancePercent": 30
                    }
                }
            }
        },
        "switch3": {
            "enabled": false,
            "algorithm": "x11",
            "ports": {
                "5555": {
                    "diff": 0.001
                }
            }
        }
    },

    "profitSwitch": {
        "enabled": false,
        "updateInterval": 600,
        "depth": 0.90,
        "usePoloniex": true,
        "useCryptsy": true,
        "useMintpal": true
    }
}
````


#### Coin config
Inside the `coins` directory, ensure a json file exists for meter coin. If it does not you will have to create it.
Here is an example of the required fields:
````js
{
    "name": "Meter",
    "symbol": "MTR",
    "algorithm": "sha256",
}
````

For additional documentation how to configure coins and their different algorithms
see [these instructions](github.com/meterio/meter-stratum-pool#module-usage).


#### Pool config
There is a json config file `meter.json`. Make sure to configure fields in this file, especially address fields.

The daemons field should be configured as follows:
```js
[
    {
        "host": "n01.meter.io",
        "port": 8332,
        "user": "testuser",
        "password": "testpass"
    }
]
```

Description of options:
````js
{
    "enabled": true, //Set this to false and a pool will not be created from this config file
    "coin": "meter.json", //Reference to coin config file in 'coins' directory

    "address": "mi4iBXbBsydtcc5yFmsff2zCFVX4XG7qJc", //Address to where block rewards are given

    /* Block rewards go to the configured pool wallet address to later be paid out to miners,
       except for a percentage that can go to, for examples, pool operator(s) as pool fees or
       or to donations address. Addresses or hashed public keys can be used. Here is an example
       of rewards going to the main pool op, and pool co-owner.*/
    "rewardRecipients": {
        "n37vuNFkXfk15uFnGoVyHZ6PYQxppD3QqK": 1.5, //1.5% goes to pool op
        "mirj3LtZxbSTharhtXvotqtJXUY7ki5qfx": 0.5, //0.5% goes to a pool co-owner
    },

    /* this is Pos beneficiary. It is 20 bytes address. Mining reward goes to this address in Pos ssytem. */
    "rewardBeneficiary": "0a05c2d862ca051010698b69b54278cbaf945ccb",

    /* payment must be disabled */
    "paymentProcessing": {
        "enabled": false,

        /* Every this many seconds get submitted blocks from redis, use daemon RPC to check
           their confirmation status, if confirmed then get shares from redis that contributed
           to block and send out payments. */
        "paymentInterval": 30,

        /* Minimum number of coins that a miner must earn before sending payment. Typically,
           a higher minimum means less transactions fees (you profit more) but miners see
           payments less frequently (they dislike). Opposite for a lower minimum payment. */
        "minimumPayment": 0.01,

        /* This daemon is used to send out payments. It MUST be for the daemon that owns the
           configured 'address' that receives the block rewards, otherwise the daemon will not
           be able to confirm blocks or send out payments. */
        "daemon": {
            "host": "127.0.0.1",
            "port": 8332,
            "user": "testuser",
            "password": "testpass"
        }
    },

    /* Each pool can have as many ports for your miners to connect to as you wish. Each port can
       be configured to use its own pool difficulty and variable difficulty settings. varDiff is
       optional and will only be used for the ports you configure it for. */
    "ports": {
        "3008": {
            "diff": 1
        },

        "3032": { //A port for your miners to connect to
            "diff": 32, //the pool difficulty for this port

            /* Variable difficulty is a feature that will automatically adjust difficulty for
               individual miners based on their hashrate in order to lower networking overhead */
            "varDiff": {
                "minDiff": 8, //Minimum difficulty
                "maxDiff": 512, //Network difficulty will be used if it is lower than this
                "targetTime": 15, //Try to get 1 share per this many seconds
                "retargetTime": 90, //Check to see if we should retarget every this many seconds
                "variancePercent": 30 //Allow time to very this % from target without retargeting
            }
        },
        "3256": { //Another port for your miners to connect to, for ASIC miner 
            "diff": 200000 //The pool difficulty
            "varDiff": {
                "minDiff": 100000,
                "maxDiff": 2000000,
                "targetTime": 15,
                "retargetTime": 90,
                "variancePercent": 30
            }

        }
    },

    /* More than one daemon instances can be setup in case one drops out-of-sync or dies. */
    "daemons": [
        {   //Main daemon instance
            "host": "127.0.0.1",
            "port": 8332,
            "user": "testuser",
            "password": "testpass"
        }
    ],

    /* This allows the pool to connect to the daemon as a node peer to receive block updates.
       It may be the most efficient way to get block updates (faster than polling, less
       intensive than blocknotify script). It requires the additional field "peerMagic" in
       the coin config. */
    "p2p": {
        "enabled": false,

        /* Host for daemon */
        "host": "127.0.0.1",

        /* Port configured for daemon (this is the actual peer port not RPC port) */
        "port": 19333,

        /* If your coin daemon is new enough then it will support a p2p
           feature that prevents the daemon from spamming our peer node with unnecessary
           transaction data. Assume its supported but if you have problems try disabling it. */
        "disableTransactions": true
    },
    
    /* Enabled this mode and shares will be inserted into in a MySQL database. You may also want
       to use the "emitInvalidBlockHashes" option below if you require it. The config options
       "redis" and "paymentProcessing" will be ignored/unused if this is enabled. */
    "mposMode": {
        "enabled": false,
        "host": "127.0.0.1", //MySQL db host
        "port": 3306, //MySQL db port
        "user": "me", //MySQL db user
        "password": "mypass", //MySQL db password
        "database": "mtr", //MySQL db database name

        /* Checks for valid password in database when miners connect. */
        "checkPassword": true,

        /* Unregistered workers can automatically be registered (added to database) on stratum
           worker authentication if this is true. */
        "autoCreateWorker": false
    }
}
````

You can create as many of these pool config files as you want (such as one pool per coin you wish to operate).
If you are creating multiple pools, ensure that they have unique stratum ports.

For more information on these configuration options see the [pool module documentation](https://github.com/meterio/meter-stratum-pool#module-usage).

### Start the portal

After all the configuration files has been set up, you're ready to start your mining pool in NodeJS:

```bash
node init.js
```



