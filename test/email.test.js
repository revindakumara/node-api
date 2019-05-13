// import request from "supertest";
const request = require("supertest");
const app = require("../dist/app");
// import app from "../lib/app";

const chai = require("chai");
const expect = chai.expect;

describe("GET /email", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/email")
      .expect(200, done);
  });
});


describe("POST /email", () => {
  it("should return false from assert when no message is found", (done) => {
    request(app).post("/email")
      .field("subject", "Test Mail")
      .field("to", "revindakumara@gmail.com")
      .field("content", "lorem ipsum")
      .end(function(err, res) {
        expect(res.error).to.be.false;
        done();
      })
      .expect(302);

  });
});