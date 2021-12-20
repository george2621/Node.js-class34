import supertest from "supertest";
import app from "../app.js";
const request = supertest(app);


describe("POST /", () => {

  it("Quick test", () => {
    expect(1).toBe(1);
  });

  it("should respond with a 200 status code when the name of city is valid", async () => {
    const bodyData = { cityName: "enschede" };
    const response = await request.post("/weather").send(bodyData);
    expect(response.statusCode).toBe(200);
  });

  it("Return -404 status- for invalid city name", async () => {
    const bodyData = { cityName: "da" };
    const response = await request.post("/weather").send(bodyData);
    expect(response.statusCode).toBe(404);
  });

  it("should specify json in the content type header", async () => {
    const response = await request.post("/weather").send({})
    expect(response.header['content-type']).toEqual(expect.stringContaining("json"))
  })

});


