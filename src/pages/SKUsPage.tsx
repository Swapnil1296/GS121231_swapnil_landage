import React, { useContext, useState } from 'react';
import { SKU } from '../types';
import { DataContext } from '../contexts/DataContext';

const SKUsPage: React.FC = () => {
    const dataContext = useContext(DataContext);
    const [newSKU, setNewSKU] = useState({ name: '', price: 0, cost: 0 });
    const [editingSKUId, setEditingSKUId] = useState<string | null>(null);
    const [editingSKU, setEditingSKU] = useState({ name: '', price: 0, cost: 0 });

    if (!dataContext) return <div>Loading...</div>;

    const { skus, setSKUs } = dataContext;

    const addSKU = () => {
        if (newSKU.name.trim() === '') return;
        const sku: SKU = { id: `sku-${Date.now()}`, name: newSKU.name, price: newSKU.price, cost: newSKU.cost };
        setSKUs([...skus, sku]);
        setNewSKU({ name: '', price: 0, cost: 0 });
    };

    const deleteSKU = (id: string) => {
        setSKUs(skus.filter(sku => sku.id !== id));
    };

    const startEditing = (sku: SKU) => {
        setEditingSKUId(sku.id);
        setEditingSKU({ name: sku.name, price: sku.price, cost: sku.cost });
    };

    const saveEdit = (id: string) => {
        setSKUs(skus.map(sku => sku.id === id ? { ...sku, ...editingSKU } : sku));
        setEditingSKUId(null);
        setEditingSKU({ name: '', price: 0, cost: 0 });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">SKUs</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newSKU.name}
                    onChange={e => setNewSKU({ ...newSKU, name: e.target.value })}
                    placeholder="SKU Name"
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    value={newSKU.price}
                    onChange={e => setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })}
                    placeholder="Price"
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    value={newSKU.cost}
                    onChange={e => setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })}
                    placeholder="Cost"
                    className="border p-2 mr-2"
                />
                <button onClick={addSKU} className="bg-blue-500 text-white px-3 py-2 rounded">
                    Add SKU
                </button>
            </div>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Cost</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skus.map(sku => (
                        <tr key={sku.id}>
                            <td className="border p-2">
                                {editingSKUId === sku.id ? (
                                    <input
                                        type="text"
                                        value={editingSKU.name}
                                        onChange={e => setEditingSKU({ ...editingSKU, name: e.target.value })}
                                        className="border p-1"
                                    />
                                ) : (
                                    sku.name
                                )}
                            </td>
                            <td className="border p-2">
                                {editingSKUId === sku.id ? (
                                    <input
                                        type="number"
                                        value={editingSKU.price}
                                        onChange={e => setEditingSKU({ ...editingSKU, price: parseFloat(e.target.value) })}
                                        className="border p-1"
                                    />
                                ) : (
                                    sku.price.toFixed(2)
                                )}
                            </td>
                            <td className="border p-2">
                                {editingSKUId === sku.id ? (
                                    <input
                                        type="number"
                                        value={editingSKU.cost}
                                        onChange={e => setEditingSKU({ ...editingSKU, cost: parseFloat(e.target.value) })}
                                        className="border p-1"
                                    />
                                ) : (
                                    sku.cost.toFixed(2)
                                )}
                            </td>
                            <td className="border p-2">
                                {editingSKUId === sku.id ? (
                                    <button onClick={() => saveEdit(sku.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => startEditing(sku)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => deleteSKU(sku.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SKUsPage;
