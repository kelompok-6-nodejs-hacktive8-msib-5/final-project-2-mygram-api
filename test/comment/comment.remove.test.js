import supertest from "supertest";
import { web } from "../../index.js";
import {
  createCommentRemove,
  createPhotoForCommentRemove,
  createUserCommentRemove,
  removePhotoForCommentRemove,
  removeUserCommentRemove,
} from "../../utils/comment-utils.js";

describe("DELETE /comments", () => {
  let token;

  beforeAll(async () => {
    await createUserCommentRemove();
    await createPhotoForCommentRemove();
    await createCommentRemove();

    const result = await supertest(web).post("/users/login").send({
      email: "jhon8@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeUserCommentRemove();
    await removePhotoForCommentRemove();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).delete("/comments");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should no have param", async () => {
    const result = await supertest(web).delete("/comments").set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter comment Id in param");
  });

  it("should comment not found", async () => {
    const result = await supertest(web)
      .delete("/comments/123123")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Comment not found");
  });

  it("should success remove comment", async () => {
    const result = await supertest(web)
      .delete("/comments/999999998")
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe(
      "Your comment has been successfully deleted"
    );
  });

  it("should failed delete because recently deleted which is comment not found", async () => {
    const result = await supertest(web)
      .delete("/comments/999999998")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Comment not found");
  });
});
