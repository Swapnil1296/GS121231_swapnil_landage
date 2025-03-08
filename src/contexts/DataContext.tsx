import React, { createContext, useState, ReactNode } from 'react';
import { Store, SKU, PlanningEntry } from '../types';
import { sampleStores, sampleSKUs, sampleWeeks } from '../data/sampleData';

interface DataContextType {
    stores: Store[];
    setStores: React.Dispatch<React.SetStateAction<Store[]>>;
    skus: SKU[];
    setSKUs: React.Dispatch<React.SetStateAction<SKU[]>>;
    planningData: PlanningEntry[];
    setPlanningData: React.Dispatch<React.SetStateAction<PlanningEntry[]>>;
    weeks: string[];
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [stores, setStores] = useState<Store[]>(sampleStores);
    const [skus, setSKUs] = useState<SKU[]>(sampleSKUs);

    // Create a cross-join of all (store, sku, week) combos with default salesUnits = 0
    const [planningData, setPlanningData] = useState<PlanningEntry[]>(() => {
        const data: PlanningEntry[] = [];
        sampleStores.forEach((store) => {
            sampleSKUs.forEach((sku) => {
                sampleWeeks.forEach((week) => {
                    data.push({
                        storeId: store.id,
                        skuId: sku.id,
                        week,
                        salesUnits: 0,
                    });
                });
            });
        });
        return data;
    });

    const weeks = sampleWeeks;

    return (
        <DataContext.Provider
            value={{
                stores,
                setStores,
                skus,
                setSKUs,
                planningData,
                setPlanningData,
                weeks,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
