import React, { useState } from "react";
import { Group } from "@visx/group";

import {
  Treemap,
  hierarchy,
  stratify,
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice
} from "@visx/hierarchy";

import shakespeare from "@visx/mock-data/lib/mocks/shakespeare";
import { scaleLinear } from "@visx/scale";const color1 = "#f3e9d2";

const color2 = "#4281a4";
const background = "#114b5f";

const colorScale = scaleLinear({
  domain: [0, Math.max(...shakespeare.map((d) => d.size || 0))],
  range: [color2, color1]
});

const data = stratify()
  .id((d) => d.id)
  .parentId((d) => d.parent)(shakespeare)
  .sum((d) => d.size || 0);const tileMethods = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice
};

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export const Example = ({ width, height, margin = defaultMargin }) => {

    const [tileMethod, setTileMethod] = useState("treemapSquarify");
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    
    const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));  return width < 10 ? null : (
    <div>
      <label>tile method</label>{" "}
      <select
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setTileMethod(e.target.value)}
        value={tileMethod}
      >
        {Object.keys(tileMethods).map((tile) => (
          <option key={tile} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill={background} />
          <Treemap
            top={margin.top}
            root={root}
            size={[xMax, yMax]}
            tile={tileMethods[tileMethod]}
            round
          >
            {(treemap) => (
              <Group>
                {treemap
                  .descendants()
                  .reverse()
                  .map((node, i) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    return (
                      <Group
                        key={`node-${i}`}
                        top={node.y0 + margin.top}
                        left={node.x0 + margin.left}
                      >
                        {node.depth === 1 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            strokeWidth={4}
                            fill="transparent"
                          />
                        )}
                        {node.depth > 2 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            fill={colorScale(node.value || 0)}
                          />
                        )}
                      </Group>
                    );
                  })}
              </Group>
            )}
          </Treemap>
        </svg>
      </div>
    </div>
  );
}