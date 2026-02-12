import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="container">
      <h1>Silo</h1>
      <Button onClick={() => console.log("Clicked!")}>Click Me</Button>
    </main>
  );
}

export default App;
