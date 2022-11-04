import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;

}
export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // Receber username, password,

        // Verificar se username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username: username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password invalid!");
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid!");
        }
        // Gerar o token

        const token = sign({ username }, "ee3dcf9cc72f9f81d28958bde3d1458b", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });

        return token
    }


}
