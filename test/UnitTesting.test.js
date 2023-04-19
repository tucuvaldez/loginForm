import UserDAO from "../src/dao/mongo/UserDAO.js";
import mongoose from "mongoose";

import { strict as assert } from "assert";

mongoose.connect(
  "mongodb+srv://admin:1234@login.atwudct.mongodb.net/testingMasivo?retryWrites=true&w=majority"
);

const userService = new UserDAO();

describe("Test general del DAO de usuarios", () => {
  it("El DAO debe obtener a los usuarios en formato Array", async function () {
    const result = await userService.getUsers();
    assert.ok(result);
    assert.strictEqual(Array.isArray(result), true);
  });
  describe("Prueba de escritura", () => {
    before(async function () {
      await userService.drop();
    });
    it("El DAO debe insertar un Usuario correctamente", async function () {
      const mockUser = {
        firstName: "Test User",
        lastName: "User",
        email: "user@user.com",
        password: "123",
        phone: "23455",
        age: "23",
        address: "casuUser",
      };
      const result = await userService.createUser(mockUser);
      assert.ok(result._id);
    });
  });
});
