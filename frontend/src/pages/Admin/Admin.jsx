import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

        } catch (err) {

            console.error(err);

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

            await api.patch(`/orders/${id}`, { status });

            toast.success("Order updated");

            fetchOrders();

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

    return (

        <div className="max-w-6xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-5xl font-bold">

                    Admin Dashboard

                </h1>

                <button
                    onClick={fetchOrders}
                    className="bg-orange-500 text-white px-5 py-3 rounded-lg"
                >
                    Refresh
                </button>

            </div>

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

        </div>

    );

}

export default Admin;