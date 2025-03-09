import React from 'react';
import { render, screen } from '@testing-library/react';
import PlanningPage from './../pages/PlanningPage';
import { DataContext } from '../contexts/DataContext';

describe('PlanningPage', () => {
  const contextValue = {
    stores: [
      { id: 'ST035', name: 'Test Store', city: 'City1', state: 'State1' },
    ],
    setStores: jest.fn(),
    skus: [
      { id: 'sku1', name: 'Test SKU', price: 10, cost: 5 },
    ],
    setSKUs: jest.fn(),
    planningData: [
      { storeId: 'ST035', skuId: 'sku1', week: 'Wk 01', salesUnits: 5 },
      { storeId: 'ST035', skuId: 'sku1', week: 'Wk 02', salesUnits: 10 },
    ],
    setPlanningData: jest.fn(),
    weeks: ['Wk 01', 'Wk 02'],
  };

  it('renders the Planning heading and week columns', () => {
    render(
      <DataContext.Provider value={contextValue}>
        <PlanningPage />
      </DataContext.Provider>
    );
    expect(screen.getByText(/Planning/i)).toBeInTheDocument();
    // Check for week headers
    expect(screen.getByText('Wk 01')).toBeInTheDocument();
    expect(screen.getByText('Wk 02')).toBeInTheDocument();
  });
});
