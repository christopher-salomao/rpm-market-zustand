import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";

import logo from "../../assets/logo.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormData } from "./schema";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

import toast from "react-hot-toast";
import { toastStyle } from "../../styles/toastStyle";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
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
  }, []);

  async function onSubmit(data: FormData) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Login realizado com sucesso!", {
          style: toastStyle,
        });
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Verifique se o e-mail e senha estão corretos!", {
            style: toastStyle,
          });
          return;
        }

        toast.error("Erro ao realizar o login!", {
          style: toastStyle,
        });
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
          type="email"
          placeholder="Digite o seu e-mail"
          name="email"
          label="E-mail"
          error={errors.email?.message}
          register={register}
        />

        <div className="w-full">
          <div className="relative mb-1 w-full">
            <label
              htmlFor="password"
              className="absolute -top-3.5 left-2 bg-white px-1.5 z-10 font-bold text-md text-zinc-800 cursor-text"
            >
              Senha
            </label>
            <input
              className={`border ${
                errors.password ? "border-red-600" : "border-zinc-500"
              } px-2 h-10 rounded-sm outline-none w-full pr-10`}
              type={showPassword ? "text" : "password"}
              placeholder="Digite a sua senha"
              {...register("password")}
              id="password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-xl  text-zinc-600 hover:text-black cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-red-600 px-3 h-10 rounded-sm hover:bg-red-700 transition-colors duration-300 border-2 border-zinc-900 text-white font-medium text-lg"
        >
          Entrar
        </button>
      </form>
      <Link
        to={"/cadastro"}
        className="text-zinc-600 hover:text-zinc-800 transition-colors duration-300"
      >
        Novo por aqui? <strong>Cadastre-se</strong>
      </Link>
    </section>
  );
}

export default Login;
