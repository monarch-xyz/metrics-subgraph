import { Bytes } from "@graphprotocol/graph-ts"
import { assert, describe, test } from "matchstick-as/assembly/index"
import { isMonarchTx } from "../src/morpho-metrics"
import { log } from "matchstick-as/assembly/log";


describe("isMonarchTx()", () => {
  test("Should return true if the last 2 bytes are 0xBEEF", () => {
    let calldata = Bytes.fromHexString("0xac9650d80000beef")
    // log.info(calldata.toHexString(), [])
    let result = isMonarchTx(calldata)
    assert.booleanEquals(result, true)
  })
})
