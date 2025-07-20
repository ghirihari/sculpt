/**
 * IndexedDB utility for body measurements storage
 * Database: "Measurments" (keeping the typo as requested)
 * Optimized for measurements tracking and graph visualization
 */

const DB_NAME = "Measurments";
const DB_VERSION = 2; // Incremented to remove sessions store
const MEASUREMENTS_STORE = "measurements";

/**
 * Data Structure:
 *
 * Measurements Store:
 * {
 *   id: string (UUID),
 *   bodyPart: string (weight, waist, chest, etc.),
 *   value: number,
 *   unit: string (lbs, kg, inches, cm),
 *   timestamp: number,
 *   date: Date,
 *   notes?: string (optional notes for individual measurements)
 * }
 */

class MeasurementsDB {
  constructor() {
    this.db = null;
  }

  /**
   * Initialize the database
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error("Failed to open database"));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Remove sessions store if it exists (migration from v1 to v2)
        if (db.objectStoreNames.contains("sessions")) {
          db.deleteObjectStore("sessions");
        }

        // Create or recreate measurements store
        if (db.objectStoreNames.contains(MEASUREMENTS_STORE)) {
          db.deleteObjectStore(MEASUREMENTS_STORE);
        }

        const measurementsStore = db.createObjectStore(MEASUREMENTS_STORE, {
          keyPath: "id",
        });
        measurementsStore.createIndex("bodyPart", "bodyPart", {
          unique: false,
        });
        measurementsStore.createIndex("timestamp", "timestamp", {
          unique: false,
        });
        measurementsStore.createIndex(
          "bodyPart_timestamp",
          ["bodyPart", "timestamp"],
          { unique: false }
        );
      };
    });
  }

  /**
   * Generate a simple UUID
   */
  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * Save measurements (no longer grouped by sessions)
   * @param {Object} measurements - Object with bodyPart: value pairs
   * @param {string} notes - Optional notes for the measurements
   * @returns {Promise<Array>} - Array of measurement IDs
   */
  async saveMeasurements(measurements, notes = "") {
    if (!this.db) await this.init();

    const timestamp = Date.now();
    const date = new Date();

    const transaction = this.db.transaction([MEASUREMENTS_STORE], "readwrite");
    const measurementsStore = transaction.objectStore(MEASUREMENTS_STORE);

    // Create individual measurement records
    const measurementPromises = Object.entries(measurements).map(
      ([bodyPart, value]) => {
        const measurement = {
          id: this.generateId(),
          bodyPart: bodyPart,
          value: parseFloat(value),
          unit: this.getUnitForBodyPart(bodyPart),
          timestamp: timestamp,
          date: date,
          notes: notes, // Notes are now per measurement, not per session
        };
        return measurementsStore.add(measurement);
      }
    );

    await Promise.all(measurementPromises);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        // Return the measurement IDs
        const measurementIds = Object.keys(measurements).map(() =>
          this.generateId()
        );
        resolve(measurementIds);
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  /**
   * @deprecated Use saveMeasurements instead
   * Kept for backward compatibility
   */
  async saveMeasurementSession(measurements, notes = "") {
    return this.saveMeasurements(measurements, notes);
  }

  /**
   * Get unit for a body part (helper function)
   */
  getUnitForBodyPart(bodyPart) {
    if (bodyPart === "weight") {
      return "lbs"; // Default to lbs, could be made configurable
    }
    return "inches"; // Default to inches for body measurements
  }

  /**
   * Get measurements grouped by date (replaces session functionality)
   * @param {number} limit - Maximum number of date groups to return
   * @returns {Promise<Array>} - Array of date groups with measurements
   */
  async getMeasurementsByDate(limit = 50) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([MEASUREMENTS_STORE], "readonly");
      const store = transaction.objectStore(MEASUREMENTS_STORE);
      const index = store.index("timestamp");
      const request = index.getAll();

      request.onsuccess = () => {
        const measurements = request.result.sort(
          (a, b) => b.timestamp - a.timestamp
        );

        // Group measurements by date (same day)
        const groupedByDate = {};
        measurements.forEach((measurement) => {
          const dateKey = measurement.date.toDateString();
          if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = {
              date: measurement.date,
              timestamp: measurement.timestamp,
              measurements: [],
            };
          }
          groupedByDate[dateKey].measurements.push(measurement);
        });

        // Convert to array and sort by timestamp, then limit
        const dateGroups = Object.values(groupedByDate)
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit);

        resolve(dateGroups);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * @deprecated Sessions no longer exist - use getMeasurementsByDate instead
   */
  async getAllSessions() {
    return this.getMeasurementsByDate();
  }

  /**
   * @deprecated Sessions no longer exist - use getMeasurementsByDate instead
   */
  async getMeasurementsBySession(sessionId) {
    // Return empty array since sessions don't exist anymore
    return [];
  }

  /**
   * Get historical data for a specific body part (for graphing)
   * @param {string} bodyPart - Body part name
   * @param {number} limit - Maximum number of records to return
   * @returns {Promise<Array>} - Array of measurements sorted by timestamp
   */
  async getBodyPartHistory(bodyPart, limit = 50) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([MEASUREMENTS_STORE], "readonly");
      const store = transaction.objectStore(MEASUREMENTS_STORE);
      const index = store.index("bodyPart_timestamp");
      const range = IDBKeyRange.bound([bodyPart, 0], [bodyPart, Date.now()]);
      const request = index.getAll(range);

      request.onsuccess = () => {
        // Sort by timestamp ascending and limit results
        const measurements = request.result
          .sort((a, b) => a.timestamp - b.timestamp)
          .slice(-limit); // Get the most recent 'limit' measurements
        resolve(measurements);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get all measurements from the database
   * @param {number} limit - Maximum number of records to return (optional)
   * @returns {Promise<Array>} - Array of all measurement objects sorted by timestamp (newest first)
   */
  async getAllMeasurements(limit = null) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([MEASUREMENTS_STORE], "readonly");
      const store = transaction.objectStore(MEASUREMENTS_STORE);
      const index = store.index("bodyPart_timestamp");

      const request = index.getAll();

      request.onsuccess = () => {
        // Sort by timestamp descending (newest first)
        let measurements = request.result.sort(
          (a, b) => b.timestamp - a.timestamp
        );

        // Apply limit if specified
        if (limit && limit > 0) {
          measurements = measurements.slice(0, limit);
        }

        resolve(measurements);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get the latest measurements for all body parts
   * @returns {Promise<Object>} - Object with bodyPart: latestMeasurement pairs
   */
  async getLatestMeasurements() {
    if (!this.db) await this.init();

    const bodyParts = [
      "weight",
      "waist",
      "shoulder",
      "chest",
      "leftBicep",
      "rightBicep",
      "leftForearm",
      "rightForearm",
      "abdomen",
      "rightThigh",
      "leftThigh",
      "rightCalf",
      "leftCalf",
      "glutes",
    ];

    const latestMeasurements = {};

    for (const bodyPart of bodyParts) {
      const history = await this.getBodyPartHistory(bodyPart, 1);
      if (history.length > 0) {
        latestMeasurements[bodyPart] = history[0].value.toString();
      }
    }

    return latestMeasurements;
  }

  /**
   * Clear all data from the database
   * @returns {Promise<void>}
   */
  async clearAllData() {
    if (!this.db) await this.init();

    const transaction = this.db.transaction([MEASUREMENTS_STORE], "readwrite");
    const measurementsStore = transaction.objectStore(MEASUREMENTS_STORE);

    await measurementsStore.clear();

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}

// Export a singleton instance
export default new MeasurementsDB();
