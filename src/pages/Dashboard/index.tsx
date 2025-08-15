import { useContext, useEffect, useState } from "react";

import { Container } from "../../components/Container";
import { DashboardHeader } from "../../components/PanelHeader";
import { FiTrash2 } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "../../components/ui/dialog";
import { Spinner } from "@/components/Spinner";

import { db } from "@/services/firebaseConnection";
import { collection, query, getDocs, where, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/services/firebaseConnection";

import type { VehicleProps } from "@/interfaces/VehicleProps";

import { AuthContext } from "@/contexts/AuthContext/context";

function Dashboard() {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadVehicles() {
      if (!user?.uid) {
        return;
      }

      const vehiclesRef = collection(db, "vehicles");
      const queryRef = query(vehiclesRef, where("uid", "==", user.uid));

      getDocs(queryRef)
        .then((snapshot) => {
          const vehiclesList: VehicleProps[] = [];

          snapshot.forEach((doc) => {
            vehiclesList.push({
              id: doc.id,
              name: doc.data().name,
              model: doc.data().model,
              year: doc.data().year,
              km: doc.data().km,
              whatsapp: doc.data().whatsapp,
              city: doc.data().city,
              price: doc.data().price,
              description: doc.data().description,
              creationDate: doc.data().creationDate,
              owner: doc.data().owner,
              uid: doc.data().uid,
              images: doc.data().images,
            });
          });

          setVehicles(vehiclesList);
        })
        .catch((error) => {
          console.log("Erro ao carregar veículos", error);
        });
    }

    loadVehicles();
  }, [user]);

  function handleImageLoad(id: string) {
    setLoadedImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  async function handleDeleteVehicle(vehicle: VehicleProps) {
    try {
      const docRef = doc(db, "vehicles", vehicle.id);

      await deleteDoc(docRef);

      Promise.all(
        vehicle.images.map(async (image) => {
          const imagePath = `images/${image.uid}/${image.name}`;
          const imageRef = ref(storage, imagePath);
          try {
            await deleteObject(imageRef);
          } catch (error) {
            console.log("Erro ao deletar imagem", error);
          }
        })
      );

      setVehicles(
        vehicles.filter((prevVehicle) => prevVehicle.id !== vehicle.id)
      );
    } catch  {
      return;
    }
  }

  return (
    <Container>
      <DashboardHeader />

      {vehicles.length === 0 ? (
        <h1 className="text-2xl font-medium mb-4">
          Você não possui nenhum anúncio
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-medium mb-4">Meus anúncios</h1>

          <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <section
                key={vehicle.id}
                className="w-full bg-white px-2 py-4 rounded-lg relative"
              >
                <div className="absolute top-6 right-4 bg-white/60 border-2 p-1 rounded-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className="cursor-pointer hover:text-red-600 transition-colors duration-300">
                        <FiTrash2 size={24} />
                      </span>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Tem certeza que excluir esse anúncio?
                        </DialogTitle>
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
                            onClick={() => {handleDeleteVehicle(vehicle)}}
                          >
                            Sim
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div
                  className="w-full h-70 aspect-[4/3] bg-gray-200 rounded"
                  style={{
                    display: loadedImages.includes(vehicle.id)
                      ? "none"
                      : "block",
                  }}
                >
                  <Spinner />
                </div>
                <img
                  className="w-full max-h-70 aspect-[4/3] object-contain rounded mb-2"
                  src={vehicle.images[0].url}
                  alt={vehicle.name}
                  onLoad={() => handleImageLoad(vehicle.id)}
                  style={{
                    display: loadedImages.includes(vehicle.id)
                      ? "block"
                      : "none",
                  }}
                />
                <p className="font-bold mb-2">{vehicle.name}</p>
                <div className="flex flex-col border-b-2 border-zinc-300">
                  <span className="text-zinc-700 mb-6">
                    Ano {vehicle.year} • {vehicle.km} km
                  </span>
                  <strong className="text-red-600 text-xl mb-2">
                    {Number(vehicle.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-700">{vehicle.city}</span>
                </div>
              </section>
            ))}
          </main>
        </>
      )}
    </Container>
  );
}

export default Dashboard;
