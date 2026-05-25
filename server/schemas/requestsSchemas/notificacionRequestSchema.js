import { z } from "zod";

export const mostrarNoLeidasSchema = z.object({
    params: z.object({
        idUsuario: z.string()
    })
})
export const mostrarLeidasSchema = z.object({
    params: z.object({
        idUsuario: z.string()
    })
})
export const marcarComoLeidaSchema = z.object({
    params: z.object({
        idUsuario: z.string(),
        idNotificacion: z.string()
    })
})