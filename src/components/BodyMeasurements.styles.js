// BodyMeasurements.styles.js - JSS styles converted from CSS

const styles = {
  bodyMeasurements: {
    padding: "20px",
    backgroundColor: "#181818",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: "0px",
  },

  measurementsHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },

  measurementsHeaderH2: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },

  measurementsSubtitle: {
    color: "#7f8c8d",
    fontSize: "16px",
    margin: "0",
  },

  measurementsForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
  },

  measurementItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  measurementLabel: {
    fontWeight: "500",
    color: "#fff",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  measurementUnit: {
    fontSize: "14px",
    color: "#95a5a6",
    fontWeight: "400",
  },

  measurementInput: {
    padding: "14px 16px",
    border: "0px",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#3b3b3b",
    transition: "all 0.2s ease",
    WebkitAppearance: "none",
    MozAppearance: "textfield",
    "&::placeholder": {
      color: "#bdc3c7",
    },
  },

  measurementsActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  btn: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "120px",
    textAlign: "center",
  },

  btnPrimary: {
    backgroundColor: "#3498db",
    color: "white",
    "&:hover": {
      backgroundColor: "#2980b9",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },

  btnSecondary: {
    backgroundColor: "#95a5a6",
    color: "white",
    "&:hover": {
      backgroundColor: "#7f8c8d",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },

  // Mobile-specific optimizations
  "@media (max-width: 768px)": {
    bodyMeasurements: {
      margin: "10px",
      padding: "16px",
    },
    measurementsHeaderH2: {
      fontSize: "24px",
    },
    measurementsSubtitle: {
      fontSize: "14px",
    },
    measurementsForm: {
      gap: "16px",
      marginBottom: "24px",
    },
    measurementLabel: {
      fontSize: "15px",
    },
    measurementUnit: {
      fontSize: "13px",
    },
    measurementInput: {
      padding: "12px 14px",
      fontSize: "16px", // Prevents zoom on iOS
    },
    measurementsActions: {
      flexDirection: "column",
      gap: "10px",
    },
    btn: {
      width: "100%",
      padding: "16px 24px",
      fontSize: "16px",
    },
  },

  // Extra small screens
  "@media (max-width: 480px)": {
    bodyMeasurements: {
      margin: "5px",
      padding: "12px",
    },
    measurementsHeader: {
      marginBottom: "20px",
    },
    measurementsHeaderH2: {
      fontSize: "22px",
    },
    measurementsForm: {
      gap: "14px",
      marginBottom: "20px",
    },
    measurementInput: {
      padding: "14px 12px",
    },
  },

  // Dark mode support
  "@media (prefers-color-scheme: dark)": {
    bodyMeasurements: {
      backgroundColor: "#fff",
      color: "#ecf0f1",
    },
    measurementsHeaderH2: {
      color: "#ecf0f1",
    },
    measurementsSubtitle: {
      color: "#bdc3c7",
    },
    measurementLabel: {
      color: "#ecf0f1",
    },
    measurementUnit: {
      color: "#95a5a6",
    },
    measurementInput: {
      backgroundColor: "#fff",
      borderColor: "#4a5f7a",
      color: "#ecf0f1",
      "&::placeholder": {
        color: "#7f8c8d",
      },
    },
  },
};

export default styles;
