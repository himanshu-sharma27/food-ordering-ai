import { useEffect, useState } from "react";

function MenuForm({ initialData, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        is_available: true,
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6">
                    {initialData ? "Edit Menu Item" : "Add Menu Item"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border w-full p-3 rounded"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="border w-full p-3 rounded"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="border w-full p-3 rounded"
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        className="border w-full p-3 rounded"
                        required
                    />

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_available"
                            checked={form.is_available}
                            onChange={handleChange}
                        />
                        Available
                    </label>

                    <div className="flex gap-4 justify-end">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2 rounded bg-gray-400 text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded bg-green-600 text-white"
                        >
                            Save
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default MenuForm;