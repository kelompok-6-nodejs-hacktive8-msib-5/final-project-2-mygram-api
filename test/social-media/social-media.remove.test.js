import supertest from "supertest";
import { web } from "../../index.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../../utils/user-util.js";
import { createSocialMedia } from "../../utils/social-media-utils.js";

describe("DELETE /socialmedias", () => {
  let token;

  beforeAll(async () => {
    await createTestUserUpdate();
    await createSocialMedia();

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
    const result = await supertest(web).delete("/socialmedias");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should social media not found", async () => {
    const result = await supertest(web)
      .delete("/socialmedias/0")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Social media not found");
  });

  it("should success remove social media", async () => {
    const result = await supertest(web)
      .delete("/socialmedias/1")
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe(
      "Your social media has been successfully deleted"
    );
  });

  it("should failed delete because recently deleted which is social media not found", async () => {
    const result = await supertest(web)
      .delete("/socialmedias/1")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Social media not found");
  });
});
