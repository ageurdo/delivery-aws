
import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateClient {
    username: string;
    password: string;
}
export class CreateClientUseCase {
    async execute({ password, username }: ICreateClient) {
        console.log(username, password)
        //Validar se o usuário existe
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username,
                }
            },
        });

        if (clientExist) {
            throw new Error("Client already exists")
        }

        // Criptagravar a senha
        const hashPassword = await hash(password, 10);

        // Salvar o cliente
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        });

        return client;
    }
}
