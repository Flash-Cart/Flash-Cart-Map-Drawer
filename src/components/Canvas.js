import React, { useRef, useCallback } from "react";
import { Layer, Stage } from "react-konva";

import {
  useShapes,
  clearSelection,
  createCircle,
  createRectangle,
  saveDiagram,
  reset,
} from "../state/state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../constants/constants";
import { Shape } from "../constants/Shape";
import { firebaseApp } from '../base';



const handleDragOver = (event) => event.preventDefault();

export function Canvas() {
  const shapes = useShapes((state) => Object.entries(state.shapes));

  const stageRef = useRef();

  const handleExport = useCallback(() => {
    const filename = 'market-map-image'
    const uri = stageRef.current.toDataURL();

    const dataStr = "data:text/plain,base64,aGVsbG8gd29ybGQ=" + encodeURIComponent(uri);
    const file = new File([dataStr], filename + ".txt", {type: "text/plain;charset=utf-8"});

    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(filename + '.txt');
    const metadata = { contentType: 'text/plain', };
    fileRef.put(file, metadata).then(() => {
      console.log("Base64 image uploaded");
    })
  }, []);

  const handleDrop = useCallback((event) => {
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(
        draggedData
      );

      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT) {
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      }
    }
  }, []);

  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="buttons">
        <button onClick={() => {
          saveDiagram();
          handleExport();
        }}>Salvar Mapa</button>
        <button onClick={reset}>Limpar Mapa</button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth - 400}
        height={window.innerHeight}
        onClick={clearSelection}
      >
        <Layer>
          {shapes.map(([key, shape]) => (
            <Shape key={key} shape={{ ...shape, id: key }} />
          ))}
        </Layer>
      </Stage>
    </main>
  );
}
