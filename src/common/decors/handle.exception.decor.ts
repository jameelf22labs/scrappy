import { NextFunction, Request, Response } from "express";

const HandleException = (
  _target: any,
  _propertyKey: any,
  descriptor: PropertyDescriptor
) => {
  const handlerMethod = descriptor.value;
  descriptor.value = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await handlerMethod.call(this, request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export default HandleException;
