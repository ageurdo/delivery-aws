import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;

}
export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Receber username, password,

        // Verificar se username cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username: username
            }
        })

        if (!client) {
            throw new Error("Username or password invalid!");
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid!");
        }
        // Gerar o token

        const token = sign({ username }, "eb4afb400cc5ec8e721334e3e0e511c0", {
            subject: client.id,
            expiresIn: "1d",
        });

        return token
    }


}
