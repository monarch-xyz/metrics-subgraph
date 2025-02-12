import { Bytes } from "@graphprotocol/graph-ts";
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

  let assetMetric = AssetMetric.load(market.loan);
  if (!assetMetric) {
    assetMetric = new AssetMetric(market.loan);
  }

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
  
  let assetMetric = AssetMetric.load(market.loan);
  if (!assetMetric) {
    assetMetric = new AssetMetric(market.loan);
  }

  assetMetric.totalWithdraw = assetMetric.totalWithdraw.plus(event.params.assets);
  assetMetric.numOfWithdraw = assetMetric.numOfWithdraw + 1;
  assetMetric.save();
}

function isMonarchTx(calldata: Bytes): boolean {
   // if the last 2 byte ends with "BEEF"
   let length = calldata.byteLength;
  return calldata.slice(length - 2, length) == Bytes.fromHexString("BEEF");
}