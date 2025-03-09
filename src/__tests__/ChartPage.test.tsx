import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataContext } from '../contexts/DataContext';
import ChartPage from '../pages/ChartPage';

jest.mock('d3', () => {
    // Create a mock bandwidth function
    const bandwidthFn = jest.fn().mockReturnValue(30);

    // Create a mock scale band function that returns an object with a bandwidth method
    const mockScaleBand = jest.fn().mockReturnValue({
        domain: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        padding: jest.fn().mockReturnThis(),
        bandwidth: bandwidthFn,
        call: function (value: any) {
            return 0;
        }
    });

    return {
        select: jest.fn().mockReturnValue({
            selectAll: jest.fn().mockReturnThis(),
            remove: jest.fn().mockReturnThis(),
            attr: jest.fn().mockReturnThis(),
            append: jest.fn().mockReturnValue({
                attr: jest.fn().mockReturnThis(),
                style: jest.fn().mockReturnThis(),
                call: jest.fn().mockReturnThis(),
                datum: jest.fn().mockReturnThis(),
                data: jest.fn().mockReturnValue({
                    enter: jest.fn().mockReturnValue({
                        append: jest.fn().mockReturnValue({
                            attr: jest.fn().mockReturnThis(),
                            style: jest.fn().mockReturnThis(),
                            text: jest.fn().mockReturnThis()
                        })
                    })
                }),
                text: jest.fn().mockReturnThis()
            }),
            call: jest.fn().mockReturnThis(),
            data: jest.fn().mockReturnThis(),
            enter: jest.fn().mockReturnThis()
        }),
        scaleBand: mockScaleBand,
        scaleLinear: jest.fn().mockReturnValue({
            domain: jest.fn().mockReturnThis(),
            nice: jest.fn().mockReturnThis(),
            range: jest.fn().mockReturnValue((val: number) => val)
        }),
        axisBottom: jest.fn(),
        axisLeft: jest.fn().mockReturnValue({
            tickFormat: jest.fn().mockReturnThis()
        }),
        axisRight: jest.fn().mockReturnValue({
            tickFormat: jest.fn().mockReturnThis()
        }),
        line: jest.fn().mockReturnValue({
            x: jest.fn().mockReturnThis(),
            y: jest.fn().mockReturnThis()
        }),
        max: jest.fn().mockReturnValue(100)
    };
});

// Mock the calculation utilities
jest.mock('../utils/calculations', () => ({
    calculateSalesDollars: jest.fn().mockReturnValue(100),
    calculateGMDollars: jest.fn().mockReturnValue(50),
    calculateGMPercent: jest.fn().mockReturnValue(0.5)
}));

describe('ChartPage', () => {
    const mockContextValue = {
        stores: [
            { id: 'ST035', name: 'Test Store', city: 'City1', state: 'State1' },
            { id: 'ST036', name: 'Another Store', city: 'City2', state: 'State2' }
        ],
        setStores: jest.fn(),
        skus: [
            { id: 'sku1', name: 'Test SKU', price: 10, cost: 5 },
            { id: 'sku2', name: 'Another SKU', price: 20, cost: 10 }
        ],
        setSKUs: jest.fn(),
        planningData: [
            { storeId: 'ST035', skuId: 'sku1', week: 'Wk 01', salesUnits: 10 },
            { storeId: 'ST035', skuId: 'sku1', week: 'Wk 02', salesUnits: 20 },
            { storeId: 'ST036', skuId: 'sku2', week: 'Wk 01', salesUnits: 15 }
        ],
        setPlanningData: jest.fn(),
        weeks: ['Wk 01', 'Wk 02'],
    };

    it('renders ChartPage with store selector', () => {
        render(
            <DataContext.Provider value={mockContextValue}>
                <ChartPage />
            </DataContext.Provider>
        );

        // Check if "Select Store" text is visible
        expect(screen.getByText(/Select Store:/i)).toBeInTheDocument();

        // Check if the svg is rendered
        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('renders with first store selected by default', () => {
        render(
            <DataContext.Provider value={mockContextValue}>
                <ChartPage />
            </DataContext.Provider>
        );

        // Get the select element and check default value
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue('ST035');
    });
});