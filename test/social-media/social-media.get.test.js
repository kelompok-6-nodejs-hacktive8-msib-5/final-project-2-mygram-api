import supertest from "supertest";
import { web } from "../../index.js";
import {
  createTestUserLogin,
  removeTestUserLogin,
} from "../../utils/user-util.js";
import { removeSocialMedia } from "../../utils/social-media-utils.js";

describe("GET /photos", () => {
  let token;

  beforeAll(async () => {
    await createTestUserLogin();

    const result = await supertest(web).post("/users/login").send({
      email: "user2@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;

    await supertest(web)
      .post("/socialmedias")
      .send({
        name: "user 3 social media",
        social_media_url: "https://www.instagram.com/user3",
      })
      .set("token", token);
  });

  afterAll(async () => {
    await removeTestUserLogin();
    await removeSocialMedia();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).get("/socialmedias");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should success get social media", async () => {
    const result = await supertest(web)
      .get("/socialmedias")
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body.social_media[0].id).toBeDefined();
    expect(result.body.social_media[0].name).toBe("user 3 social media");
    expect(result.body.social_media[0].social_media_url).toBe(
      "https://www.instagram.com/user3"
    );
    expect(result.body.social_media[0].createdAt).toBeDefined();
    expect(result.body.social_media[0].updatedAt).toBeDefined();
    expect(result.body.social_media[0].UserId).toBeDefined();
    expect(result.body.social_media[0].User.id).toBeDefined();
    expect(result.body.social_media[0].User.username).toBe("user2");
    expect(result.body.social_media[0].User.profile_image_url).toBeDefined();
  });
});
