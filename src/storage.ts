import { Bytes, TypedMap } from "@graphprotocol/graph-ts";


// 1: true, 0 false
export let userAssetMap = new TypedMap<Bytes, string>();


export function isKnownUserForLoan(user: Bytes, loan: Bytes): boolean {
  let key = user.concat(loan);
  let value =  userAssetMap.get(key);
  if (value == null) return false;
  return value == "1";
}

export function flagUserLoan(user: Bytes, loan: Bytes): void {
  let key = user.concat(loan);
  userAssetMap.set(key, "1");
}