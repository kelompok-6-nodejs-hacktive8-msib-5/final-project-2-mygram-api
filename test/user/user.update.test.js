import supertest from "supertest";
import { web } from "../../index.js";
import {
  createTestUserForEdit,
  removeTestUserForEdit,
} from "../test-utils/test-util.js";

describe("POST /users/register", () => {
  let token;

  beforeAll(async () => {
    await createTestUserForEdit();

    const result = await supertest(web).post("/users/login").send({
      email: "rohendo2@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  afterAll(async () => {
    await removeTestUserForEdit();
  });

  it("should have header token", async () => {
    const result = await supertest(web).put("/users/2").send({
      email: "rohendo2@gmailcom",
      full_name: "Rohendo Junaedin",
      username: "rohendo",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should not allowed user edit", async () => {
    const result = await supertest(web).put("/users/10").send({
      email: "rohendo2@gmailcom",
      full_name: "Rohendo Junaedin",
      username: "rohendo",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should email not valid", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendogmailcom",
        full_name: "Rohendo Junaedin",
        username: "rohendo",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218155,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("email not valid");
  });

  it("should full_name required", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendo@gmail.com",
        full_name: "",
        username: "rohendo",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218155,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("full name must be at least 3 characters");
  });

  it("should username required", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendo@gmail.com",
        full_name: "rohendo j",
        username: "",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: 6281568218155,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("username at least 1 character long");
  });

  it("should profile_image_url not valid", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendo@gmail.com",
        full_name: "rohendo j",
        username: "rohendo",
        profile_image_url: "httpexample.comdefault-profile-imagejpg",
        age: 20,
        phone_number: 6281568218155,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter valid profile_image_url");
  });

  it("should age type data number", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendo@gmail.com",
        full_name: "rohendo j",
        username: "rohendo",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: "20",
        phone_number: 6281568218155,
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("age must be number");
  });

  it("should phone_number type data number", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendo@gmail.com",
        full_name: "rohendo j",
        username: "rohendo",
        profile_image_url: "https://example.com/default-profile-image.jpg",
        age: 20,
        phone_number: "6281568218155",
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter valid phone_number");
  });

  it("should success edit user", async () => {
    const result = await supertest(web)
      .put("/users/2")
      .set("token", token)
      .send({
        email: "rohendo2edit@gmail.com",
        full_name: "rohendo j edit",
        username: "rohendo edit",
        profile_image_url: "https://example.com/default-profile-image-edit.jpg",
        age: 20,
        phone_number: 6281568218157,
      });

    expect(result.status).toBe(200);
    expect(result.body.user.email).toBe("rohendo2edit@gmail.com");
    expect(result.body.user.full_name).toBe("rohendo j edit");
    expect(result.body.user.username).toBe("rohendo edit");
    expect(result.body.user.profile_image_url).toBe(
      "https://example.com/default-profile-image-edit.jpg"
    );
    expect(result.body.user.age).toBe(20);
    expect(result.body.user.phone_number).toBe(6281568218157);
  });
});
