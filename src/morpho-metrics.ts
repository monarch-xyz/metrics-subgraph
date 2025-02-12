import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import {CreateMarket, Supply, Withdraw} from "../generated/MorphoBlue/Morpho"
import { Market, AssetMetric } from "../generated/schema"


export function handleCreate(event: CreateMarket): void {
  let market = new Market(event.params.id);
  market.marketId = event.params.id;
  market.loan = event.params.marketParams.loanToken;
  market.collateral = event.params.marketParams.collateralToken;
  market.irm = event.params.marketParams.irm;
  market.oracle = event.params.marketParams.oracle;
  market.lltv = event.params.marketParams.lltv;

  market.save();
}

export function handleSupply(event: Supply): void {

  // only process if it's Monarch Tx
  if (!isMonarchTx(event.transaction.input)) return;

  // load market to find asset 
  let market = Market.load(event.params.id);
  if (!market) {
    return;
  }

  let assetMetric = _loadOrCreateAssetMetric(market);

  assetMetric.totalSupply = assetMetric.totalSupply.plus(event.params.assets);
  assetMetric.numOfSupply = assetMetric.numOfSupply + 1;
  assetMetric.save();
}

export function handleWithdraw(event: Withdraw): void {
  
  if (!isMonarchTx(event.transaction.input)) return;

  let market = Market.load(event.params.id);
  if (!market) {
    return;
  }
  
  let assetMetric = _loadOrCreateAssetMetric(market);

  assetMetric.totalWithdraw = assetMetric.totalWithdraw.plus(event.params.assets);
  assetMetric.numOfWithdraw = assetMetric.numOfWithdraw + 1;
  assetMetric.save();
}

export function isMonarchTx(calldata: Bytes): boolean {
   // if the last 2 byte ends with "BEEF"
   let calldataString = calldata.toHex();
  return calldataString.endsWith("beef")
}

function _loadOrCreateAssetMetric(market: Market): AssetMetric {
  let assetMetric = AssetMetric.load(market.loan);
  if (!assetMetric) {
    assetMetric = new AssetMetric(market.loan);

    assetMetric.numOfSupply = 0;
    assetMetric.numOfWithdraw = 0;

    assetMetric.totalSupply = BigInt.fromI32(0);
    assetMetric.totalWithdraw = BigInt.fromI32(0);
  }

  return assetMetric;
}