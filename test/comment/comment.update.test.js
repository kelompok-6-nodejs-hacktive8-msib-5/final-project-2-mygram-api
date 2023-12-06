import supertest from "supertest";
import { web } from "../../index.js";
import {
  createCommentUpdate,
  createPhotoForCommentUpdate,
  createUserCommentUpdate,
  removeCommentUpdate,
  removePhotoForCommentUpdate,
  removeUserCommentUpdate,
} from "../../utils/comment-utils.js";

describe("PUT /comments", () => {
  let token;

  beforeAll(async () => {
    await createUserCommentUpdate();
    await createPhotoForCommentUpdate();
    await createCommentUpdate();

    const result = await supertest(web).post("/users/login").send({
      email: "jhon7@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeUserCommentUpdate();
    await removePhotoForCommentUpdate();
    await removeCommentUpdate();
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
        comment: "comment from jhon 7",
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
      .put("/comments/123123")
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
      .put("/comments/999999999")
      .send({
        comment: "comment from jhon 7",
      })
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("comment");
    expect(result.body.comment.id).toBeDefined();
    expect(result.body.comment.comment).toBe("comment from jhon 7");
    expect(result.body.comment.createdAt).toBeDefined();
    expect(result.body.comment.updatedAt).toBeDefined();
    expect(result.body.comment.UserId).toBeDefined();
    expect(result.body.comment.PhotoId).toBeDefined();
  });
});
