import supertest from "supertest";
import { web } from "../../index.js";
import { createTestUserRemove } from "../../utils/user-util.js";

describe("DELETE /users/", () => {
  let token;

  beforeAll(async () => {
    await createTestUserRemove();

    const result = await supertest(web).post("/users/login").send({
      email: "userremove@gmail.com",
      password: "tes123123",
    });

    token = result.body.token;
  });

  it("should unauthorized", async () => {
    const result = await supertest(web).delete("/users/10");

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should not allowed user edit", async () => {
    const result = await supertest(web).delete("/users/10").set("token", token);

    expect(result.status).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe(
      "You do not have permission to update this user"
    );
  });

  it("should success delete", async () => {
    const result = await supertest(web)
      .delete("/users/999999999")
      .set("token", token);

    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toBe(
      "Your account has been successfully deleted"
    );
  });

  it("should failed delete because recently deleted which is user not found", async () => {
    const result = await supertest(web)
      .delete("/users/999999999")
      .set("token", token);

    expect(result.status).toBe(404);
    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("User not found");
  });
});
