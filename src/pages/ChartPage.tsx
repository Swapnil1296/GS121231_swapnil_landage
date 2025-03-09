import React, { useContext, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { DataContext } from './../contexts/DataContext';
import {
    calculateSalesDollars,
    calculateGMDollars,
    calculateGMPercent
} from '../utils/calculations';

interface ChartData {
    week: string;
    totalSalesDollars: number;
    totalGMDollars: number;
    gmPercent: number;
}

const ChartPage: React.FC = () => {
    const dataContext = useContext(DataContext);
    const svgRef = useRef<SVGSVGElement>(null);
    const [selectedStore, setSelectedStore] = useState<string>('');
    const [chartData, setChartData] = useState<ChartData[]>([]);

    if (!dataContext) return <div>Loading...</div>;
    const { stores, skus, planningData, weeks } = dataContext;

    useEffect(() => {
        if (stores.length > 0 && !selectedStore) {
            setSelectedStore(stores[0].id);
        }
    }, [stores, selectedStore]);

    // Compute aggregated GM Dollars & GM% for each week for the selected store
    useEffect(() => {
        if (!selectedStore) return;
        const data: ChartData[] = weeks.map((week) => {
            const entries = planningData.filter(
                (p) => p.storeId === selectedStore && p.week === week
            );
            let totalSalesDollars = 0;
            let totalGMDollars = 0;
            entries.forEach((entry) => {
                const sku = skus.find((s) => s.id === entry.skuId);
                if (sku) {
                    const salesD = calculateSalesDollars(entry.salesUnits, sku.price);
                    const gmD = calculateGMDollars(salesD, entry.salesUnits, sku.cost);
                    totalSalesDollars += salesD;
                    totalGMDollars += gmD;
                }
            });
            const gmPercent = calculateGMPercent(totalGMDollars, totalSalesDollars);
            return { week, totalSalesDollars, totalGMDollars, gmPercent };
        });
        setChartData(data);
    }, [selectedStore, weeks, planningData, skus]);

    // Render the D3 chart
    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 900;
        const height = 400;
        const margin = { top: 50, right: 50, bottom: 40, left: 60 };

        svg.attr('width', width).attr('height', height);

        // X scale
        const x = d3
            .scaleBand()
            .domain(chartData.map((d) => d.week))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        // Y scale (left) for GM Dollars
        const yLeft = d3
            .scaleLinear()
            .domain([0, d3.max(chartData, (d) => d.totalGMDollars) || 100])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Y scale (right) for GM %
        const yRight = d3
            .scaleLinear()
            .domain([0, 1])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // X Axis
        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Y Axis (left)
        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yLeft).tickFormat((d) => `$${d}` as any));

        // Y Axis (right)
        svg
            .append('g')
            .attr('transform', `translate(${width - margin.right},0)`)
            .call(
                d3
                    .axisRight(yRight)
                    .tickFormat((d) => (d as number * 100).toFixed(0) + '%')
            );

        // Bars for GM Dollars
        svg
            .selectAll('.bar')
            .data(chartData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => (x(d.week) ?? 0))
            .attr('y', (d) => yLeft(d.totalGMDollars))
            .attr('width', x.bandwidth())
            .attr('height', (d) => height - margin.bottom - yLeft(d.totalGMDollars))
            .attr('fill', '#4098FF')
            .attr('opacity', 0.8);

        // Line for GM%
        const line = d3
            .line<ChartData>()
            .x((d) => (x(d.week) ?? 0) + x.bandwidth() / 2)
            .y((d) => yRight(d.gmPercent));

        svg
            .append('path')
            .datum(chartData)
            .attr('fill', 'none')
            .attr('stroke', '#FFA500')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Circles for each GM% data point
        svg
            .selectAll('.dot')
            .data(chartData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (d) => (x(d.week) ?? 0) + x.bandwidth() / 2)
            .attr('cy', (d) => yRight(d.gmPercent))
            .attr('r', 4)
            .attr('fill', '#FFA500');

        // Title
        svg
            .append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', '#FFF')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .text('Gross Margin');
    }, [chartData]);

    return (
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#333' }}>
            <div className="flex items-center justify-between mb-2 ">
                <div className="text-gray-600 font-semibold  ">
                    Select Store:
                    <select
                        className="ml-2 border px-2 py-1 rounded  "
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        {stores.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default ChartPage;
