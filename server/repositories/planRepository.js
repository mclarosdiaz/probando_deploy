import { Plan }from "../domain/plan.js"
import {
    BadRequestError,
    PacienteNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import {PlanModel} from "../schemas/DBSchemas/planSchema.js"

export class MongoPlanRepository{
    constructor(){
        this.model=PlanModel
    }

    async save(plan){
        const nuevoPlan=new this.model(plan)
        return await nuevoPlan.save
    }

    async findById(id){
        return await this.model.findById(id)
    }
}
