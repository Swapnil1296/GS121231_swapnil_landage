import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StoresPage from './../pages/StoresPage';
import { DataContext } from './../contexts/DataContext';
import { sampleStores } from '../data/sampleData';

describe('StoresPage', () => {
    const setStores = jest.fn();
    const contextValue = {
        stores: sampleStores,
        setStores,
        skus: [],
        setSKUs: jest.fn(),
        planningData: [],
        setPlanningData: jest.fn(),
        weeks: [],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the heading, table, and store names', () => {
        render(
            <DataContext.Provider value={contextValue}>
                <StoresPage />
            </DataContext.Provider>
        );
        const heading = screen.getByRole('heading', { name: 'Store' });
        expect(heading).toBeInTheDocument();

        // Check that the table is rendered
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        // Verify that each store from sampleStores is rendered
        sampleStores.forEach((store) => {
            expect(screen.getByText(store.name)).toBeInTheDocument();
        });
    });

    it('opens the new store modal when NEW STORE button is clicked', () => {
        render(
            <DataContext.Provider value={contextValue}>
                <StoresPage />
            </DataContext.Provider>
        );
        const newStoreButton = screen.getByRole('button', { name: /NEW STORE/i });
        fireEvent.click(newStoreButton);

        // Check that the modal opens by verifying it has role "dialog"
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        // Check for the modal heading
        expect(screen.getByRole('heading', { name: /Add New Store/i })).toBeInTheDocument();
    });

    it('adds a new store when the modal form is submitted', () => {
        render(
            <DataContext.Provider value={contextValue}>
                <StoresPage />
            </DataContext.Provider>
        );
        const newStoreButton = screen.getByRole('button', { name: /NEW STORE/i });
        fireEvent.click(newStoreButton);

        // Fill out the modal form fields using placeholder texts
        const nameInput = screen.getByPlaceholderText('Store Name');
        const cityInput = screen.getByPlaceholderText('City');
        const stateInput = screen.getByPlaceholderText('State');

        fireEvent.change(nameInput, { target: { value: 'Test Store' } });
        fireEvent.change(cityInput, { target: { value: 'Test City' } });
        fireEvent.change(stateInput, { target: { value: 'TS' } });

        // Click the "Add Store" button in the modal
        const addButton = screen.getByRole('button', { name: /Add Store/i });
        fireEvent.click(addButton);

        expect(setStores).toHaveBeenCalled();
    });

    it('allows editing a store and saving changes', () => {
        render(
            <DataContext.Provider value={contextValue}>
                <StoresPage />
            </DataContext.Provider>
        );
        // Find the Edit buttons; there should be one per row.
        const editButtons = screen.getAllByRole('button', { name: /Edit/i });
        expect(editButtons.length).toBeGreaterThan(0);
        // Click the first Edit button.
        fireEvent.click(editButtons[0]);

        const nameInput = screen.getByDisplayValue(sampleStores[0].name);
        expect(nameInput).toBeInTheDocument();

        // Change the value of the input.
        fireEvent.change(nameInput, { target: { value: 'Updated Store Name' } });

        // Click the Save button.
        const saveButton = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveButton);

        expect(setStores).toHaveBeenCalled();
    });

    it('allows deleting a store', () => {
        render(
            <DataContext.Provider value={contextValue}>
                <StoresPage />
            </DataContext.Provider>
        );
        // Find the Delete buttons.
        const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
        expect(deleteButtons.length).toBeGreaterThan(0);

        // Click the first Delete button.
        fireEvent.click(deleteButtons[0]);

        expect(setStores).toHaveBeenCalled();
    });
});
