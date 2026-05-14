import { z } from "zod";

export const reservarTurnoSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    }),
    body: z.object({
        pacienteId: z.string().uuid()
    })
})

export const cancelarTurnoRequestSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    }), 
    body: z.object({
        motivo: z.string.min(5),
        idUsuario: z.string().uuid()
    })
})

export const obtenerHistorialTurnosSchema = z.object({
    pacienteId: z.string().uuid(),

    estado: z.enum(["RESERVADO", "CONFIRMADO", "CANCELADO", "REALIZADO"]).optional(),
    
    fechaDesde: z.iso.datetime().optional()
        .transform((val) => val ? new Date(val): undefined),
    
    fechaHasta: z.string().datetime().optional()
        .transform((val) => val ? new Date(val): undefined),

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10)

})

export const maracarComoConfirmadoSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    }),
    body: z.object({
        idUsuario: z.string().uuid()
    })
})

export const marcarComoRealizadoSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    }),
    body: z.object({
        idUsuario: z.string().uuid()
    })
})

export const generarTurnosDisponiblesSchema = z.object({})

export const modificarFechaTurnoSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    }),
    body: z.object({
        idUsuario: z.string().uuid(),
        nuevaFecha: z.iso.datetime().optional()
            .transform((val) => val ? new Date(val) : undefined)

    })
})