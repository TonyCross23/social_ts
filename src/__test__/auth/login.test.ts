import supertest from "supertest";
import * as AuthService from "../../services/auth.service";
import app from "../../app";


const loginInput = {
  email: "test@example.com",
  password: "12345678",
};

describe("/api/v1/login", () => {
   afterEach(() => {
        jest.restoreAllMocks()
   })

   describe("when credentials are valid", () => {
    it("should return 200 and set token in cookies",async () => {
       const accessToken = "fake-access-token";
       const refreshToken = "fake-refresh-token";

       const loginServiceMock = jest.spyOn(AuthService.AuthService, "login").mockResolvedValue({accessToken,refreshToken})

        const response = await supertest(app).post("/api/v1/login").send(loginInput)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ message: "Login successful" });

        const cookies = response.headers["set-cookie"] || [];
        expect(cookies).toBeDefined()
        const cookieList = Array.isArray(cookies) ? cookies : [cookies];

        expect(cookieList.some((cookie: string) => cookie.includes("accessToken"))).toBe(true);
        expect(cookieList.some((cookie: string) => cookie.includes("refreshToken"))).toBe(true);

        expect(loginServiceMock).toHaveBeenCalledWith(loginInput);
    })
   })

   describe("when eamil is wrong", () => {
    it("should return 401 with error message",async () => {
        const loginServiceMock = jest
            .spyOn(AuthService.AuthService, "login")
            .mockRejectedValue(new Error("Invalid credentials"))
        
        const response = await supertest(app)
            .post("/api/v1/login")
            .send({...loginInput, email: "wrong@example.com"})

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({message: "Invalid credentials"})

        expect(loginServiceMock).toHaveBeenCalledWith({
            email: "wrong@example.com",
            password: loginInput.password,
        })
     })
   })

   describe("when password is wrong", () => {
    it("should return 401 with error message", async () => {
        const loginServiceMock = jest
            .spyOn(AuthService.AuthService, "login")
            .mockRejectedValue(new Error("Invalid credentials"))

        const response = await supertest(app)
            .post("/api/v1/login")
            .send({...loginInput, password: "wrongpassword"})
        
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({message: "Invalid credentials"})

        expect(loginServiceMock).toHaveBeenCalledWith({
            email: loginInput.email,
            password: "wrongpassword"
        })
    })
   })
})