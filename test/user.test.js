import supertest from "supertest";
import { web } from "../index.js";
import { removeTestUser } from "./test-util.js";

describe("POST /users/register", () => {
  let email;
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

    email = result.body.User.email;
  });

  afterEach(async () => {
    await removeTestUser(email);
  });
});
