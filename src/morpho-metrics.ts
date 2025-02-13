import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { Supply, Withdraw, CreateMarket } from "../generated/MorphoBlue/Morpho";
import { 
  User, 
  UserTransaction, 
  SupplyEvent, 
  WithdrawEvent, 
  AssetMetric,
  UserAssetMetric,
  Market,
} from "../generated/schema";
import { isKnownUserForLoan, flagUserLoan } from "./storage";

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
  if (!isMonarchTx(event.transaction.input)) return;

  let txHash = event.transaction.hash;
  let market = Market.load(event.params.id);
  if (!market) return;

  let user = _loadOrCreateUser(event.params.onBehalf);
  let tx = _loadOrCreateTransaction(txHash, event.params.onBehalf, event.transaction.from, event.block.timestamp);

  // Create supply event
  let eventId = txHash.concat(Bytes.fromI32(event.logIndex.toI32()));
  let supplyEvent = new SupplyEvent(eventId);
  supplyEvent.transaction = tx.id;
  supplyEvent.user = user.id;
  supplyEvent.market = event.params.id;
  supplyEvent.amount = event.params.assets;
  supplyEvent.timestamp = event.block.timestamp;
  supplyEvent.save();

  // Update asset metrics
  let assetMetric = _loadOrCreateAssetMetric(market.loan);
  let userAssetMetric = _loadOrCreateUserAssetMetric(event.params.onBehalf, market.loan);
  
  assetMetric.totalSupplyVolume = assetMetric.totalSupplyVolume.plus(event.params.assets);
  assetMetric.supplyCount += 1;
  
  // Update user metrics
  userAssetMetric.knownSupplyVolume = userAssetMetric.knownSupplyVolume.plus(event.params.assets);
  userAssetMetric.lastUpdateTimestamp = event.block.timestamp;
  userAssetMetric.save();

  // If not created before (user / loan), create a new flag
  if (!isKnownUserForLoan) {
    assetMetric.uniqueSuppliers += 1;
    flagUserLoan(event.params.onBehalf, market.loan);
  }

  assetMetric.lastUpdateTimestamp = event.block.timestamp;
  assetMetric.save();

  // Update user
  user.lastTxTimestamp = event.block.timestamp;
  user.totalTransactionCount += 1;
  let daysActive = event.block.timestamp.minus(user.firstTxTimestamp).div(BigInt.fromI32(86400));
  user.loyaltyScore = daysActive.times(BigInt.fromI32(user.totalTransactionCount));
  user.save();

  // Update transaction
  tx.supplyCount += 1;
  tx.supplyVolume = tx.supplyVolume.plus(event.params.assets);
  tx.save();
}

export function handleWithdraw(event: Withdraw): void {
  if (!isMonarchTx(event.transaction.input)) return;

  let txHash = event.transaction.hash;
  let market = Market.load(event.params.id);
  if (!market) return;

  let user = _loadOrCreateUser(event.params.onBehalf);
  let tx = _loadOrCreateTransaction(txHash, event.params.onBehalf, event.transaction.from, event.block.timestamp);

  // Create withdraw event
  let eventId = txHash.concat(Bytes.fromI32(event.logIndex.toI32()));
  let withdrawEvent = new WithdrawEvent(eventId);
  withdrawEvent.transaction = tx.id;
  withdrawEvent.user = user.id;
  withdrawEvent.market = event.params.id;
  withdrawEvent.amount = event.params.assets;
  withdrawEvent.timestamp = event.block.timestamp;
  withdrawEvent.save();

  // Update asset metrics
  let assetMetric = _loadOrCreateAssetMetric(market.loan);
  let userAssetMetric = _loadOrCreateUserAssetMetric(event.params.onBehalf, market.loan);

  assetMetric.totalWithdrawVolume = assetMetric.totalWithdrawVolume.plus(event.params.assets);
  assetMetric.withdrawCount += 1;
  
  // Update user metrics
  userAssetMetric.knownWithdrawVolume = userAssetMetric.knownWithdrawVolume.plus(event.params.assets);
  userAssetMetric.lastUpdateTimestamp = event.block.timestamp;
  userAssetMetric.save();


  // If not created before (user / loan), create a new flag
  if (!isKnownUserForLoan) {
    assetMetric.uniqueSuppliers += 1;
    flagUserLoan(event.params.onBehalf, market.loan);
  }

  assetMetric.lastUpdateTimestamp = event.block.timestamp;
  assetMetric.save();


  // Update user
  user.lastTxTimestamp = event.block.timestamp;
  user.totalTransactionCount += 1;
  let daysActive = event.block.timestamp.minus(user.firstTxTimestamp).div(BigInt.fromI32(86400));
  user.loyaltyScore = daysActive.times(BigInt.fromI32(user.totalTransactionCount));
  user.save();

  // Update transaction
  tx.withdrawCount += 1;
  tx.withdrawVolume = tx.withdrawVolume.plus(event.params.assets);
  tx.save();
}

function _loadOrCreateUser(address: Bytes): User {
  let user = User.load(address);
  if (!user) {
    user = new User(address);
    user.firstTxTimestamp = BigInt.fromI32(0);
    user.lastTxTimestamp = BigInt.fromI32(0);
    user.totalTransactionCount = 0;
    user.loyaltyScore = BigInt.fromI32(0);
  }
  return user;
}

function _loadOrCreateTransaction(hash: Bytes, user: Bytes, msgSender: Bytes, timestamp: BigInt): UserTransaction {
  let tx = UserTransaction.load(hash);
  if (!tx) {
    tx = new UserTransaction(hash);
    tx.user = user;
    tx.msgSender = msgSender;
    tx.timestamp = timestamp;
    tx.supplyCount = 0;
    tx.withdrawCount = 0;
    tx.supplyVolume = BigInt.fromI32(0);
    tx.withdrawVolume = BigInt.fromI32(0);
  }
  return tx;
}

function _loadOrCreateAssetMetric(asset: Bytes): AssetMetric {
  let metric = AssetMetric.load(asset);
  if (!metric) {
    metric = new AssetMetric(asset);
    metric.totalSupplyVolume = BigInt.fromI32(0);
    metric.totalWithdrawVolume = BigInt.fromI32(0);
    metric.supplyCount = 0;
    metric.withdrawCount = 0;
    metric.uniqueSuppliers = 0;
    metric.lastUpdateTimestamp = BigInt.fromI32(0);
  }
  return metric;
}

function _loadOrCreateUserAssetMetric(user: Bytes, asset: Bytes): UserAssetMetric {
  let id = user.concat(asset);
  let metric = UserAssetMetric.load(id);
  if (!metric) {
    metric = new UserAssetMetric(id);
    metric.user = user;
    metric.asset = asset;
    metric.knownSupplyVolume = BigInt.fromI32(0);
    metric.knownWithdrawVolume = BigInt.fromI32(0);
    metric.lastUpdateTimestamp = BigInt.fromI32(0);
  }
  return metric;
}

export function isMonarchTx(calldata: Bytes): boolean {
  let calldataString = calldata.toHex();
  return calldataString.endsWith("beef");
}
