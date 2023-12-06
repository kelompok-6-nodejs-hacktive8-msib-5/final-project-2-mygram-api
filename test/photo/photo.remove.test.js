import supertest from "supertest";
import { web } from "../../index.js";
import {
  createPhotoRemove,
  createUserPhotoRemove,
  removeTestUserPhotoRemove,
} from "../../utils/photo-utils.js";

describe("DELETE /photos", () => {
  let token;

  beforeAll(async () => {
    await createUserPhotoRemove();
    await createPhotoRemove();

    const result = await supertest(web).post("/users/login").send({
      email: "jhon4@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeTestUserPhotoRemove();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).delete("/photos");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should photo not found", async () => {
    const result = await supertest(web)
      .delete("/photos/1000000000")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Photo not found");
  });

  it("should success remove photo", async () => {
    const result = await supertest(web)
      .delete("/photos/999999992")
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe(
      "Your photo has been successfully deleted"
    );
  });

  it("should failed delete because recently deleted which is photo not found", async () => {
    const result = await supertest(web)
      .delete("/photos/999999992")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Photo not found");
  });
});
