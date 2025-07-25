import { Request } from "express";

export type ExtendedRequest = Request & {
  userid?: number | string;
}