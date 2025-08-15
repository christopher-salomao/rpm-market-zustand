import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import { initAuthListener } from "./services/firebaseAuthListener";

import { register } from "swiper/element/bundle";
register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./index.css";

initAuthListener();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" />
     <RouterProvider router={router} />
  </StrictMode>
);
