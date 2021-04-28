import React, { useCallback } from "react";

import { useShapes, updateAttribute } from "../state/state";

const shapeSelector = (state) => state.shapes[state.selected];

export function PropertiesPanel() {
  const selectedShape = useShapes(shapeSelector);

  const updateAttr = useCallback((event) => {
    const attr = event.target.name;

    updateAttribute(attr, event.target.value);
  }, []);

  return (
    <aside className="panel">
      <h2>Propriedades</h2>
      <div className="properties">
        {selectedShape ? (
          <>
            <div className="key">
              Tipo <span className="value">{selectedShape.type}</span>
            </div>

            <div className="key">
              Traço{" "}
              <input
                className="value"
                name="stroke"
                type="color"
                value={selectedShape.stroke}
                onChange={updateAttr}
              />
            </div>

            <div className="key">
              Preenchimento{" "}
              <input
                className="value"
                name="fill"
                type="color"
                value={selectedShape.fill}
                onChange={updateAttr}
              />
            </div>
          </>
        ) : (
          <div className="no-data">Nenhum objeto foi selecionado</div>
        )}
      </div>
    </aside>
  );
}
