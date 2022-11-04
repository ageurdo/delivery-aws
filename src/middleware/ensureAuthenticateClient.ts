import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string,
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing"
        });
    }

    // Bearer 9419498494944
    //[0] - Bearer
    //[1] - 9419498494944

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "eb4afb400cc5ec8e721334e3e0e511c0") as IPayLoad;

        request.id_client = sub;

        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Invalid token!",
        });
    }
}