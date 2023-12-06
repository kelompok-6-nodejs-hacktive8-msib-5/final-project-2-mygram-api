import supertest from "supertest";
import { web } from "../../index.js";
import { createComment, removeComment } from "../../utils/comment-utils.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../../utils/user-util.js";
import { createPhoto, removePhoto } from "../../utils/photo-utils.js";

describe("GET /comments", () => {
  let token;

  beforeAll(async () => {
    await createTestUserUpdate();
    await createPhoto();
    await createComment();

    const result = await supertest(web).post("/users/login").send({
      email: "user3@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeTestUserUpdate();
    await removePhoto();
    await removeComment();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).get("/comments");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should success get comment", async () => {
    const result = await supertest(web).get("/comments").set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("comment");
    expect(result.body.comment[0].id).toBeDefined();
    expect(result.body.comment[0].comment).toBe("comment from user3");
    expect(result.body.comment[0].createdAt).toBeDefined();
    expect(result.body.comment[0].updatedAt).toBeDefined();
    expect(result.body.comment[0].UserId).toBeDefined();
    expect(result.body.comment[0].Photo.id).toBeDefined();
    expect(result.body.comment[0].Photo.title).toBe("image 1");
    expect(result.body.comment[0].Photo.caption).toBe("image 1 caption");
    expect(result.body.comment[0].Photo.poster_image_url).toBe(
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    expect(result.body.comment[0].User.id).toBeDefined();
    expect(result.body.comment[0].User.username).toBe("user3");
    expect(result.body.comment[0].User.profile_image_url).toBe(
      "https://example.com/default-profile-image.jpg"
    );
    expect(result.body.comment[0].User.phone_number).toBeDefined();
  });
});
