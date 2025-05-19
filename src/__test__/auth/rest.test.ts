import supertest from "supertest";
import * as AuthService from "../../services/auth.service";
import app from "../../app";

describe("/api/v1/rest", () => {
  it("should reset password when valid token and new password provided", async () => {
    const resetPasswordSpy = jest
      .spyOn(AuthService.AuthService, "resetPassword")
      .mockResolvedValue({ message: "Password reset successful" });

    const { statusCode, body } = await supertest(app)
      .post("/api/v1/reset")
      .send({ token: "faketoken", newPassword: "fakePassword" });

    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: "Password reset successful" });
    expect(resetPasswordSpy).toHaveBeenCalledWith("faketoken", "fakePassword");
  });

  it("should return 400 when token is missing", async () => {
    const { statusCode, body } = await supertest(app)
      .post("/api/v1/reset")
      .send({ newPassword: "newpassword123" });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty("errors");
  });
});
