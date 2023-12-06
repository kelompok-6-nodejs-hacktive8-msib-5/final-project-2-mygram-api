import supertest from "supertest";
import { web } from "../../index.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../../utils/user-util.js";
import {
  createSocialMedia,
  removeSocialMedia,
} from "../../utils/social-media-utils.js";

describe("PUT /socialmedias", () => {
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
    await removeSocialMedia();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).put("/socialmedias").send({
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
      .put("/socialmedias/1")
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

  it("should social media url cannot be empty", async () => {
    const result = await supertest(web)
      .put("/socialmedias/1")
      .send({
        name: "user 3 social media",
        social_media_url: "",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("social_media_url cannot be empty");
  });

  it("should social media url not valid", async () => {
    const result = await supertest(web)
      .put("/socialmedias/1")
      .send({
        name: "user 3 social media",
        social_media_url: "httpswwwinstagramcomuser3",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Enter valid social_media_url");
  });

  it("should social media not found", async () => {
    const result = await supertest(web)
      .put("/socialmedias/0")
      .send({
        name: "user 3 social media",
        social_media_url: "https://www.instagram.com/user3",
      })
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Social media not found");
  });

  it("should success update social media", async () => {
    const result = await supertest(web)
      .put("/socialmedias/1")
      .send({
        name: "user 3 social media",
        social_media_url: "https://www.instagram.com/user3",
      })
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body.social_media.id).toBeDefined();
    expect(result.body.social_media.name).toBe("user 3 social media");
    expect(result.body.social_media.social_media_url).toBe(
      "https://www.instagram.com/user3"
    );
    expect(result.body.social_media.createdAt).toBeDefined();
    expect(result.body.social_media.updatedAt).toBeDefined();
    expect(result.body.social_media.UserId).toBeDefined();
  });
});
