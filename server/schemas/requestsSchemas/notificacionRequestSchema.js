import { z } from "zod";

export const mostrarNotificacionesSchema = z.object({
    params: z.object({
        idUsuario: z.string(),
    }),
    query: z.object({
        leidas: z.enum(["true", "false"])
            .transform(value => value === "true")
            .optional()
    })
})

export const marcarComoLeidaSchema = z.object({
    params: z.object({
        idUsuario: z.string(),
        idNotificacion: z.string()
    })
})