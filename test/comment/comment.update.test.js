import supertest from "supertest";
import { web } from "../../index.js";
import { createComment, removeComment } from "../../utils/comment-utils.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../../utils/user-util.js";
import { createPhoto, removePhoto } from "../../utils/photo-utils.js";

describe("PUT /comments", () => {
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
    const result = await supertest(web).put("/comments");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should no have comment param", async () => {
    const result = await supertest(web).put("/comments").set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Enter comment Id in param");
  });

  it("should comment not found", async () => {
    const result = await supertest(web)
      .put("/comments/123123")
      .send({
        comment: "comment from user3",
      })
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("Comment not found");
  });

  it("should comment cannot be empty", async () => {
    const result = await supertest(web)
      .put("/comments/1")
      .send({
        comment: "",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("comment cannot be empty");
  });

  it("should success update comment", async () => {
    const result = await supertest(web)
      .put("/comments/1")
      .send({
        comment: "comment from user3",
      })
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("comment");
    expect(result.body.comment.id).toBeDefined();
    expect(result.body.comment.comment).toBe("comment from user3");
    expect(result.body.comment.createdAt).toBeDefined();
    expect(result.body.comment.updatedAt).toBeDefined();
    expect(result.body.comment.UserId).toBeDefined();
    expect(result.body.comment.PhotoId).toBeDefined();
  });
});
