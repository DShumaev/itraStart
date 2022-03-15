const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../index");
const {
  createTestUser,
  deleteTestUser,
  testUserValue,
  testUserValue2,
  testUserUpdatedValue,
  testUserIncorrectValue,
} = require("../utils");

describe("AUTH validation", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  afterAll(async () => {
    await deleteTestUser(userId);
  });

  test("error: 401 Unauthorized", async () => {
    await request(app)
      .post(`/user/`)
      .send(JSON.stringify(testUserValue2))
      .set("Content-Type", "application/json")
      .expect(httpStatus.UNAUTHORIZED);
  });
  test("error: 401 Unauthorized", async () => {
    await request(app)
      .put(`/user/${userId}`)
      .send(JSON.stringify(testUserUpdatedValue))
      .set("Content-Type", "application/json")
      .expect(httpStatus.UNAUTHORIZED);
  });
  test("error: 401 Unauthorized", async () => {
    await request(app)
      .delete(`/user/${userId}`)
      .expect(httpStatus.UNAUTHORIZED);
  });
});
