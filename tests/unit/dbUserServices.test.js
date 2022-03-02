const dbUserServices = require("../../services/dbUserServices");
const {
  createTestUser,
  deleteTestUser,
  testUserValue,
  testUserUpdatedValue,
  testUserUpdatedIncorrectValue,
} = require("../utils");

/*describe("test getAllUser method", () => {
  beforeEach(() => {
    createTestUser(testUserValue);
  });
  afterEach(() => {
    deleteTestUser(testUserValue);
  });
  test("success:", () => {});
  test("", () => {});
  test("", () => {});
  test("error:", () => {});
});*/

describe("test getUser method", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  afterAll(async () => {
    await deleteTestUser(userId);
  });
  test("success: find created user", async () => {
    expect(await dbUserServices.getUser(userId)).toBeTruthy();
  });
  test("error: user not found: user id is negative number", () => {
    dbUserServices.getUser(-1).then((isUser) => {
      expect(isUser).toBeFalsy();
    });
  });
  test("error: user not found: user id is string", async () => {
    expect(await dbUserServices.getUser("something string")).toBeFalsy();
  });
  test("error: user not found: user with current id didn't create", async () => {
    expect(await dbUserServices.getUser(10000)).toBeFalsy();
  });
});

describe("test updateUser method", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  afterAll(async () => {
    await deleteTestUser(userId);
  });
  test("success: find created user", async () => {
    expect(
      await dbUserServices.updateUser(userId, testUserUpdatedValue)
    ).toBeTruthy();
    const userData = await dbUserServices.getUser(userId);
    Object.entries(testUserUpdatedValue).forEach(([key, value]) => {
      expect(value).toEqual(userData[key]);
    });
  });
  test("error: info for updating user is empty oject", async () => {
    expect(await dbUserServices.updateUser(userId, {})).toBeFalsy();
  });
  test("error: incorrect key in data about user", async () => {
    const userIsUpdated = await dbUserServices.updateUser(
      userId,
      testUserUpdatedIncorrectValue
    );
    expect(userIsUpdated).toBeFalsy();
    const userData = await dbUserServices.getUser(userId);
    expect(Object.keys(testUserUpdatedIncorrectValue)).not.toEqual(
      Object.keys(userData)
    );
  });
});

describe("test deleteUser method", () => {
  beforeAll(async () => {
    userId = await createTestUser(testUserValue);
  });
  test("success: user deleted successful", async () => {
    const userIsDeleted = await dbUserServices.deleteUser(userId);
    expect(userIsDeleted).toBeTruthy();
  });
  test("error: user id is negative number", async () => {
    const userIsDeleted = await dbUserServices.deleteUser(-1);
    expect(userIsDeleted).toBeFalsy();
  });
  test("error: user id is string", async () => {
    const userIsDeleted = await dbUserServices.deleteUser("something string");
    expect(userIsDeleted).toBeFalsy();
  });
  test("error: user with current id didn't create", async () => {
    const userIsDeleted = await dbUserServices.deleteUser(2000);
    expect(userIsDeleted).toBeFalsy();
  });
});