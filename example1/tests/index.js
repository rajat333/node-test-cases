const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;

describe("smoke test", function () {
  it("checks equality", function () {
    assert.equal(true, true);
  });
  it("checks expect equality", function () {
    expect(true, true);
  });
});
