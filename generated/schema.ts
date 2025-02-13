// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Market extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Market entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Market must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Market", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Market | null {
    return changetype<Market | null>(
      store.get_in_block("Market", id.toHexString()),
    );
  }

  static load(id: Bytes): Market | null {
    return changetype<Market | null>(store.get("Market", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get marketId(): Bytes {
    let value = this.get("marketId");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set marketId(value: Bytes) {
    this.set("marketId", Value.fromBytes(value));
  }

  get loan(): Bytes {
    let value = this.get("loan");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set loan(value: Bytes) {
    this.set("loan", Value.fromBytes(value));
  }

  get collateral(): Bytes {
    let value = this.get("collateral");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set collateral(value: Bytes) {
    this.set("collateral", Value.fromBytes(value));
  }

  get irm(): Bytes {
    let value = this.get("irm");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set irm(value: Bytes) {
    this.set("irm", Value.fromBytes(value));
  }

  get oracle(): Bytes {
    let value = this.get("oracle");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set oracle(value: Bytes) {
    this.set("oracle", Value.fromBytes(value));
  }

  get lltv(): BigInt {
    let value = this.get("lltv");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set lltv(value: BigInt) {
    this.set("lltv", Value.fromBigInt(value));
  }
}

export class UserTransaction extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserTransaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type UserTransaction must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UserTransaction", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): UserTransaction | null {
    return changetype<UserTransaction | null>(
      store.get_in_block("UserTransaction", id.toHexString()),
    );
  }

  static load(id: Bytes): UserTransaction | null {
    return changetype<UserTransaction | null>(
      store.get("UserTransaction", id.toHexString()),
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get msgSender(): Bytes {
    let value = this.get("msgSender");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set msgSender(value: Bytes) {
    this.set("msgSender", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get supplyCount(): i32 {
    let value = this.get("supplyCount");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set supplyCount(value: i32) {
    this.set("supplyCount", Value.fromI32(value));
  }

  get withdrawCount(): i32 {
    let value = this.get("withdrawCount");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set withdrawCount(value: i32) {
    this.set("withdrawCount", Value.fromI32(value));
  }

  get supplies(): SupplyEventLoader {
    return new SupplyEventLoader(
      "UserTransaction",
      this.get("id")!.toBytes().toHexString(),
      "supplies",
    );
  }

  get withdrawals(): WithdrawEventLoader {
    return new WithdrawEventLoader(
      "UserTransaction",
      this.get("id")!.toBytes().toHexString(),
      "withdrawals",
    );
  }

  get supplyVolume(): BigInt {
    let value = this.get("supplyVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set supplyVolume(value: BigInt) {
    this.set("supplyVolume", Value.fromBigInt(value));
  }

  get withdrawVolume(): BigInt {
    let value = this.get("withdrawVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set withdrawVolume(value: BigInt) {
    this.set("withdrawVolume", Value.fromBigInt(value));
  }
}

export class SupplyEvent extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SupplyEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type SupplyEvent must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("SupplyEvent", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): SupplyEvent | null {
    return changetype<SupplyEvent | null>(
      store.get_in_block("SupplyEvent", id.toHexString()),
    );
  }

  static load(id: Bytes): SupplyEvent | null {
    return changetype<SupplyEvent | null>(
      store.get("SupplyEvent", id.toHexString()),
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get market(): Bytes {
    let value = this.get("market");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set market(value: Bytes) {
    this.set("market", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class WithdrawEvent extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WithdrawEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type WithdrawEvent must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("WithdrawEvent", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): WithdrawEvent | null {
    return changetype<WithdrawEvent | null>(
      store.get_in_block("WithdrawEvent", id.toHexString()),
    );
  }

  static load(id: Bytes): WithdrawEvent | null {
    return changetype<WithdrawEvent | null>(
      store.get("WithdrawEvent", id.toHexString()),
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get market(): Bytes {
    let value = this.get("market");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set market(value: Bytes) {
    this.set("market", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type User must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("User", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): User | null {
    return changetype<User | null>(
      store.get_in_block("User", id.toHexString()),
    );
  }

  static load(id: Bytes): User | null {
    return changetype<User | null>(store.get("User", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get firstTxTimestamp(): BigInt {
    let value = this.get("firstTxTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set firstTxTimestamp(value: BigInt) {
    this.set("firstTxTimestamp", Value.fromBigInt(value));
  }

  get lastTxTimestamp(): BigInt {
    let value = this.get("lastTxTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set lastTxTimestamp(value: BigInt) {
    this.set("lastTxTimestamp", Value.fromBigInt(value));
  }

  get totalTransactionCount(): i32 {
    let value = this.get("totalTransactionCount");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set totalTransactionCount(value: i32) {
    this.set("totalTransactionCount", Value.fromI32(value));
  }

  get loyaltyScore(): BigInt {
    let value = this.get("loyaltyScore");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set loyaltyScore(value: BigInt) {
    this.set("loyaltyScore", Value.fromBigInt(value));
  }

  get supplies(): SupplyEventLoader {
    return new SupplyEventLoader(
      "User",
      this.get("id")!.toBytes().toHexString(),
      "supplies",
    );
  }

  get withdrawals(): WithdrawEventLoader {
    return new WithdrawEventLoader(
      "User",
      this.get("id")!.toBytes().toHexString(),
      "withdrawals",
    );
  }
}

export class AssetMetric extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AssetMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type AssetMetric must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("AssetMetric", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): AssetMetric | null {
    return changetype<AssetMetric | null>(
      store.get_in_block("AssetMetric", id.toHexString()),
    );
  }

  static load(id: Bytes): AssetMetric | null {
    return changetype<AssetMetric | null>(
      store.get("AssetMetric", id.toHexString()),
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get totalSupplyVolume(): BigInt {
    let value = this.get("totalSupplyVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalSupplyVolume(value: BigInt) {
    this.set("totalSupplyVolume", Value.fromBigInt(value));
  }

  get totalWithdrawVolume(): BigInt {
    let value = this.get("totalWithdrawVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalWithdrawVolume(value: BigInt) {
    this.set("totalWithdrawVolume", Value.fromBigInt(value));
  }

  get supplyCount(): i32 {
    let value = this.get("supplyCount");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set supplyCount(value: i32) {
    this.set("supplyCount", Value.fromI32(value));
  }

  get withdrawCount(): i32 {
    let value = this.get("withdrawCount");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set withdrawCount(value: i32) {
    this.set("withdrawCount", Value.fromI32(value));
  }

  get uniqueSuppliers(): i32 {
    let value = this.get("uniqueSuppliers");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set uniqueSuppliers(value: i32) {
    this.set("uniqueSuppliers", Value.fromI32(value));
  }

  get lastUpdateTimestamp(): BigInt {
    let value = this.get("lastUpdateTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set lastUpdateTimestamp(value: BigInt) {
    this.set("lastUpdateTimestamp", Value.fromBigInt(value));
  }
}

export class UserAssetMetric extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserAssetMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type UserAssetMetric must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UserAssetMetric", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): UserAssetMetric | null {
    return changetype<UserAssetMetric | null>(
      store.get_in_block("UserAssetMetric", id.toHexString()),
    );
  }

  static load(id: Bytes): UserAssetMetric | null {
    return changetype<UserAssetMetric | null>(
      store.get("UserAssetMetric", id.toHexString()),
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get asset(): Bytes {
    let value = this.get("asset");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set asset(value: Bytes) {
    this.set("asset", Value.fromBytes(value));
  }

  get knownSupplyVolume(): BigInt {
    let value = this.get("knownSupplyVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set knownSupplyVolume(value: BigInt) {
    this.set("knownSupplyVolume", Value.fromBigInt(value));
  }

  get knownWithdrawVolume(): BigInt {
    let value = this.get("knownWithdrawVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set knownWithdrawVolume(value: BigInt) {
    this.set("knownWithdrawVolume", Value.fromBigInt(value));
  }

  get lastUpdateTimestamp(): BigInt {
    let value = this.get("lastUpdateTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set lastUpdateTimestamp(value: BigInt) {
    this.set("lastUpdateTimestamp", Value.fromBigInt(value));
  }
}

export class SupplyEventLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): SupplyEvent[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<SupplyEvent[]>(value);
  }
}

export class WithdrawEventLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): WithdrawEvent[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<WithdrawEvent[]>(value);
  }
}
