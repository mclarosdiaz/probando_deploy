import { z } from "zod";

export const reservarTurnoSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        pacienteId: z.string()
    })
})

export const cancelarTurnoRequestSchema = z.object({
    params: z.object({
        id: z.string()
    }), 
    body: z.object({
        motivo: z.string(),
        idUsuario: z.string()
    })
})

export const obtenerHistorialTurnosSchema = z.object({
    query: z.object({
        pacienteId: z.string(),

        estado: z.enum(["RESERVADO", "CONFIRMADO", "CANCELADO", "REALIZADO"]).optional(),

        fechaDesde: z.string().datetime().optional()
            .transform((val) => val ? new Date(val) : undefined),

        fechaHasta: z.string().datetime().optional()
            .transform((val) => val ? new Date(val) : undefined),

        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(10)
    })
})

export const modificarEstadoTurnoSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        idUsuario: z.string()
    })
})

export const generarTurnosDisponiblesSchema = z.object({})

export const modificarFechaTurnoSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        idUsuario: z.string(),
        nuevaFecha: z.iso.datetime().optional()
            .transform((val) => val ? new Date(val) : undefined)

    })
})

export const busquedaDeTurnosDisponiblesSchema = z.object({
    params: z.object({
        idPaciente: z.string()
    }),
    body: z.object({
        idMedico: z.string().optional(),
        idEspecialidad: z.string().optional(),
        idPractica: z.string().optional(),
        idSede: z.string().optional(),
        fechaDesde: z.iso.datetime().optional()
            .transform((val) => val ? new Date(val): undefined),
        fechaHasta: z.string().datetime().optional()
            .transform((val) => val ? new Date(val): undefined)
    }),
    query: z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional()
    }).optional()
})