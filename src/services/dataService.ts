import { Store, SKU, PlanningData } from "../types/dataTypes";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchSampleData = async () => {
  try {
    const response = await fetch(`${API_URL}/sample-data.json`);
    const data = await response.json();
    return validateSampleData(data);
  } catch (error) {
    console.error("Error loading sample data:", error);
    throw error;
  }
};

const validateSampleData = (data: any) => {
  if (!data.stores || !data.skus || !data.planningData) {
    throw new Error("Invalid data format");
  }
  return data as {
    stores: Store[];
    skus: SKU[];
    planningData: PlanningData[];
  };
};

export const exportData = (data: {
  stores: Store[];
  skus: SKU[];
  planningData: PlanningData[];
}) => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `data-export-${new Date().toISOString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
