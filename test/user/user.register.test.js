import supertest from "supertest";
import { web } from "../../index.js";
import { removeTestUser } from "../test-util/test-util.js";

describe("POST /users/register", () => {
  afterAll(async () => {
    await removeTestUser();
  });

  it("should email not valid", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendogmailcom",
      full_name: "Rohendo Junaedin",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("email not valid");
  });

  it("should full_name cannot be empty", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("full name must be at least 3 characters");
  });

  it("should username cannot be empty", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("username at least 1 character long");
  });

  it("should password cannot be empty", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "rohendo",
      password: "",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("password at least 6 character long");
  });

  it("should profile image url cannot be empty", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe(
      "profile_image_url at least 1 character long"
    );
  });

  it("should profile_image_url not valid", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "httpexample.comdefault-profile-imagejpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Enter valid profile_image_url");
  });

  it("should age type data number", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: "20",
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("age must be number");
  });

  it("should phone_number type data number", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: "6281568218155",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("phone_number must be number");
  });

  it("should success register", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "Rohendo Junaedin",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(201);
    expect(result.body.User.email).toBe("rohendo@gmail.com");
    expect(result.body.User.full_name).toBe("Rohendo Junaedin");
    expect(result.body.User.profile_image_url).toBe(
      "https://example.com/default-profile-image.jpg"
    );
    expect(result.body.User.age).toBe(20);
    expect(result.body.User.phone_number).toBe(6281568218155);
  });

  it("should email registered", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "Rohendo Junaedin",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "https://example.com/default-profile-image.jpg",
      age: 20,
      phone_number: 6281568218155,
    });

    expect(result.status).toBe(409);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or Username already use");
  });
});
