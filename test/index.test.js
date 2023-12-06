import supertest from "supertest";
import { web } from "../index.js";

describe("GET /", () => {
  it("should success", async () => {
    const result = await supertest(web).get("/");

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Hello from MyGram API");
  });
});
