import React from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Scatter,
} from "recharts";

const Graph = ({ currentRepresentation, data }) => {
  return (
    <div className='graph'>
      <ScatterChart
        width={1200}
        height={800}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          domain={[-180, 180]}
          dataKey={"x"}
          type='number'
          name='latitude'
        />
        <YAxis
          domain={[-180, 180]}
          dataKey={"y"}
          type='number'
          name='longitude'
        />
        <ZAxis
          range={
            currentRepresentation
              ? [1, data[0].population / 28113]
              : [1, data[0].area / 100]
          }
          dataKey={currentRepresentation ? "population" : "area"}
          type='number'
          name={currentRepresentation ? "population" : "area"}
        />
        <Scatter name={data[0].name} data={[data[0]]} fill='#8884d8' />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      </ScatterChart>
    </div>
  );
};

export default Graph;
