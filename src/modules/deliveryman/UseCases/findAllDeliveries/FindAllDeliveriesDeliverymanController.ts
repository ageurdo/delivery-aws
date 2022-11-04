import { Request, Response } from "express";
import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";

export class FindAllDeliveriesDeliverymanController {
    async handle(request: Request, response: Response) {

        const { id_deliveryman } = request.body;

        const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase();
        const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(id_deliveryman);

        return response.json(deliveries);
    }
}