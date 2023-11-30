import supertest from "supertest";
import { web } from "../../index.js";
import { removeTestUser, createTestUser } from "../test-utils/test-util.js";

describe("POST /users/register", () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it("should email not valid", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendmailcom",
      password: "tes123123",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("email not valid");
  });

  it("should password cannot empty", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo@gmail.com",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("password cannot be empty");
  });

  it("should wrong email", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo2@gmail.com",
      password: "tes123123",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or password wrong");
  });

  it("should wrong password", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo@gmail.com",
      password: "tes",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or password wrong");
  });

  it("should success login", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo@gmail.com",
      password: "tes123123",
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
    expect(result.body.token).toBeDefined();
  });
});
