import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import measurementsDB from "../utils/measurementsDB.js";
import { historyStyles } from "./MeasurementsHistory.styles.js";
import MeasurementChart, { BodyLabels } from "./MeasurementChart.tsx";

const FilterList = ({ measurements, setSelectedBodyPart }) => {
  const FilterItem = ({ part }) => {
    return (
      <div
        key={part.id}
        style={historyStyles.filterItem}
        onClick={() => setSelectedBodyPart(part.value)}
      >
        <div>{part.label}</div>
      </div>
    );
  };

  // Remove duplicates using bodyPart as key
  const uniqueMeasurements = measurements.reduce((acc, measurement) => {
    if (!acc.some((item) => item.bodyPart === measurement.bodyPart)) {
      acc.push(measurement);
    }
    return acc;
  }, []);

  return (
    <>
      {uniqueMeasurements.map((part) => (
        <FilterItem
          key={part.id}
          part={{ label: BodyLabels[part.bodyPart], value: part.bodyPart }}
          setSelectedBodyPart={setSelectedBodyPart}
        />
      ))}
    </>
  );
};

const MeasurementsHistory = () => {
  const navigate = useNavigate();
  const [selectedBodyPart, setSelectedBodyPart] = useState("weight");

  const [measurements, setMeasurements] = useState([]);

  const loadMeasurements = async () => {
    const allMeasurements = await measurementsDB.getAllMeasurements();
    setMeasurements(allMeasurements);
  };

  useEffect(() => {
    (async () => {
      await loadMeasurements();
    })();
  }, []);

  return (
    <div style={historyStyles.container}>
      <div style={historyStyles.header}>
        <div style={historyStyles.headerContent}>
          <h2 style={historyStyles.headerTitle}>Measurements</h2>
          <div style={{ display: "flex", gap: "10px" }}></div>
        </div>
      </div>

      <button onClick={() => navigate("/add")} style={historyStyles.addButton}>
        + Add Measurements
      </button>
      <div style={{ display: "flex", gap: "8px", margin: "16px 0px" }}>
        <FilterList
          measurements={measurements}
          setSelectedBodyPart={setSelectedBodyPart}
        />
      </div>
      {/* Body Part History Section */}
      <div style={historyStyles.section}>
        <h3 style={historyStyles.sectionTitle}>Progress Tracking</h3>

        {selectedBodyPart ? (
          <MeasurementChart
            selectedBodyPart={selectedBodyPart}
            measurements={measurements}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MeasurementsHistory;
