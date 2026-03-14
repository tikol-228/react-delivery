import { useEffect, useState, useCallback } from "react";
import { OrderDto, fetchOrders, updateOrder, deleteOrder } from "@/lib/orderApi";
import { toast } from "@/hooks/use-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Could not load orders", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markComplete = async (id: number) => {
    try {
      const updated = await updateOrder(id, { status: "completed" });
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      toast({ title: "Updated", description: `Order #${id} marked complete.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Could not update", variant: "destructive" });
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast({ title: "Removed", description: `Order #${id} deleted.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Could not delete", variant: "destructive" });
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <table className="w-full table-auto border border-border">
          <thead>
            <tr className="bg-secondary text-left">
              <th className="p-3">#</th>
              <th className="p-3">Type</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t hover:bg-secondary/30 transition-colors">
                <td className="p-3 font-medium">{o.id}</td>
                <td className="p-3">{o.type}</td>
                <td className="p-3">{o.items.length}</td>
                <td className="p-3 font-semibold">${o.total.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                    o.status === "completed" 
                      ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                      : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3 space-x-3">
                  {o.status !== "completed" && (
                    <button
                      onClick={() => markComplete(o.id)}
                      className="text-sm text-primary"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => remove(o.id)}
                    className="text-sm text-destructive"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
