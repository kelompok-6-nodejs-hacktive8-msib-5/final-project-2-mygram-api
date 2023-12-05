import supertest from "supertest";
import { web } from "../../index.js";
import {
  createUserPhotoCreate,
  removePhotoCreate,
  removeTestUserPhotoCreate,
} from "../../utils/photo-utils.js";

describe("POST /photos", () => {
  let token;

  beforeAll(async () => {
    await createUserPhotoCreate();

    const result = await supertest(web).post("/users/login").send({
      email: "jhon@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeTestUserPhotoCreate();
    await removePhotoCreate();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).post("/photos").send({
      poster_image_url:
        "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "sky3",
      caption: "gambar sky",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should poster image url cannot be empty", async () => {
    const result = await supertest(web)
      .post("/photos")
      .send({
        poster_image_url: "",
        title: "sky3",
        caption: "gambar sky",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe(
      "profile_image_url must be at least 3 characters"
    );
  });

  it("should poster image url valid", async () => {
    const result = await supertest(web)
      .post("/photos")
      .send({
        poster_image_url: "httpphotocom",
        title: "sky3",
        caption: "gambar sky",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter valid poster_image_url");
  });

  it("should title cannot be empty", async () => {
    const result = await supertest(web)
      .post("/photos")
      .send({
        poster_image_url:
          "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "",
        caption: "gambar sky",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("title cannot be empty");
  });

  it("should caption cannot be empty", async () => {
    const result = await supertest(web)
      .post("/photos")
      .send({
        poster_image_url:
          "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "sky",
        caption: "",
      })
      .set("token", token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("caption cannot be empty");
  });

  it("should success create photo", async () => {
    const result = await supertest(web)
      .post("/photos")
      .send({
        poster_image_url:
          "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "image 1",
        caption: "image 1 caption",
      })
      .set("token", token);

    expect(result.status).toBe(201);
    expect(result.body.id).toBeDefined();
    expect(result.body.poster_image_url).toBe(
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    expect(result.body.title).toBe("image 1");
    expect(result.body.caption).toBe("image 1 caption");
    expect(result.body.UserId).toBeDefined();
  });
});
