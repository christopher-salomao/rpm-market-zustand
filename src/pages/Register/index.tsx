import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/context";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";

import logo from "../../assets/logo.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormData } from "./schema";

import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

import toast from "react-hot-toast";
import { toastStyle } from "../../styles/toastStyle";

function Register() {
  const { handleInfoUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth);
  }, [navigate]);

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          uid: user.user.uid,
          email: data.email,
          name: data.name,
        });

        toast.success("Cadastro realizado com sucesso!", {
          style: toastStyle,
        });

        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!", {
          style: toastStyle,
        });
        console.log(error);
      });
  }

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-3 gap-4">
      <Link to={"/"} className="w-full max-w-40 mb-6">
        <img src={logo} alt="Logo do site" className="w-full object-contain" />
      </Link>

      <form
        className="bg-white max-w-xl w-full py-6 px-4 rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Digite o seu nome completo"
          name="name"
          label="Nome completo"
          error={errors.name?.message}
          register={register}
        />

        <Input
          type="email"
          placeholder="Digite o seu e-mail"
          name="email"
          label="E-mail"
          error={errors.email?.message}
          register={register}
        />

        <Input
          type="password"
          placeholder="Digite uma sua senha"
          name="password"
          label="Senha"
          error={errors.password?.message}
          register={register}
        />

        <button
          type="submit"
          className="bg-red-600 px-3 h-10 rounded-sm hover:bg-red-700 transition-colors border-2 border-zinc-900 duration-300 text-white font-medium text-lg"
        >
          Cadastrar
        </button>
      </form>
      <Link
        to={"/login"}
        className="text-zinc-600 hover:text-zinc-800 transition-colors duration-300"
      >
        Já possui uma conta? <strong>Faça login</strong>
      </Link>
    </section>
  );
}

export default Register;
