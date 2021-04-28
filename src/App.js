
import React from "react";

import { Palette } from './components/Pallete';
import { Canvas } from "./components/Canvas";
import { PropertiesPanel } from "./components/PropertiesPanel";

function App() {
  return (
    <div className="app">
      <Palette />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}

export default App;