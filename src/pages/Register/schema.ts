import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(10, "Nome muito curto").nonempty("O nome é obrigatório"),
  email: z
    .email("Insira um email válido")
    .nonempty("O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("A senha é obrigatoria"),
});

export type FormData = z.infer<typeof loginSchema>;
