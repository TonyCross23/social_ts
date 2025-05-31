import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (shcema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = shcema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({ errors: result.error.errors });
        return;
      }

      next();
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        res.status(400).json({
          message: "Unexpected error occurred",
        });
      }
    }
  };
