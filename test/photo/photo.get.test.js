import supertest from "supertest";
import { web } from "../../index.js";
import { removePhoto } from "../../utils/photo-utils.js";
import {
  createTestUserLogin,
  removeTestUserLogin,
} from "../../utils/user-util.js";

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
      .post("/photos")
      .send({
        poster_image_url:
          "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "image 1",
        caption: "image 1 caption",
      })
      .set("token", token);
  });

  afterAll(async () => {
    await removeTestUserLogin();
    await removePhoto();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).get("/photos");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should success get photo", async () => {
    const result = await supertest(web).get("/photos").set("token", token);

    expect(result.status).toBe(200);
    expect(result.body.photos[0].id).toBeDefined();
    expect(result.body.photos[0].title).toBe("image 1");
    expect(result.body.photos[0].caption).toBe("image 1 caption");
    expect(result.body.photos[0].poster_image_url).toBe(
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    expect(result.body.photos[0].createdAt).toBeDefined();
    expect(result.body.photos[0].updatedAt).toBeDefined();
    expect(result.body.photos[0]).toHaveProperty("Comments");
    expect(result.body.photos[0].User.id).toBeDefined();
    expect(result.body.photos[0].User.username).toBeDefined();
    expect(result.body.photos[0].User.profile_image_url).toBeDefined();
  });
});
