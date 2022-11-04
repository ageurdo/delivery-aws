import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string,
}

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
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
        const { sub } = verify(token, "ee3dcf9cc72f9f81d28958bde3d1458b") as IPayLoad;

        request.id_deliveryman = sub;

        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Invalid token!",
        });
    }
}