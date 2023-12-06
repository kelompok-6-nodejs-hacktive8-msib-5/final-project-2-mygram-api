import supertest from "supertest";
import { web } from "../../index.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../../utils/user-util.js";

describe("POST /socialmedias", () => {
  let token;

  beforeAll(async () => {
    await createTestUserUpdate();

    const result = await supertest(web).post("/users/login").send({
      email: "user3@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeTestUserUpdate();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).post("/socialmedias").send({
      name: "user 3 social media",
      social_media_url: "https://www.instagram.com/user3",
    });

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should name cannot be empty", async () => {
    const result = await supertest(web)
      .post("/socialmedias")
      .send({
        name: "",
        social_media_url: "https://www.instagram.com/user3",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("name cannot be empty");
  });
});
