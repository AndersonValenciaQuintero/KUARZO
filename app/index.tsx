import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import HomeWeb from "@/src/views/AppWeb/HomeWeb";
import CatalogoMovil from "@/src/views/AppMovil/CatalogoMovil";

const App = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <CatalogoMovil />;
  }

  return <HomeWeb />;
};

export default App;
