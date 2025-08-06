import { NextFunction, Request, Response } from "express";

const ApiResponse = (_: any, __: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = await originalMethod.apply(this, [req, res, next]);
    if (res.headersSent) return;
    const { message = "Success", data = null, status = true } = result || {};
    return res.status(200).json({
      status,
      message,
      data,
    });
  };

  return descriptor;
};

export default ApiResponse;
