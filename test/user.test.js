import supertest from "supertest";
import { web } from "../index.js";
import { removeTestUser } from "./test-util.js";

describe("POST /users/register", () => {
  let token;

  afterAll(async () => {
    await removeTestUser();
  });

  //users/register
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

  it("should full_name required", async () => {
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

  it("should profile_image_url not valid", async () => {
    const result = await supertest(web).post("/users/register").send({
      email: "rohendo@gmail.com",
      full_name: "rohendo j",
      username: "rohendo",
      password: "tes123123",
      profile_image_url: "httpsexample.comdefault-profile-imagejpg",
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

  it("shoud success register", async () => {
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

  //users/login
  it("should email not valid", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendmailcom",
      password: "tes123123",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("email not valid");
  });

  it("should password cannot empty", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo@gmail.com",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("password cannot be empty");
  });

  it("should wrong email", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo2@gmail.com",
      password: "tes123123",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or password wrong");
  });

  it("should wrong password", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo2@gmail.com",
      password: "tes",
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Email or password wrong");
  });

  it("should success login", async () => {
    const result = await supertest(web).post("/users/login").send({
      email: "rohendo@gmail.com",
      password: "tes123123",
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
    expect(result.body.token).toBeDefined();

    token = result.body.token;
  });
});
