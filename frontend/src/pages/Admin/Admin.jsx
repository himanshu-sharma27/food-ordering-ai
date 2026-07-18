import { useEffect, useState } from "react";
import api from "../../services/api";

function Admin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    async function fetchOrders() {
        try {
            setLoading(true);

            const res = await api.get("/orders/");

            setOrders(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    async function updateStatus(id, status) {
        try {
            setUpdating(true);

            await api.patch(`/orders/${id}`, {
                status,
            });

            await fetchOrders();
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return (
            <h1 className="text-center mt-20 text-2xl font-semibold">
                Loading Orders...
            </h1>
        );
    }

    if (orders.length === 0) {
        return (
            <h1 className="text-center mt-20 text-2xl font-semibold">
                No Orders Yet
            </h1>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Admin Dashboard
                </h1>

                <button
                    onClick={fetchOrders}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
                >
                    Refresh
                </button>

            </div>

            <div className="space-y-6">

                {orders.map((order) => (

                    <div
                        key={order.id}
                        className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition"
                    >

                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">

                            <div>

                                <h2 className="text-2xl font-semibold">
                                    {order.customer_name}
                                </h2>

                                <p className="text-gray-600 mt-1">
                                    Order ID: #{order.id}
                                </p>

                                <p className="text-xl font-bold text-orange-500 mt-2">
                                    ₹{order.total_price}
                                </p>

                                <div className="mt-3">

                                    <span
    className={`px-3 py-1 rounded-full text-white text-sm font-medium
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

                            </div>

                            <select
                        value={order.status}
                        disabled={updating}
    onChange={(e) =>
        updateStatus(order.id, e.target.value)
    }
    className="border rounded-lg px-4 py-2"
>
    <option value="PLACED">PLACED</option>

    <option value="CONFIRMED">CONFIRMED</option>

    <option value="PREPARING">PREPARING</option>

    <option value="READY">READY</option>

    <option value="PICKED_UP">PICKED UP</option>
</select>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Admin;