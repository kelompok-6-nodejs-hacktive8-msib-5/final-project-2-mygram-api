import supertest from "supertest";
import { web } from "../../index.js";
import { createPhoto } from "../../utils/photo-utils.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../../utils/user-util.js";

describe("DELETE /photos", () => {
  let token;

  beforeAll(async () => {
    await createTestUserUpdate();
    await createPhoto();

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
    const result = await supertest(web).delete("/photos");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should photo not found", async () => {
    const result = await supertest(web).delete("/photos/0").set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Photo not found");
  });

  it("should success remove photo", async () => {
    const result = await supertest(web).delete("/photos/1").set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe(
      "Your photo has been successfully deleted"
    );
  });

  it("should failed delete because recently deleted which is photo not found", async () => {
    const result = await supertest(web).delete("/photos/1").set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Photo not found");
  });
});
