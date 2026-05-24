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

export const especialidadSchema = z.object({
    id: z.string(),
    nombre: z.string().min(1),
    duracionTurnoEnMins: z.number().int().positive(),
    costo: z.number().positive()
})

export const practicaSchema = z.object({
    id: z.string(),
    codigo: z.string().min(1),
    nombre: z.string().min(1),
    duracionTurnoEnMins: z.number().int().positive(),
    costo: z.number().positive()
})

export const agregarServicioSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.discriminatedUnion("tipo", [
        especialidadSchema.extend({
            tipo: z.literal("especialidad")
        }),
        practicaSchema.extend({
            tipo: z.literal("practica")
        })
    ])
})
export const eliminarServicioSchema = z.object({
    params: z.object({
        id: z.string(),
        servicioId: z.string()
    })
})

export const modificarServicioSchema = z.object({
    params: z.object({
        id: z.string(),
        servicioId: z.string()
    }),
    body: z.object({
        duracionTurnoEnMins: z.number().int().positive().optional(),
        costo: z.number().positive().optional()
    })
})
