const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../src/app");
const Book = require("../src/models/book.model");

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI + "_test_books");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Book.deleteMany({});
});

describe("Book controller", () => {
  test("READ books (*) - returns only names with pagination", async () => {
    await Book.create({ title: "Libro A", genre: "fantasia" });
    await Book.create({ title: "Libro B", genre: "terror" });

    const res = await request(app).get("/api/books?limit=1&page=1");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books.length).toBe(1);
    expect(typeof res.body.books[0]).toBe("string");
    expect(res.body).toHaveProperty("pagination");
  });

  test("READ books (*) - with filter genre", async () => {
    await Book.create({ title: "Libro A", genre: "fantasia" });
    await Book.create({ title: "Libro B", genre: "terror" });

    const res = await request(app).get("/api/books?genre=fantasia");

    expect(res.statusCode).toBe(200);
    expect(res.body.books).toContain("Libro A");
    expect(res.body.books).not.toContain("Libro B");
  });
});
