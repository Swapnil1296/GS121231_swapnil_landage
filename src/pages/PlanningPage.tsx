import React, { useContext } from 'react';
import {
    calculateSalesDollars,
    calculateGMDollars,
    calculateGMPercent,
    getGMPercentColor,
} from '../utils/calculations';
import { SKU } from '../types';
import { DataContext } from './../contexts/DataContext';

const PlanningPage: React.FC = () => {
    const dataContext = useContext(DataContext);
    if (!dataContext) return <div>Loading...</div>;

    const { stores, skus, planningData, setPlanningData, weeks } = dataContext;

    // Group planning data by (storeId, skuId)
    const rowMap: Record<string, any[]> = {};
    planningData.forEach((entry) => {
        const key = `${entry.storeId}-${entry.skuId}`;
        if (!rowMap[key]) {
            rowMap[key] = [];
        }
        rowMap[key].push(entry);
    });

    const handleSalesUnitsChange = (
        storeId: string,
        skuId: string,
        week: string,
        value: number
    ) => {
        setPlanningData((prev) =>
            prev.map((p) =>
                p.storeId === storeId && p.skuId === skuId && p.week === week
                    ? { ...p, salesUnits: value }
                    : p
            )
        );
    };

    const getStoreName = (storeId: string) =>
        stores.find((s) => s.id === storeId)?.name || '';

    const getSKU = (skuId: string): SKU | undefined =>
        skus.find((s) => s.id === skuId);

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-4">Planning</h2>
            <div className="overflow-auto">
                <table className="min-w-max border-collapse w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-2 text-left sticky left-0 bg-white z-10">
                                Store
                            </th>
                            <th className="py-2 px-2 text-left sticky left-32 bg-white z-10">
                                SKU
                            </th>
                            {weeks.map((week) => (
                                <th key={week} colSpan={4} className="py-2 px-2 text-center">
                                    {week}
                                </th>
                            ))}
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-2 sticky left-0 bg-white z-10"></th>
                            <th className="py-2 px-2 sticky left-32 bg-white z-10"></th>
                            {weeks.map((week) => (
                                <React.Fragment key={week}>
                                    <th className="py-2 px-2 text-right">Units</th>
                                    <th className="py-2 px-2 text-right">Sales $</th>
                                    <th className="py-2 px-2 text-right">GM $</th>
                                    <th className="py-2 px-2 text-right">GM %</th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(rowMap).map(([key, entries]) => {
                            const [storeId, skuId] = key.split('-');
                            const sku = getSKU(skuId);
                            if (!sku) return null;

                            return (
                                <tr key={key} className="border-b">
                                    <td className="py-2 px-2 sticky left-0 bg-white z-10 w-32">
                                        {getStoreName(storeId)}
                                    </td>
                                    <td className="py-2 px-2 sticky left-32 bg-white z-10 w-40">
                                        {sku.name}
                                    </td>
                                    {weeks.map((week) => {
                                        const dataPoint = entries.find((e) => e.week === week);
                                        if (!dataPoint) {
                                            return (
                                                <React.Fragment key={week}>
                                                    <td className="py-2 px-2 text-right">-</td>
                                                    <td className="py-2 px-2 text-right">-</td>
                                                    <td className="py-2 px-2 text-right">-</td>
                                                    <td className="py-2 px-2 text-right">-</td>
                                                </React.Fragment>
                                            );
                                        }
                                        const salesUnits = dataPoint.salesUnits;
                                        const salesDollars = calculateSalesDollars(
                                            salesUnits,
                                            sku.price
                                        );
                                        const gmDollars = calculateGMDollars(
                                            salesDollars,
                                            salesUnits,
                                            sku.cost
                                        );
                                        const gmPercent = calculateGMPercent(
                                            gmDollars,
                                            salesDollars
                                        );
                                        return (
                                            <React.Fragment key={week}>
                                                <td className="py-2 px-2 text-right">
                                                    <input
                                                        type="number"
                                                        className="w-16 border px-1 py-0.5"
                                                        value={salesUnits}
                                                        onChange={(e) =>
                                                            handleSalesUnitsChange(
                                                                storeId,
                                                                skuId,
                                                                week,
                                                                parseInt(e.target.value) || 0
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="py-2 px-2 text-right">
                                                    ${salesDollars.toFixed(2)}
                                                </td>
                                                <td className="py-2 px-2 text-right">
                                                    ${gmDollars.toFixed(2)}
                                                </td>
                                                <td
                                                    className={`py-2 px-2 text-right ${getGMPercentColor(
                                                        gmPercent
                                                    )}`}
                                                >
                                                    {(gmPercent * 100).toFixed(1)}%
                                                </td>
                                            </React.Fragment>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanningPage;
