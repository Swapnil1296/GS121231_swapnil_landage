export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
}

export interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
}

export interface PlanningEntry {
  storeId: string;
  skuId: string;
  week: string;
  salesUnits: number;
}
