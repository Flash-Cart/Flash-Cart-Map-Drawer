
import React from "react";

import { Palette } from './components/Pallete';
import { TopBar } from './components/TopBar';
import { Canvas } from "./components/Canvas";
import { PropertiesPanel } from "./components/PropertiesPanel";

function App() {
  return (
    <div className="app">
      <TopBar />
      <Palette />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}

export default App;