import {PlanModel} from "../schemas/DBSchemas/planSchema.js"
import { planMapper } from "../middlewares/mappers/planMapper.js"

export class MongoPlanRepository{
  
    constructor(){
        this.model=PlanModel
    }

    async save(plan){
        const nuevoPlan=new this.model(plan)
        const mongoPlanGuardado = await nuevoPlan.save()

        return planMapper.mongoPlanToDomain(mongoPlanGuardado)
    }

    async findById(id){
        const mongoPlan =  await this.model.findById(id)
        return planMapper.mongoPlanToDomain(mongoPlan)
    }
}
