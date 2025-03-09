import React, { useContext, useState } from 'react';
import { Store } from '../types';
import { DataContext } from '../contexts/DataContext';

const StoresPage: React.FC = () => {
    const dataContext = useContext(DataContext);
    const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
    const [editingStore, setEditingStore] = useState<Store>({
        id: '',
        name: '',
        city: '',
        state: '',
    });
    const [newStore, setNewStore] = useState<Store>({
        id: '',
        name: '',
        city: '',
        state: '',
    });
    const [showNewStoreModal, setShowNewStoreModal] = useState(false);

    if (!dataContext) return <div>Loading...</div>;
    const { stores, setStores } = dataContext;

    const handleEdit = (store: Store) => {
        setEditingStoreId(store.id);
        setEditingStore({ ...store });
    };

    const handleSave = () => {
        setStores((prev) =>
            prev.map((s) => (s.id === editingStoreId ? editingStore : s))
        );
        setEditingStoreId(null);
    };

    const handleDelete = (storeId: string) => {
        setStores((prev) => prev.filter((s) => s.id !== storeId));
    };

    const handleAddNew = () => {
        if (!newStore.name.trim() || !newStore.city.trim() || !newStore.state.trim())
            return;
        const generatedId = `ST${Math.floor(Math.random() * 10000)}`;
        setStores((prev) => [...prev, { ...newStore, id: generatedId }]);
        setNewStore({ id: '', name: '', city: '', state: '' });
        setShowNewStoreModal(false);
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm relative">
            <h2 className="text-xl font-bold mb-4">Store</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-2 w-16">S.No</th>
                        <th className="py-2 px-2">Store</th>
                        <th className="py-2 px-2">City</th>
                        <th className="py-2 px-2">State</th>
                        <th className="py-2 px-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => {
                        const isEditing = editingStoreId === store.id;
                        return (
                            <tr key={store.id} className="border-b">
                                <td className="py-2 px-2">{index + 1}</td>
                                <td className="py-2 px-2">
                                    {isEditing ? (
                                        <input
                                            className="border px-2 py-1 w-full"
                                            value={editingStore.name}
                                            onChange={(e) =>
                                                setEditingStore({ ...editingStore, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        store.name
                                    )}
                                </td>
                                <td className="py-2 px-2">
                                    {isEditing ? (
                                        <input
                                            className="border px-2 py-1 w-full"
                                            value={editingStore.city}
                                            onChange={(e) =>
                                                setEditingStore({ ...editingStore, city: e.target.value })
                                            }
                                        />
                                    ) : (
                                        store.city
                                    )}
                                </td>
                                <td className="py-2 px-2">
                                    {isEditing ? (
                                        <input
                                            className="border px-2 py-1 w-full"
                                            value={editingStore.state}
                                            onChange={(e) =>
                                                setEditingStore({ ...editingStore, state: e.target.value })
                                            }
                                        />
                                    ) : (
                                        store.state
                                    )}
                                </td>
                                <td className="py-2 px-2">
                                    {isEditing ? (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                            onClick={() => handleEdit(store)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(store.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Floating button to open the "New Store" modal */}
            <div className="fixed bottom-6 left-6">
                <button
                    className="bg-orange-500 text-white font-bold px-4 py-2 rounded-full shadow-lg"
                    onClick={() => setShowNewStoreModal(true)}
                >
                    NEW STORE
                </button>
            </div>

            {/* Modal for adding a new store */}
            {showNewStoreModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h3 className="text-lg font-bold mb-4">Add New Store</h3>
                        <input
                            type="text"
                            placeholder="Store Name"
                            value={newStore.name}
                            onChange={(e) =>
                                setNewStore({ ...newStore, name: e.target.value })
                            }
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={newStore.city}
                            onChange={(e) =>
                                setNewStore({ ...newStore, city: e.target.value })
                            }
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={newStore.state}
                            onChange={(e) =>
                                setNewStore({ ...newStore, state: e.target.value })
                            }
                            className="border p-2 w-full mb-2"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-800 px-3 py-1 rounded mr-2"
                                onClick={() => setShowNewStoreModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={handleAddNew}
                            >
                                Add Store
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoresPage;
