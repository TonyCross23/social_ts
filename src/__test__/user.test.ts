import supertest from "supertest";
import * as AuthService  from "../services/auth.service"
import app from "../app";


const userInput = {
  name: "Test User",
  email: "test@example.com",
  password: "12345678",
  passwordConfirmation: "12345678",
};

const userPayload = {
  id: "random-id",
  name: "Test User",
  email: "test@example.com",
  image: null,
  bio: null,
  age: null,
  address: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('/api/v1/register', () => {
  describe("when user data is valid", () => {
    it("should return user payload", async () => {
        const createUserServiceMock = jest
            .spyOn(AuthService.AuthService, "register")
            //@ts-ignore
            .mockResolvedValue(userPayload)

        const {statusCode, body} = await supertest(app)
            .post("/api/v1/register")
            .send(userInput)

        expect(statusCode).toBe(200)
        expect(body).toEqual(userPayload)
        expect(createUserServiceMock).toHaveBeenCalledWith({
            name: userInput.name,
            email: userInput.email,
            password: userInput.password
        })
    })
  })
})
