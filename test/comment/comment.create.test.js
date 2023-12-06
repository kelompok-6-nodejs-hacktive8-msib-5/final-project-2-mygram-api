import supertest from "supertest";
import { web } from "../../index.js";
import {
  createUserCommentCreate,
  createPhotoForCommentCreate,
  removeUserCommentCreate,
  removePhotoForCommentCreate,
  removeCommentCreate,
} from "../../utils/comment-utils.js";

describe("POST /comments", () => {
  let token;

  beforeAll(async () => {
    await createUserCommentCreate();
    await createPhotoForCommentCreate();

    const result = await supertest(web).post("/users/login").send({
      email: "jhon5@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeUserCommentCreate();
    await removePhotoForCommentCreate();
    await removeCommentCreate();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).post("/comments").send({
      comment: "comment from jhon 5",
      PhotoId: "999999993",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should comment cannot be empty", async () => {
    const result = await supertest(web)
      .post("/comments")
      .send({
        comment: "",
        PhotoId: "999999993",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("comment cannot be empty");
  });

  it("should photo id cannot be empty", async () => {
    const result = await supertest(web)
      .post("/comments")
      .send({
        comment: "comment form jhon 5",
        PhotoId: "",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("PhotoId cannot be empty");
  });

  it("should photo id not found", async () => {
    const result = await supertest(web)
      .post("/comments")
      .send({
        comment: "comment from jhon 5",
        PhotoId: "12345",
      })
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Photo not found");
  });

  it("should success comment", async () => {
    const result = await supertest(web)
      .post("/comments")
      .send({
        comment: "comment from jhon 5",
        PhotoId: "999999993",
      })
      .set("token", token);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("comment");
    expect(result.body.comment.id).toBeDefined();
    expect(result.body.comment.comment).toBe("comment from jhon 5");
    expect(result.body.comment.UserId).toBeDefined();
    expect(result.body.comment.PhotoId).toBe(999999993);
    expect(result.body.comment.createdAt).toBeDefined();
    expect(result.body.comment.updatedAt).toBeDefined();
  });
});
