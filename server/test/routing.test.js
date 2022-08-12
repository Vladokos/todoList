const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { it } = require("mocha");
const server = require("../server");

chai.use(chaiHttp);

describe("Login requests", () => {
  it("should return 404 ", () => {
    chai
      .request(server)
      .post("/log")
      .set("content-type", "application/json")
      .send({
        login: "asd3",
        password: "123",
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("User does not exist");
      });
  });

  it("should return 400 ", () => {
    chai
      .request(server)
      .post("/log")
      .set("content-type", "application/json")
      .send({
        login: "",
        password: "123",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("No data");
      });
  });

  it("should return 200", () => {
    chai
      .request(server)
      .post("/log")
      .set("content-type", "application/json")
      .send({
        login: process.env.USER_LOGIN,
        password: process.env.USER_PASSWORD,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Success");
      });
  });
});

describe("Registration requests", () => {
  it("should return 200 ", () => {
    chai
      .request(server)
      .post("/reg")
      .set("content-type", "application/json")
      .send({
        login: process.env.USER_LOGIN,
        password: process.env.USER_PASSWORD,
      })
      .end((err, res) => {
        expect(res).to.have.status(200 | 400);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Success");
      });
  });
});

describe("Card's requests", () => {
  it("Adding card, should return 400 ", () => {
    chai
      .request(server)
      .post("/addCard")
      .set("content-type", "application/json")
      .send({
        order: 12,
        task: null,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("No data");
      });
  });

  it("Adding card, should return 200 ", () => {
    chai
      .request(server)
      .post("/addCard")
      .set("content-type", "application/json")
      .send({
        task: "test me",
        userId: process.env.USER_ID,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Success");
      });
  });

  it("Change card, should return 200", () => {
    chai
      .request(server)
      .post("/changeCard")
      .set("content-type", "application/json")
      .send({
        cardId: process.env.CARD_ID,
        task: "hello from mocha",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Success");
      });
  });

  it("Delete card, should return 200", () => {
    chai
      .request(server)
      .post("/removeCard")
      .set("content-type", "application/json")
      .send({
        userId: process.env.USER_ID,
        cardId: process.env.CARD_ID,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Success");
      });
  });
});

describe("Test /checkUser", () => {
  it("Should return 200", () => {
    chai
      .request(server)
      .post("/checkUser")
      .set("content-type", "application/json")
      .send({
        userId: process.env.USER_ID,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Success");
      });
  });
  it("Should return 400", () => {
    chai
      .request(server)
      .post("/checkUser")
      .set("content-type", "application/json")
      .send({
        userId: 'nonjiojioj',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.be.equal("Error");
      });
  });
});
