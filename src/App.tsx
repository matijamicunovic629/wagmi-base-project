import {
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useEstimateFeesPerGas,
  useWriteContract,

} from "wagmi";
import {
  Button,
  Collapse,




} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { arbitrum, mainnet, sepolia } from "wagmi/chains";
import {
  ChakraProvider,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { Wallet/*, providers*/ } from "ethers";
// import {BrowserProvider} from "ethers-v6";
import {BrowserProvider} from "ethers";
import { Orion } from "@orionprotocol/sdk";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { isConnected, address: myAddrs } = useAccount();
  const { disconnect } = useDisconnect();
  // const {switchChain} = useSwitchChain();
  const { writeContract } = useWriteContract();

  console.log("isConnected", isConnected);

  const { data: gasPriceData } = useEstimateFeesPerGas({
    chainId: 1,
    enabled: true,
  });


  const vvv = useMemo(() => {
    return 123n * 33n;
  }, [gasPriceData]);

  const abi = [
    {
      type: "function",
      name: "approve",
      stateMutability: "nonpayable",
      inputs: [
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ type: "bool" }],
    },
    {
      type: "function",
      name: "transferFrom",
      stateMutability: "nonpayable",
      inputs: [
        { name: "sender", type: "address" },
        { name: "recipient", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ type: "bool" }],
    },
  ];

  useEffect(() => {
    const orion = new Orion();
    (async () => {
      try {
        const pairs = await orion.getPairs("spot"); // 'spot'
        console.log("pairs", pairs);
      } catch (e) {
        console.log("error", e);
      }
    })();
  }, []);

  const handleButtonClick = () => {
    (async () => {
      // const web3Provider = new providers.Web3Provider(window.ethereum);
      const web3Provider = new BrowserProvider(window.ethereum);
      const signer = await web3Provider.getSigner();
      console.log("signer", signer);

      // const orion = new Orion();
      // const unit = orion.getUnit("eth");
      // console.log(unit.blockchainService.getTokensFee)
      // const wallet = new Wallet(
      //   "51ed743e0a8fe37f94b013ead59159fab7968dba1f28944e3c7eb569bd129c41",
      //   unit.provider
      // );
      // const assets = await orion.getAssets();
      // console.log("assets:", assets);
      // const bridgeHistory = await orion.bridge.getHistory(
      //   "0x0000000000000000000000000000000000000000"
      // );
      // console.log(bridgeHistory);

      const orion = new Orion();
      const unit = orion.getUnit("polygon");

      const wallet = new Wallet(
          "51ed743e0a8fe37f94b013ead59159fab7968dba1f28944e3c7eb569bd129c41"
          // "80c0d1cdc85335ac93e4ebdd632bf9bd922142427bb274c0407017e909df5ad5"
      );

      // unit.exchange.withdraw({
      //   amount: 435.275,
      //   asset: "USDT",
      //   signer: wallet, // or signer when UI
      // });
      unit.exchange.deposit({
        amount: 2.5,
        asset: "MATIC",
        signer: signer, // or signer when UI
      });
      return;

      // const { swapInfo, fee } = await unit.exchange.getSwapInfo({
      //   type: "exactSpend",
      //   assetIn: "ORN",
      //   assetOut: "USDT",
      //   feeAsset: "ORN",
      //   amount: 23.89045345,
      //   options: {
      //     // Optional
      //     instantSettlement: true,
      //     poolOnly: false,
      //   },
      // });

      // console.log(swapInfo);
      // console.log(fee);
      // const {
      //   value: { data },
      // } = await unit.aggregator.getPairConfig("ORN-USDT");
      // console.log(data);

      // const { qtyPrecision } = data;

      // const amount = 23.5346563;
      // const roundedAmount = new BigNumber(amount).decimalPlaces(
      //   qtyPrecision,
      //   BigNumber.ROUND_FLOOR
      // ); // You can use your own Math lib

      unit.exchange
          .swapLimit({
            type: "exactSpend",
            assetIn: "MATIC",
            assetOut: "USDT",
            feeAsset: "MATIC",
            amount: "18.2",
            price: 20,
            signer: signer, // or signer when UI
            options: {
              // All options are optional 🙂
              poolOnly: false, // You can specify whether you want to perform the exchange only through the pool
              instantSettlement: true, // Set true to ensure that funds can be instantly transferred to wallet (otherwise, there is a possibility of receiving funds to the balance of the exchange contract)
              logger: console.log,
              // Set it to true if you want the issues associated with
              // the lack of allowance to be automatically corrected
              autoApprove: true,
            },
          })
          .then(console.log);

      /*{
maxPrice: 10000,
maxQty: 90000,
minPrice: 0.0001,
minQty: 7.1,
name: "ORN-USDT",
pricePrecision: 4,
qtyPrecision: 1},
*/
      const {
        value: { data },
      } = await unit.aggregator.getPairConfig("MATIC-USDT");
      console.log(data);

      const { qtyPrecision } = data; //=1
      const amount = 23.5346563;
      const roundedAmount = new BigNumber(amount).decimalPlaces(
          qtyPrecision,
          BigNumber.ROUND_FLOOR
      ); // You can use your own Math lib
      // unit.exchange.withdraw({
      //   amount: 1.5,
      //   asset: "MATIC",
      //   signer: wallet, // or signer when UI
      // });

      // unit.exchange.deposit({
      //   amount: 2.5,
      //   asset: "MATIC",
      //   signer: wallet, // or signer when UI
      // });

      // unit.exchange
      //   .swapMarket({
      //     type: "exactSpend",
      //     assetIn: "ORN",
      //     assetOut: "USDT",
      //     feeAsset: "ORN",
      //     amount: roundedAmount.toNumber(),
      //     slippagePercent: 1,
      //     signer: wallet, // or signer when UI
      //     options: {
      //       // All options are optional 🙂
      //       poolOnly: false, // You can specify whether you want to perform the exchange only through the pool
      //       instantSettlement: true, // Set true to ensure that funds can be instantly transferred to wallet (otherwise, there is a possibility of receiving funds to the balance of the exchange contract)
      //       logger: console.log,
      //       // Set it to true if you want the issues associated with
      //       // the lack of allowance to be automatically corrected
      //       autoApprove: true,
      //     },
      //   })
      //   .then(console.log);

      // orion.bridge.swap(
      //   "ORN", // Asset name
      //   0.12345678, // Amount
      //   SupportedChainId.FANTOM_OPERA,
      //   SupportedChainId.BSC,
      //   wallet,
      //   {
      //     autoApprove: true,
      //     logger: console.log,
      //     withdrawToWallet: true, // Enable withdraw to wallet
      //   }
      // );

      // const amount = 23.5;
      // const roundedAmount = new BigNumber(amount).decimalPlaces(
      //   4,
      //   BigNumber.ROUND_FLOOR
      // );
      // You can use your own Math lib
      //   type PureSwapMarketParams = {
      //     amount: BigNumber.Value;
      //     signer: ethers.Signer;
      //     type: "exactSpend" | "exactReceive";
      //     assetIn: string;
      //     assetOut: string;
      //     feeAsset: string;
      //     options?: {
      //         poolOnly?: boolean | undefined;
      //         instantSettlement?: boolean | undefined;
      //         logger?: ((message: string) => void) | undefined;
      //         autoApprove?: boolean | undefined;
      //         developer?: {
      //             ...;
      //         } | undefined;
      //     } | undefined;
      //     slippagePercent: BigNumber.Value;
      // }

      // unit.exchange
      //   .swapMarket({
      //     type: "exactSpend",
      //     assetIn: "ORN",
      //     assetOut: "USDT",
      //     feeAsset: "ORN",
      //     amount: roundedAmount.toNumber(),
      //     slippagePercent: 1,
      //     signer: wallet, // or signer when UI
      //     options: {
      //       // All options are optional 🙂
      //       poolOnly: true, // You can specify whether you want to perform the exchange only through the pool
      //       instantSettlement: true, // Set true to ensure that funds can be instantly transferred to wallet (otherwise, there is a possibility of receiving funds to the balance of the exchange contract)
      //       logger: console.log,
      //       // Set it to true if you want the issues associated with
      //       // the lack of allowance to be automatically corrected
      //       autoApprove: true,
      //     },
      //   })
      //   .then(console.log);
    })();

    /*
    writeContract(
        {
          abi: [  {
            "constant": false,
            "inputs": [
              { "name": "_spender", "type": "address" },
              { "name": "_value", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }],
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          functionName: 'approve',
          args: [
            '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
            123n,
          ],
        },
        {
          onSuccess: () => {
            alert('success');
          },
          onError: (e) => {
            console.log(e);
            alert('error');
          }
        }
    )
*/
    /*
                writeContract(
                    {
                      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                      abi,
                      functionName: 'approve',
                      args: ['0x6352a56caadc4f1e25cd6c75970fa768a3304e64', /!*ethers.constants.MaxUint256*!/ 10n],
                      // enabled: isConnected && !!spender && !!token && normalizedAmount !== '0'
                    },
                    {
                      onSuccess: () => {
                        alert('success');
                      },
                      onError: (e) => {
                        console.log(e);
                        alert('error');
                      }
                    }
                )
    */

    /*
                console.log(connectors);
                if (!isConnected && Array.isArray(connectors) && connectors.length > 0) {
                  try {
                    connect({connector: connectors[3]});
                  } catch(e) {
                    alert(e);
                  }
                }
    */

    // switchChain(config, { chainId: arbitrum.id })
    // switchChain(arbitrum.id);
  };

  return (
      <>
        {/* <WagmiProvider config={config}> */}
        <ChakraProvider>
          <div className="chat-wrapper">
            <Button onClick={handleButtonClick}>Toggle</Button>
            <Collapse in={true}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
              terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
              labore wes anderson cred nesciunt sapiente ea proident.
            </Collapse>
          </div>
        </ChakraProvider>
        {/* </WagmiProvider> */}

        {/*
      <ChakraProvider theme={extendTheme({
            initialColorMode: 'system',
            useSystemColorMode: false,
          }
      )}>
        <DarkMode>
          <Box minH="100vh">
            <Center p="4" pb="20">
              <Box maxW="35ch">
                <Heading mb="2">Color Mode Test</Heading>
                <Button mt="2" onClick={()=>{}}>
                  Clear localStorage manually
                </Button>

                <Heading mt="8" mb="2" size="sm">
                  How to use
                </Heading>
                <OrderedList>
                  <ListItem>Open the console panel of this sandbox.</ListItem>
                  <ListItem>
                    Change color mode theme config from{" "}
                    <Code>src/chakra-ui/chakra-ui.custom-theme.ts</Code>
                  </ListItem>
                  <ListItem>
                    Refresh the preview to see how a first visit looks like.
                    <br />
                    <Box
                        px="2"
                        pt="2"
                        pb="3"
                        bg="gray.200"
                        rounded="md"
                        fontSize="xs"
                        _dark={{
                          bg: "gray.700"
                        }}
                    >
                      This is possible because after 3 seconds{" "}
                      <Code fontSize="xs">chakra-ui-color-mode</Code> item in
                      localStorage is deleted. Code for this is in{" "}
                      <Code fontSize="xs">
                        src/chakra-ui/chakra-ui.custom-theme.ts
                      </Code>
                    </Box>
                  </ListItem>
                  <ListItem>Play with preview.</ListItem>
                </OrderedList>

                <Heading mt="8" mb="2" size="sm">
                  Bottom Bar
                </Heading>
                <Text>In the fixed bottom bar you'll find:</Text>
                <UnorderedList>
                  <ListItem>
                    <Code>Prefers Color Scheme</Code>, is the setting controlled by
                    the OS, browser has no control over this. Is what Chakra UI
                    referes as <Code>system</Code>
                  </ListItem>
                  <ListItem>
                    <Code>Current Color Mode</Code> is real time value of the local
                    storage <Code>chakra-ui-color-mode</Code> item. This value
                    changes when you press the "Toggle to Light/Dark" button at the
                    top. This value is what <Code>useColorMode()</Code> returns.
                  </ListItem>
                </UnorderedList>
              </Box>
            </Center>

          </Box>
          <Modal isOpen={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color="white" />
              <ModalBody display="flex" gap="8px" flexDir="column" alignItems="center" marginY="4rem" color="white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="16 12 12 8 8 12"></polyline>
                  <line x1="12" y1="16" x2="12" y2="8"></line>
                </svg>
                <div>
                  Transaction Submitted
                </div>
              </ModalBody>
              <ChakraLink
                  isExternal
                  fontSize={'lg'}
                  textAlign={'center'}
                  padding="6px 1rem"
                  borderRadius="0.375rem"
                  bg="#a2cdff"
                  margin="0 1rem 1rem"
                  color="black"
                  _hover={{ textDecoration: 'none' }}
              >
                View on explorer
              </ChakraLink>
            </ModalContent>
          </Modal>
        </DarkMode>
      </ChakraProvider>
*/}

        {/*
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
*/}

        {/* <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => {
              console.log("CONNECTOR", connector);
              connect({ connector });
            }}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div> */}
      </>
  );
}

export default App;



/*
import {
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useEstimateFeesPerGas,
  useGasPrice,
  useSwitchChain, useWriteContract, WagmiProvider
} from 'wagmi'
import {
  Button,
  Center, Collapse,
  Heading,
  OrderedList,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import React, {useEffect, useMemo} from "react";
import {arbitrum, mainnet, sepolia} from "wagmi/chains";
import {estimateFeesPerGas} from "viem/actions";
import {
  ChakraProvider,
  DarkMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Link as ChakraLink, extendTheme, Box, ListItem, Code,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { switchChain } from '@wagmi/core'
import {safe, metaMask, injected, walletConnect} from "wagmi/connectors";
import { Wallet, ethers } from "ethers";
import { Unit, Orion } from "@orionprotocol/sdk";
import detectEthereumProvider from "@metamask/detect-provider";
import { BaseProvider } from "@metamask/providers";
import { BrowserProvider } from "ethers";
import { Defined } from '@definedfi/sdk/dist/sdk'
import { ExecutionResult, Sink } from 'graphql-ws'

const sdk = new Defined('9dac34318cfc1c1a3d4f7dd76a126a7d17882d81')
const sink = {
  next: ({ data }) => {
    // Note that data is correctly typed as a Price model
    console.log("Got subscription data", data)
  },
  error: (err) => {
    console.log("Got subscription error", err)
  },
  complete: () => {
    console.log("Got subscription complete")
  }
}


const config = createConfig({
  chains: [mainnet, sepolia, arbitrum],
  connectors: [
    injected(),
    walletConnect({ projectId: '' }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
})


const PRIVATE_KEY = '51ed743e0a8fe37f94b013ead59159fab7968dba1f28944e3c7eb569bd129c41';

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { isConnected, address:myAddrs } = useAccount();
  const { disconnect } = useDisconnect()
  // const {switchChain} = useSwitchChain();
  const { writeContract } = useWriteContract()

  console.log("isConnected", isConnected);

  const { data: gasPriceData } = useEstimateFeesPerGas({
    chainId: 1,
    enabled: true
  });




  // console.log("gasPriceData", gasPriceData);

  // const ddd = useGasPrice()
  // console.log("ddd", ddd);



  /!*
    (async () => {
      let ddconfig = createConfig({
        chains: [mainnet, sepolia],
        transports: {
          [mainnet.id]: http(),
          [sepolia.id]: http(),
        },
      })
      const result = await estimateFeesPerGas(ddconfig);
      console.log("result", result);
    })();
  *!/


  const vvv = useMemo(() => {
    return 123n * 33n;
  }, [gasPriceData]);


  const abi = [
    {
      type: 'function',
      name: 'approve',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [{ type: 'bool' }],
    },
    {
      type: 'function',
      name: 'transferFrom',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'recipient', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [{ type: 'bool' }],
    },
  ];


/!*
  useEffect(() => {
    const orion = new Orion();
    (async () => {

      try {
        const pairs = await orion.getPairs('spot'); // 'spot'
        console.log("pairs", pairs);

      } catch(e) {
        console.log("error", e);
      }

    })();
  }, []);
*!/

  const handleButtonClick = () => {

    detectEthereumProvider().then((provider) => {
      if (provider) {
        (async () => {

          const web3Provider = new BrowserProvider(window.ethereum);
          await web3Provider.ready;
          const signer = await web3Provider.getSigner();
          console.log("signer", signer);

          const orion = new Orion();
          const unit = orion.getUnit("polygon"); // eth, bsc, ftm, polygon, okc available
          // const wallet = new Wallet('51ed743e0a8fe37f94b013ead59159fab7968dba1f28944e3c7eb569bd129c41', unit.provider);

          unit.exchange.deposit({
            amount: 2.5,
            asset: "MATIC",
            signer: signer, // or signer when UI
          });
          return;

          const amount = 23.5346;
          const roundedAmount = new BigNumber(amount).decimalPlaces(
              4,
              BigNumber.ROUND_FLOOR
          ); // You can use your own Math lib

          unit.exchange
              .swapMarket({
                type: "exactSpend",
                assetIn: "ORN",
                assetOut: "USDT",
                feeAsset: "ORN",
                amount: roundedAmount.toNumber(),
                slippagePercent: 1,
                signer: wallet, // or signer when UI
                options: {
                  // All options are optional 🙂
                  poolOnly: true, // You can specify whether you want to perform the exchange only through the pool
                  instantSettlement: true, // Set true to ensure that funds can be instantly transferred to wallet (otherwise, there is a possibility of receiving funds to the balance of the exchange contract)
                  logger: console.log,
                  // Set it to true if you want the issues associated with
                  // the lack of allowance to be automatically corrected
                  autoApprove: true,
                },
              })
              .then(console.log);

        })();
/!*
        startApp(provider as BaseProvider);
*!/
      } else {
        console.log("Please install MetaMask!");
      }
    });




/!*
    writeContract(
        {
          abi: [  {
            "constant": false,
            "inputs": [
              { "name": "_spender", "type": "address" },
              { "name": "_value", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }],
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          functionName: 'approve',
          args: [
            '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
            123n,
          ],
        },
        {
          onSuccess: () => {
            alert('success');
          },
          onError: (e) => {
            console.log(e);
            alert('error');
          }
        }
    )
*!/
    /!*
                writeContract(
                    {
                      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                      abi,
                      functionName: 'approve',
                      args: ['0x6352a56caadc4f1e25cd6c75970fa768a3304e64', /!*ethers.constants.MaxUint256*!/ 10n],
                      // enabled: isConnected && !!spender && !!token && normalizedAmount !== '0'
                    },
                    {
                      onSuccess: () => {
                        alert('success');
                      },
                      onError: (e) => {
                        console.log(e);
                        alert('error');
                      }
                    }
                )
    *!/



    /!*
                console.log(connectors);
                if (!isConnected && Array.isArray(connectors) && connectors.length > 0) {
                  try {
                    connect({connector: connectors[3]});
                  } catch(e) {
                    alert(e);
                  }
                }
    *!/



    // switchChain(config, { chainId: arbitrum.id })
    // switchChain(arbitrum.id);
  }



  return (
    <>
      <WagmiProvider
          config={config}
      >
      <ChakraProvider>
        <div className="chat-wrapper">
          <Button onClick={handleButtonClick}>
            Toggle
          </Button>
          <Collapse in={true}>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </Collapse>
        </div>
      </ChakraProvider>
      </WagmiProvider>

      {/!*
      <ChakraProvider theme={extendTheme({
            initialColorMode: 'system',
            useSystemColorMode: false,
          }
      )}>
        <DarkMode>
          <Box minH="100vh">
            <Center p="4" pb="20">
              <Box maxW="35ch">
                <Heading mb="2">Color Mode Test</Heading>
                <Button mt="2" onClick={()=>{}}>
                  Clear localStorage manually
                </Button>

                <Heading mt="8" mb="2" size="sm">
                  How to use
                </Heading>
                <OrderedList>
                  <ListItem>Open the console panel of this sandbox.</ListItem>
                  <ListItem>
                    Change color mode theme config from{" "}
                    <Code>src/chakra-ui/chakra-ui.custom-theme.ts</Code>
                  </ListItem>
                  <ListItem>
                    Refresh the preview to see how a first visit looks like.
                    <br />
                    <Box
                        px="2"
                        pt="2"
                        pb="3"
                        bg="gray.200"
                        rounded="md"
                        fontSize="xs"
                        _dark={{
                          bg: "gray.700"
                        }}
                    >
                      This is possible because after 3 seconds{" "}
                      <Code fontSize="xs">chakra-ui-color-mode</Code> item in
                      localStorage is deleted. Code for this is in{" "}
                      <Code fontSize="xs">
                        src/chakra-ui/chakra-ui.custom-theme.ts
                      </Code>
                    </Box>
                  </ListItem>
                  <ListItem>Play with preview.</ListItem>
                </OrderedList>

                <Heading mt="8" mb="2" size="sm">
                  Bottom Bar
                </Heading>
                <Text>In the fixed bottom bar you'll find:</Text>
                <UnorderedList>
                  <ListItem>
                    <Code>Prefers Color Scheme</Code>, is the setting controlled by
                    the OS, browser has no control over this. Is what Chakra UI
                    referes as <Code>system</Code>
                  </ListItem>
                  <ListItem>
                    <Code>Current Color Mode</Code> is real time value of the local
                    storage <Code>chakra-ui-color-mode</Code> item. This value
                    changes when you press the "Toggle to Light/Dark" button at the
                    top. This value is what <Code>useColorMode()</Code> returns.
                  </ListItem>
                </UnorderedList>
              </Box>
            </Center>

          </Box>
          <Modal isOpen={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color="white" />
              <ModalBody display="flex" gap="8px" flexDir="column" alignItems="center" marginY="4rem" color="white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="16 12 12 8 8 12"></polyline>
                  <line x1="12" y1="16" x2="12" y2="8"></line>
                </svg>
                <div>
                  Transaction Submitted
                </div>
              </ModalBody>
              <ChakraLink
                  isExternal
                  fontSize={'lg'}
                  textAlign={'center'}
                  padding="6px 1rem"
                  borderRadius="0.375rem"
                  bg="#a2cdff"
                  margin="0 1rem 1rem"
                  color="black"
                  _hover={{ textDecoration: 'none' }}
              >
                View on explorer
              </ChakraLink>
            </ModalContent>
          </Modal>
        </DarkMode>
      </ChakraProvider>
*!/}


      {/!*
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
*!/}

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => {

              console.log("CONNECTOR", connector);
              connect({ connector })

            }
          }
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
*/
