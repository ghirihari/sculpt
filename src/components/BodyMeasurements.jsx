import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BodyMeasurements.styles.js";
import measurementsDB from "../utils/measurementsDB.js";

const BodyMeasurements = () => {
  const navigate = useNavigate();
  const bodyParts = [
    { id: "weight", label: "Weight", unit: "lbs/kg" },
    { id: "waist", label: "Waist", unit: "inches/cm" },
    { id: "shoulder", label: "Shoulder", unit: "inches/cm" },
    { id: "chest", label: "Chest", unit: "inches/cm" },
    { id: "leftBicep", label: "Left Bicep", unit: "inches/cm" },
    { id: "rightBicep", label: "Right Bicep", unit: "inches/cm" },
    { id: "leftForearm", label: "Left Forearm", unit: "inches/cm" },
    { id: "rightForearm", label: "Right Forearm", unit: "inches/cm" },
    { id: "abdomen", label: "Abdomen", unit: "inches/cm" },
    { id: "rightThigh", label: "Right Thigh", unit: "inches/cm" },
    { id: "leftThigh", label: "Left Thigh", unit: "inches/cm" },
    { id: "rightCalf", label: "Right Calf", unit: "inches/cm" },
    { id: "leftCalf", label: "Left Calf", unit: "inches/cm" },
    { id: "glutes", label: "Glutes", unit: "inches/cm" },
  ];

  const [measurements, setMeasurements] = useState(
    bodyParts.reduce((acc, part) => {
      acc[part.id] = "";
      return acc;
    }, {})
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load latest measurements on component mount
  useEffect(() => {
    const loadLatestMeasurements = async () => {
      try {
        setIsLoading(true);
        const latestMeasurements = await measurementsDB.getLatestMeasurements();
        setMeasurements((prev) => ({
          ...prev,
          ...latestMeasurements,
        }));
      } catch (error) {
        console.error("Error loading measurements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLatestMeasurements();
  }, []);

  const handleInputChange = (id, value) => {
    setMeasurements((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Filter out empty measurements
      const filledMeasurements = Object.entries(measurements)
        .filter(([, value]) => value.trim() !== "")
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      // Check if there are any measurements to save
      if (Object.keys(filledMeasurements).length === 0) {
        alert("Please enter at least one measurement before saving.");
        return;
      }

      // Save to IndexedDB
      const measurementIds = await measurementsDB.saveMeasurements(
        filledMeasurements
      );
      console.log(
        "Saved measurements with IDs:",
        measurementIds,
        filledMeasurements
      );

      // Show success message
      alert("Measurements saved successfully!");
    } catch (error) {
      console.error("Error saving measurements:", error);
      alert("Failed to save measurements. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setMeasurements(
      bodyParts.reduce((acc, part) => {
        acc[part.id] = "";
        return acc;
      }, {})
    );
  };

  return (
    <div style={styles.bodyMeasurements}>
      <div style={styles.measurementsHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Back
          </button>
          <h2 style={{ ...styles.measurementsHeaderH2, margin: 0 }}>
            Add Measurements
          </h2>
        </div>
        <p style={styles.measurementsSubtitle}>
          {isLoading && " (Loading latest measurements...)"}
        </p>
      </div>

      <div style={styles.measurementsForm}>
        {bodyParts.map((part) => (
          <div key={part.id} style={styles.measurementItem}>
            <label htmlFor={part.id} style={styles.measurementLabel}>
              {part.label}
              <span style={styles.measurementUnit}>({part.unit})</span>
            </label>
            <input
              type="number"
              id={part.id}
              value={measurements[part.id]}
              onChange={(e) => handleInputChange(part.id, e.target.value)}
              placeholder="Enter measurement"
              style={styles.measurementInput}
              step="0.1"
              min="0"
            />
          </div>
        ))}
      </div>

      <div style={styles.measurementsActions}>
        <button
          onClick={handleClear}
          style={{ ...styles.btn, ...styles.btnSecondary }}
        >
          Clear All
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || isLoading}
          style={{
            ...styles.btn,
            ...styles.btnPrimary,
            opacity: isSaving || isLoading ? 0.6 : 1,
            cursor: isSaving || isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "Saving..." : "Save Measurements"}
        </button>
      </div>
    </div>
  );
};

export default BodyMeasurements;
