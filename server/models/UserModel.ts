import { Request } from "express";

export type UserRequestModel = Request & {
  user?: any;
};
