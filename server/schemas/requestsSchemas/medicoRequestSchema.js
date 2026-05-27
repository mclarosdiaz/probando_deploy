import { z } from "zod";

export const consultarDisponibilidadSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        servicio: z.string().min(5),
        idServicio: z.string()
    })
})

export const modificarDisponibilidadSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.array(
        z.object({
            diaSemana: z.string().min(5), // duda, porque es un enum
            horaDesde: z.string().min(4),
            horaHasta: z.string().min(4)
        })
    ).nonempty("La lista no puede estar vacía")
})

