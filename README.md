# taco-demo

See this demo in action at https://taco-demo.netlify.app/

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/nucypher/taco-web/tree/main/demos/taco-demo)

## Installation

```bash
pnpm install
pnpm start
```

## Usage

In order to run this demo will need a browser wallet with an account funded with
some $MATIC.

In order to connect with the network, the demo uses a public instances of
[Porter](https://docs.taco.build/architecture/porter).

### Polygon

`@nucypher/taco` is in an early release. We recommend **not** using it in
production _just yet_.

### Lynx Testnet

The current release of `@nucypher/taco` supports Ursulas working on Lynx
(bleeding-edge) test network and contracts deployed on Polygon Amoy testnet.

## References

Please find developer documentation at [TACo docs](https://docs.taco.build/).

This dApp is based on
[`useDapp` example](https://github.com/EthWorks/useDapp/tree/master/packages/example).
