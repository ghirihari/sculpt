export const historyStyles = {
  container: {
    padding: "20px",
    backgroundColor: "#181818",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: "0px",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "30px",
    textAlign: "center",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "28px",
    color: "#fff",
    fontWeight: "600",
  },
  addButton: {
    padding: "14px 24px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    minWidth: "120px",
    textAlign: "center",
    width: "100%",
    "&:hover": {
      backgroundColor: "#2980b9",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2a2a2a",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#fff",
  },
  select: {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "15px",
    fontSize: "16px",
    backgroundColor: "#3b3b3b",
    color: "#fff",
    transition: "all 0.2s ease",
  },
  sessionItem: {
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#3b3b3b",
  },
  sessionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  sessionDate: {
    fontWeight: "500",
    color: "#fff",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#c0392b",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  measurementsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
  },
  measurementItem: {
    padding: "12px",
    backgroundColor: "#4a4a4a",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#fff",
  },
  historyItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 16px",
    border: "none",
    borderRadius: "6px",
    marginBottom: "8px",
    backgroundColor: "#3b3b3b",
    color: "#fff",
  },
  noData: {
    textAlign: "center",
    color: "#7f8c8d",
    fontStyle: "italic",
    padding: "20px",
  },
  graphPlaceholder: {
    border: "2px dashed #4a4a4a",
    borderRadius: "8px",
    textAlign: "center",
    color: "#7f8c8d",
    backgroundColor: "#2a2a2a",
  },

  // Filter item styles to match the dark theme
  filterItem: {
    border: "1px solid #4a4a4a",
    borderRadius: "12px",
    width: "fit-content",
    color: "#fff",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#3b3b3b",
  },

  // Mobile-specific optimizations
  "@media (max-width: 768px)": {
    container: {
      padding: "16px",
    },
    headerTitle: {
      fontSize: "24px",
    },
    section: {
      padding: "16px",
      marginBottom: "20px",
    },
    addButton: {
      width: "100%",
      padding: "16px 24px",
    },
    headerContent: {
      flexDirection: "column",
      gap: "15px",
    },
  },

  // Extra small screens
  "@media (max-width: 480px)": {
    container: {
      padding: "12px",
    },
    headerTitle: {
      fontSize: "22px",
    },
    section: {
      padding: "12px",
    },
  },
};
