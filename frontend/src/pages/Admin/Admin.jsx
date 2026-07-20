import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import MenuForm from "../../components/MenuForm";

function Admin() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [dashboard, setDashboard] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    async function fetchOrders() {

        try {

            setLoading(true);

            const res = await api.get("/orders/");

            setOrders(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    async function fetchDashboard() {
    try {
        const res = await api.get("/dashboard/");
        setDashboard(res.data);
    } catch (err) {
        console.error(err);
    }
}

    async function fetchMenu() {

    try {

        const res = await api.get("/menu/");

        setMenuItems(res.data);

    } catch (err) {

        console.error(err);

    }

}

    useEffect(() => {

    fetchOrders();

    fetchDashboard();

    fetchMenu();

}, []);

    async function updateStatus(id, status) {

        try {

            setUpdating(true);

            await api.patch(`/orders/${id}`, { status });

            toast.success("Order updated");

            fetchOrders();
            await fetchDashboard();

        } catch (err) {

            console.error(err);

            toast.error("Update failed");

        } finally {

            setUpdating(false);

        }

    }

    if (loading) {

        return (

            <h1 className="text-center text-3xl mt-20">

                Loading...

            </h1>

        );

    }

    async function deleteMenu(id) {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/menu/${id}`);

        toast.success("Menu item deleted");

        fetchMenu();

    } catch (err) {

        console.error(err);

        toast.error("Delete failed");

    }

}

    async function toggleAvailability(id) {

    try {

        await api.patch(`/menu/${id}/availability`);

        toast.success("Availability updated");

        fetchMenu();

    } catch (err) {

        console.error(err);

        toast.error("Update failed");

    }

}

    async function handleMenuSubmit(data) {
    try {
        if (editingItem) {
            await api.put(`/menu/${editingItem.id}`, data);
            toast.success("Menu item updated");
        } else {
            await api.post("/menu/", data);
            toast.success("Menu item added");
        }

        setShowForm(false);
        setEditingItem(null);
        fetchMenu();
    } catch (err) {
        console.error(err);
        toast.error("Operation failed");
    }
}
    

    return (

        <div className="max-w-6xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-5xl font-bold">

                    Admin Dashboard

                </h1>

                <button
                    onClick={() => {

    fetchOrders();

    fetchDashboard();

    fetchMenu();

}}
                    className="bg-orange-500 text-white px-5 py-3 rounded-lg"
                >
                    Refresh
                </button>

            </div>

            {dashboard && (

<div className="grid md:grid-cols-3 gap-6 mb-10">

    <div className="bg-white rounded-xl shadow-lg p-6">

        <p className="text-gray-500">
            Total Revenue
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₹{dashboard.today_revenue}
        </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

        <p className="text-gray-500">
            Total Orders
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard.total_orders}
        </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

        <p className="text-gray-500">
            Popular Item
        </p>

        <h2 className="text-2xl font-bold text-orange-500 mt-2">

            {
                dashboard.popular_items.length
                ?
                dashboard.popular_items[0].name
                :
                "No Orders"
            }

        </h2>

    </div>

</div>

)}

<div className="bg-white shadow-lg rounded-xl p-6 mb-10">

    <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
            Menu Management
        </h2>

        <button
    onClick={() => {
        setEditingItem(null);
        setShowForm(true);
    }}
    className="bg-green-500 text-white px-5 py-3 rounded-lg"
>
    + Add Item
</button>

    </div>

    <div className="space-y-4">

        {menuItems.map(item => (

            <div
                key={item.id}
                className="border rounded-lg p-5 flex justify-between items-center"
            >

                <div>

                    <h3 className="text-xl font-bold">

                        {item.name}

                    </h3>

                    <p className="text-gray-500">

                        ₹{item.price}

                    </p>

                    <p>

                        {item.category}

                    </p>

                </div>

                <div className="flex gap-3">

                    <button
    onClick={() => {
        setEditingItem(item);
        setShowForm(true);
    }}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
    Edit
</button>

                    <button
                onClick={() => deleteMenu(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                    Delete
                    </button>

                    <button
    onClick={() => toggleAvailability(item.id)}
    className={`px-4 py-2 rounded text-white
        ${
            item.is_available
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
        }`}
>
    {item.is_available ? "Disable" : "Enable"}
</button>

                </div>

            </div>

        ))}

    </div>

</div>

{dashboard && (

<div className="bg-white shadow-lg rounded-xl p-6 mb-10">

    <h2 className="text-2xl font-bold mb-4">
        Orders by Status
    </h2>

    <div className="grid md:grid-cols-5 gap-4">

        {
            Object.entries(dashboard.orders_by_status).map(([status,count])=>(
                <div
                    key={status}
                    className="border rounded-lg p-4 text-center"
                >

                    <h3 className="font-semibold">
                        {status.replace("OrderStatus.","")}
                    </h3>

                    <p className="text-3xl font-bold text-orange-500 mt-2">
                        {count}
                    </p>

                </div>
            ))
        }

    </div>

</div>

)}

            {orders.length === 0 ? (

                <h2 className="text-center text-2xl">

                    No Orders Yet

                </h2>

            ) : (

                <div className="space-y-6">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            className="bg-white border rounded-xl shadow-lg p-6 flex flex-col lg:flex-row justify-between lg:items-center"
                        >

                            <div>

                                <h2 className="text-3xl font-bold">

                                    {order.customer_name}

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Order #{order.id}

                                </p>

                                <p className="text-orange-500 text-2xl font-bold mt-2">

                                    ₹{order.total_price}

                                </p>

                                <span
                                    className={`inline-block mt-4 px-4 py-2 rounded-full text-white
                                    ${
                                        order.status === "PLACED"
                                            ? "bg-blue-500"
                                            : order.status === "CONFIRMED"
                                            ? "bg-cyan-500"
                                            : order.status === "PREPARING"
                                            ? "bg-yellow-500"
                                            : order.status === "READY"
                                            ? "bg-purple-500"
                                            : "bg-green-500"
                                    }`}
                                >

                                    {order.status.replaceAll("_", " ")}

                                </span>

                            </div>

                            <select
                                value={order.status}
                                disabled={updating}
                                onChange={(e) =>
                                    updateStatus(order.id, e.target.value)
                                }
                                className="border rounded-lg px-5 py-3 mt-6 lg:mt-0"
                            >

                                <option value="PLACED">PLACED</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="PREPARING">PREPARING</option>
                                <option value="READY">READY</option>
                                <option value="PICKED_UP">PICKED UP</option>

                            </select>

                        </div>

                    ))}

                </div>

            )}
            {showForm && (
    <MenuForm
        initialData={editingItem}
        onSubmit={handleMenuSubmit}
        onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
        }}
    />
)}

        </div>

    );

}

export default Admin;