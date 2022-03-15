const authServices = require("../../services/authService");

const {
  createTestUser,
  deleteTestUser,
  testUserValue,
  testUserUpdatedValue,
  testUserUpdatedIncorrectValue,
} = require("../utils");

describe("test getUser method", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  afterAll(async () => {
    await deleteTestUser(userId);
  });
  test("success: user logged in", async () => {
    expect(
      await authServices.loginUser(testUserValue.email, testUserValue.password)
    ).toHaveProperty("token", "userId", "userName");
    const responseJSON = await authServices.loginUser(
      testUserValue.email,
      testUserValue.password
    );
    expect(responseJSON.userName).toEqual(testUserValue.userName);
    expect(responseJSON.userId).toEqual(userId);
  });
});
