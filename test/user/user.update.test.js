import supertest from "supertest";
import { web } from "../../index.js";
import {
  createTestUserUpdate,
  removeTestUserUpdate,
} from "../test-util/test-util.js";

describe("PUT /users/", () => {
  let token;

  beforeAll(async () => {
    await createTestUserUpdate();

    const result = await supertest(web).post("/users/login").send({
      email: "userupdate@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeTestUserUpdate();
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).put("/users/2").send({
      email: "userupdate@gmailcom",
      full_name: "user update",
      username: "userforupdate",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218156,
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should not allowed user edit", async () => {
    const result = await supertest(web).put("/users/10").send({
      email: "userupdate@gmailcom",
      full_name: "user update",
      username: "userupdate",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218156,
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should email not valid", async () => {
    const result = await supertest(web)
      .put("/users/1")
      .set("token", token)
      .send({
        email: "userupdatecom",
        full_name: "user update edit",
        username: "userupdate",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218156,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("email not valid");
  });

  it("should full_name cannot be empty", async () => {
    const result = await supertest(web)
      .put("/users/1")
      .set("token", token)
      .send({
        email: "userudpate@gmail.com",
        full_name: "",
        username: "userupdate",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218156,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("full name must be at least 3 characters");
  });

  it("should username cannot be empty", async () => {
    const result = await supertest(web)
      .put("/users/1")
      .set("token", token)
      .send({
        email: "userupdate@gmail.com",
        full_name: "user update",
        username: "",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218156,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("username at least 1 character long");
  });

  it("should profile_image_url not valid", async () => {
    const result = await supertest(web)
      .put("/users/1")
      .set("token", token)
      .send({
        email: "userupdate@gmail.com",
        full_name: "userupdate",
        username: "userupdate",
        profile_image_url: "httpexample.comdefault-profile-imagejpg",
        age: 20,
        phone_number: 6281568218156,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter valid profile_image_url");
  });

  it("should age type data number", async () => {
    const result = await supertest(web)
      .put("/users/1")
      .set("token", token)
      .send({
        email: "userupdate@gmail.com",
        full_name: "userupdate",
        username: "userupdate",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: "20",
        phone_number: 6281568218156,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("age must be number");
  });

  it("should phone_number type data number", async () => {
    const result = await supertest(web)
      .put("/users/1")
      .set("token", token)
      .send({
        email: "userupdate@gmail.com",
        full_name: "userupdate",
        username: "userupdate",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: "6281568218156",
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter valid phone_number");
  });

  it("should success edit user", async () => {
    const result = await supertest(web)
      .put("/users/999999998")
      .set("token", token)
      .send({
        email: "userupdate@gmail.com",
        full_name: "userupdateedit",
        username: "userupdate",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218156,
      });

    expect(result.status).toBe(200);
    expect(result.body.user.email).toBe("userupdate@gmail.com");
    expect(result.body.user.full_name).toBe("userupdateedit");
    expect(result.body.user.username).toBe("userupdate");
    expect(result.body.user.profile_image_url).toBe(
      "https://example.com/default-profile-image.jpg"
    );
    expect(result.body.user.age).toBe(20);
    expect(result.body.user.phone_number).toBe(6281568218156);
  });
});
