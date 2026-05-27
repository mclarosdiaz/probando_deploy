import {z} from "zod"
import { BadRequestError } from "../errors/appError.js"

export const validate = (schema) => (req, res, next) =>{
    try{
        const result = schema.parse({
            body: req.body, 
            params: req.params,
            query: req.query
        })

        if (result.body)
            req.body = result.body

        if (result.params)
            req.params = result.params
        next()
    }catch(error){
        console.log(error)
        next(new BadRequestError("Request mal formada"))
    }
}

export const validateQuery = (schema) => validate(z.object({ query: schema }))