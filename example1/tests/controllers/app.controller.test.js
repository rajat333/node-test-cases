const chai = require("chai");
const expect = chai.expect;

const sinon = require("sinon");

// import our getIndexPage function
const indexPage = require("../../controllers/app.controller");

const user = {
  addUser: (name) => {
    this.name = name;
  },
};

describe("getIndexPage", function () {
  it("should return index page", function () {
    let req = {};
    // Have `res` have a send key with a function value coz we use `res.send()` in our func
    let res = {
      send: sinon.spy(), //function () {},
    };

    indexPage.getIndexPage(req, res);
    // let's see what we get on res.send
    console.log("@@@@@@@@@", res.send);
    // `res.send` called once
    expect(res.send.calledOnce).to.be.true;
    // expect to get argument `bla` on first call
    expect(res.send.firstCall.args[0]).to.equal("Hey");
  });
});

describe("User", function () {
  describe("addUser", function () {
    it("should add a user", function () {
      sinon.spy(user, "addUser");

      // lets log `addUser` and see what we get
      console.log("adduser adduser", user.addUser);
      user.addUser("John Doe");

      // lets log `addUser` and see what we get
      console.log(user.addUser);
      expect(user.addUser.calledOnce).to.be.true;
    });
  });

  describe("Login addUser check ", function () {
    it("should send hey when user is logged in", function () {
      // instantiate a user object with an empty isLoggedIn function
      let user = {
        isLoggedIn: function () {},
      };

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      // pass user into the req object
      let req = {
        user: user,
      };

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        // replace empty function with a spy
        send: sinon.spy(),
      };

      indexPage.getIndexPage1(req, res);
      // let's see what we get on res.send
      // console.log(res.send);
      // `res.send` called once
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.firstCall.args[0]).to.equal("Hey");

      // assert that the stub is logged in at least once
      expect(isLoggedInStub.calledOnce).to.be.true;
    });

    it("should send Error Message when user not logged in", function () {
      // instantiate a user object with an empty isLoggedIn function
      let user = {
        isLoggedIn: function () {},
      };

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(false);

      // pass user into the req object
      let req = {
        user: user,
      };

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        // replace empty function with a spy
        send: sinon.spy(),
      };

      indexPage.getIndexPage1(req, res);
      // let's see what we get on res.send
      // console.log(res.send);
      // `res.send` called once
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.firstCall.args[0]).to.equal(
        "Ooops. You need to log in to access this page"
      );

      // assert that the stub is logged in at least once
      expect(isLoggedInStub.calledOnce).to.be.true;
    });

    it("USING MOCK should send hey when user is logged in", function () {
      // instantiate a user object with an empty isLoggedIn function
      let user = {
        isLoggedIn: function () {},
      };

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      // pass user into the req object
      let req = {
        user: user,
      };

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        send: function () {},
      };

      // mock res
      const mock = sinon.mock(res);
      console.log("mock mock", mock);
      // build how we expect it t work
      mock.expects("send").once().withExactArgs("Hey");

      indexPage.getIndexPage1(req, res);
      expect(isLoggedInStub.calledOnce).to.be.true;

      // verify that mock works as expected
      mock.verify();
    });
  });
});
