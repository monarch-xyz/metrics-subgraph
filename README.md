# Monarch Metrics

## Intro

Filter Morpho on-chain events, and save to the graph if it's initiated by Monarch.

## Subgraphs
* monarch-metrics
* monarch-metrics-mainnet

## Running locally

```shell
graph codegen

graph build

# Build for a network (mainnet)
yarn build --network mainnet

yarn build --network base

# Set corresponding auth key
graph auth <key>

# Base subgraph
graph deploy monarch-metrics --network base

# Mainnet subgraph
graph deploy monarch-metrics-mainnet --network mainnet

```

### Testing

```shell

# Run with docker
graph test -d

```