import supertest from "supertest"
import * as AuthService from "../../services/auth.service"
import app from "../../app"

describe("api/v1/forgot", () => {
    it("should send reset email if eamil exists", async () => {
        const forgotPasswordSpy = jest
          .spyOn(AuthService.AuthService, "forgotPassword")
          .mockResolvedValue({message: "Rest email sent"})

        const {statusCode, body} = await supertest(app)
          .post("/api/v1/forgot")
          .send({email: "test@mail.com"})

        expect(statusCode).toBe(200)
        expect(body).toEqual({message: "Rest email sent"})
        expect(forgotPasswordSpy).toHaveBeenCalledWith("test@mail.com")
    })

    it("should return 404 if email not found", async () => {
        const forgotPasswordSpy = jest
          .spyOn(AuthService.AuthService, "forgotPassword")
          .mockRejectedValueOnce(new Error("Email not found"))

        const {statusCode, body} = await supertest(app)
          .post("/api/v1/forgot")
          .send({email: "test@mail.com"})
          
        expect(statusCode).toBe(404)
        expect(body).toHaveProperty("message", "Email not found")
        expect(forgotPasswordSpy).toHaveBeenCalledWith("test@mail.com")
    })
})