import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Container } from "../../components/Container";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "@/components/Spinner";

import { db } from "@/services/firebaseConnection";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";

import type { VehicleProps } from "@/interfaces/VehicleProps";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  function loadVehicles() {
    const vehiclesRef = collection(db, "vehicles");
    const queryRef = query(vehiclesRef, orderBy("creationDate", "desc"));

    getDocs(queryRef)
      .then((snapshot) => {
        setIsError(false);
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
        setInputValue("");
        setVehicles(vehiclesList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao carregar veículos", error);
      });
  }

  async function handleSearchVehicle() {
    if (inputValue === "") {
      loadVehicles();
      return;
    }

    setVehicles([]);
    setLoadedImages([]);

    setIsLoading(true);

    const queryRef = query(
      collection(db, "vehicles"),
      where("name", ">=", inputValue.toUpperCase()),
      where("name", "<=", inputValue.toUpperCase() + "\uf8ff")
    );

    await getDocs(queryRef)
      .then((snapshot) => {
        if (snapshot.empty) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        setIsError(false);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao carregar veículos", error);
      });
  }

  function handleImageLoad(id: string) {
    setLoadedImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <div className="w-full max-w-5xl bg-white p-4 rounded-lg flex items-center justify-between gap-4 mt-6">
        <input
          type="text"
          placeholder="Digite o modelo do veículo..."
          className="grow border border-zinc-500 px-2 h-9 rounded-sm outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          className="bg-red-600 px-3 h-9 rounded-sm cursor-pointer hover:bg-red-700 transition-colors duration-300"
          onClick={handleSearchVehicle}
        >
          <FaSearch size={24} color="#ffffff" />
        </button>
      </div>

      <h1 className="text-2xl font-medium mt-6 mb-4">
        Veículos novos e usados em todo o Brasil
      </h1>

      {isError ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-medium mt-6 mb-4">
            Nenhum veículo encontrado
          </h2>
          <button
            className="bg-red-600 px-3 h-10 rounded-sm hover:bg-red-700 transition-colors duration-300 border-2 border-zinc-900 text-white font-medium text-lg"
            onClick={loadVehicles}
          >
            Veja todos os veículos
          </button>
        </div>
      ) : (
        <>
          {vehicles.length > 0 && (
            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <Link key={vehicle.id} to={`/veiculo/${vehicle.id}`}>
                  <section className="w-full bg-white px-2 py-4 rounded-lg hover:scale-101 transition-all duration-300">
                    <div
                      className="w-full h-72 aspect-[4/3] bg-gray-200 rounded"
                      style={{
                        display: loadedImages.includes(vehicle.id)
                          ? "none"
                          : "block",
                      }}
                    >
                      <Spinner />
                    </div>

                    <img
                      src={vehicle.images[0].url}
                      alt={vehicle.name}
                      className="w-full max-h-72 aspect-[4/3] object-contain rounded mb-2"
                      onLoad={() => handleImageLoad(vehicle.id)}
                      style={{
                        display: loadedImages.includes(vehicle.id)
                          ? "block"
                          : "none",
                      }}
                    />
                    <p className="font-bold mt-1 mb-2">{vehicle.name}</p>
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
                </Link>
              ))}
            </main>
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
