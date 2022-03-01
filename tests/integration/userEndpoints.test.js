const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../index");
const Sequelize = require("sequelize");
const sequelize = require("../../models/index");
const getUserModel = require("../../models/user");
const config = require("config");
const bcrypt = require("bcrypt");

// -------------- PRESET FOR TEST BLOCK -------------------

const userModel = getUserModel(sequelize, Sequelize.DataTypes);

const testUserValue = {
  userName: "Testik",
  firstName: "Test",
  lastName: "Testovich",
  email: "test@mail.ru",
  password: "testpassword",
};

const testUserValue2 = {
  userName: "Testik2",
  firstName: "Test2",
  lastName: "Testovich2",
  email: "test2@mail.ru",
  password: "testpassword2",
};

const testUserUpdatedValue = {
  userName: "Testikovich",
  firstName: "Teston",
  lastName: "Testovichovski",
  email: "testing@mail.ru",
  password: "testpassword12345",
};

const testUserIncorrectValue = {
  user: "Testikovich",
  firstName: "Teston",
  lastName: "Testovichovski",
  email: "testing@mail.ru",
  password: "testpassword12345",
};

async function createTestUser(userData) {
  const createdUser = await userModel.create({
    userName: userData.userName,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: await bcrypt.hash(userData.password, config.get("hashPswdSalt")),
  });

  return createdUser.dataValues.id;
}

async function deleteTestUser(id) {
  await userModel.destroy({
    where: { id },
  });
}

// -------------- TEST BLOCK -------------------

describe("GET /user/:id", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  afterAll(async () => {
    await deleteTestUser(userId);
  });

  test("success: should return a user by id", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("success");
  });

  test("success: user with current id is not found", async () => {
    const response = await request(app)
      .get(`/user/5600`)
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("error");
    expect(response.body).toHaveProperty("message");
  });
});

describe("GET /user/all", () => {
  test("success: should return all users", async () => {
    const response = await request(app)
      .get(`/user/all`)
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
    expect(response.body).toHaveProperty("users");
    expect(response.body.users).not.toBeNull();
    expect(response.body.users).not.toBeUndefined();
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("success");
  });

  /*  test("success: user with current id is not found", async () => {
    const response = await request(app)
      .get(`/user/all`)
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("error");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("user didn't creat yet");
  });*/
});

describe("POST /user/create", () => {
  test("success: user created successfully ", async () => {
    const response = await request(app)
      .post(`/user/create`)
      .send(JSON.stringify(testUserValue2))
      .set("Content-Type", "application/json")
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("user created");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("success");
  });

  test("error: user did't create because fields of body incorrect", async () => {
    const response = await request(app)
      .post(`/user/create`)
      .send(JSON.stringify(testUserIncorrectValue))
      .set("Content-Type", "application/json")
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("user has not been created");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("error");
  });
});

describe("PUT /user/create", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });

  afterAll(async () => {
    await deleteTestUser(userId);
  });

  test("success: user info updated successfully ", async () => {
    const response = await request(app)
      .put(`/user/update/${userId}`)
      .send(JSON.stringify(testUserUpdatedValue))
      .set("Content-Type", "application/json")
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("success");
  });

  test("error: user did't update because fields of body incorrect", async () => {
    const response = await request(app)
      .put(`/user/update/${userId}`)
      .send(JSON.stringify(testUserIncorrectValue))
      .set("Content-Type", "application/json")
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("error");
  });
});

describe("DELETE /user/create", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  afterAll(async () => {
    await deleteTestUser(userId);
  });

  test("success: user info updated successfully ", async () => {
    const response = await request(app)
      .delete(`/user/remove/${userId}`)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("success");
  });

  test("error: user did't update because fields of body incorrect", async () => {
    const response = await request(app)
      .delete(`/user/remove/${userId}`)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("error");
  });
});
