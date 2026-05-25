import { z } from "zod";

export const mostrarNoLeidasSchema = z.object({
    params: z.object({
        id: z.string()
    })
})
export const mostrarLeidasSchema = z.object({
    params: z.object({
        id: z.string()
    })
})
export const marcarComoLeida = z.object({
    params: z.object({
        id: z.string()
    })
})