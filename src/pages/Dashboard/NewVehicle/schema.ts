import { z } from "zod";

export const newVehicleSchema = z.object({
  name: z.string().nonempty("A marca é obrigatória"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano do veículo é obrigatório"),
  km: z.string().nonempty("O quilometragem é obrigatória"),
  price: z.string().nonempty("O preco é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Insira um número de telefone válido",
    }),
  description: z.string().nonempty("A descrição é obrigatória"),
});

export type FormData = z.infer<typeof newVehicleSchema>;
