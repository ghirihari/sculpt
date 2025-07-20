import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { historyStyles } from "./MeasurementsHistory.styles.js";

export const BodyLabels = {
  weight: "Weight",
  waist: "Waist",
  shoulder: "Shoulder",
  chest: "Chest",
  leftBicep: "Left Bicep",
  rightBicep: "Right Bicep",
  leftForearm: "Left Forearm",
  rightForearm: "Right Forearm",
  abdomen: "Abdomen",
  rightThigh: "Right Thigh",
  leftThigh: "Left Thigh",
  rightCalf: "Right Calf",
  leftCalf: "Left Calf",
  glutes: "Glutes",
};

interface Measurement {
  id: string;
  bodyPart: string;
  value: number;
  unit: string;
  timestamp: number;
}

interface MeasurementChartProps {
  selectedBodyPart: string;
  measurements: Measurement[];
}

const MeasurementChart = ({
  selectedBodyPart,
  measurements,
}: MeasurementChartProps) => {
  // Filter measurements for the selected body part and format for chart
  const chartData = measurements
    .filter((measurement) => measurement.bodyPart === selectedBodyPart)
    .sort((a, b) => a.timestamp - b.timestamp) // Sort by date ascending
    .map((measurement, index) => ({
      date: new Date(measurement.timestamp).toLocaleDateString(),
      value: measurement.value,
      unit: measurement.unit,
      measurement: `${measurement.value} ${measurement.unit}`,
      index: index + 1, // For x-axis labeling
    }));

  if (chartData.length === 0) {
    return (
      <div style={historyStyles.graphPlaceholder}>
        No data available for{" "}
        {BodyLabels[selectedBodyPart as keyof typeof BodyLabels]}
      </div>
    );
  }

  return (
    <div style={{ ...historyStyles.graphPlaceholder, height: "400px" }}>
      <h4
        style={{
          textAlign: "center",
          color: "#fff",
          fontWeight: "600",
        }}
      >
        {BodyLabels[selectedBodyPart as keyof typeof BodyLabels]}
      </h4>
      <ResponsiveContainer
        height={"80%"}
        width={"90%"}
        style={{ justifySelf: "center" }}
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
          <XAxis
            dataKey="date"
            tick={false}
            axisLine={{ stroke: "#4a4a4a" }}
            tickLine={{ stroke: "#4a4a4a" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#7f8c8d" }}
            label={{
              value: chartData[0]?.unit || "",

              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#7f8c8d" },
            }}
            axisLine={{ stroke: "#4a4a4a" }}
            tickLine={{ stroke: "#4a4a4a" }}
          />
          <Tooltip
            formatter={(value) => [
              `${value} ${chartData[0]?.unit || ""}`,
              BodyLabels[selectedBodyPart as keyof typeof BodyLabels],
            ]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: "#3b3b3b",
              border: "1px solid #4a4a4a",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3498db"
            strokeWidth={2}
            dot={{ fill: "#3498db", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3498db", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MeasurementChart;
