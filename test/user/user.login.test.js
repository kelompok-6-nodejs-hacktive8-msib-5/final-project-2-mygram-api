import supertest from "supertest";
import { web } from "../../index.js";
import {
  removeTestUserLogin,
  createTestUserLogin,
} from "../../utils/user-util.js";

describe("POST /users/login", () => {
  beforeAll(async () => {
    await createTestUserLogin();
  });

  afterAll(async () => {
    await removeTestUserLogin();
  });

  it("should email not valid", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "usermailcom",
      password: "tes123123",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("email not valid");
  });

  it("should password cannot empty", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "userlogin@gmail.com",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("password cannot be empty");
  });

  it("should wrong email", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "userlog@gmail.com",
      password: "tes123123",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or password wrong");
  });

  it("should wrong password", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "userlogin@gmail.com",
      password: "salah",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or password wrong");
  });

  it("should success login", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "userlogin@gmail.com",
      password: "tes123123",
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
    expect(result.body.token).toBeDefined();
  });
});
