import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut, deleteUser, type User } from "firebase/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between bg-zinc-900 w-full text-white py-3 px-4 rounded-lg mb-4">
      <div>
        <Link to={"/dashboard"} className="mr-4 hover:underline">
          Deshboard
        </Link>
        <Link to={"/dashboard/novo-veiculo"} className="hover:underline">
          Cadastrar veículo
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <span className="hover:underline cursor-pointer text-red-600">
              Sair
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <button className="bg-zinc-900 text-white border-2 border-zinc-900 font-medium px-12 py-2 rounded-lg hover:bg-zinc-700 transition-colors duration-300">
                  Não
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  className="bg-red-500 text-white border-2 border-zinc-900 font-medium px-12 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  onClick={async () => await signOut(auth)}
                >
                  Sair
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <span className="hover:underline cursor-pointer text-red-600">
              Excluir Conta
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Tem certeza que deseja excluir sua conta?
              </DialogTitle>
              <DialogDescription>
                Essa ação não pode ser desfeita e voçe perderá todos os seus
                dados.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <button className="bg-zinc-900 text-white border-2 border-zinc-900 font-medium px-12 py-2 rounded-lg hover:bg-zinc-700 transition-colors duration-300">
                  Não
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  className="bg-red-500 text-white border-2 border-zinc-900 font-medium px-12 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  onClick={async () =>
                    await deleteUser(auth.currentUser as User)
                  }
                >
                  Excluir
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
