let server;
let request = require("supertest");
const { Genre } = require("../../models/genre");

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    server.close();
 
  });

  describe("GET /", () => {
    it("should return all genres", async () => {

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
    });
  });
});
