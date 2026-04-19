const Order = require("../models/Order");
const Table = require("../models/Table");

exports.createOrder = async (req, res) => {
    try{
        const {table, items, totalAmount} = req.body;

//check existing order for the table
 let existingOrder = await Order.findOne({
    table: table,
    status: { $ne: "Paid" }
 });
 
 if(existingOrder){
   existingOrder.items.push(...items);
            existingOrder.totalAmount += totalAmount;
            await existingOrder.save();

            return res.status(200).json({ success: true, message: "Order updated successfully", order: existingOrder });    
 }

        const order = await Order.create({
            table,
            items,
            totalAmount,
            createdBy: req.user._id
        });

        //update table status to occupied
await Table.findByIdAndUpdate(table, { status: "occupied" });


        res.status(201).json({ success: true, message: "Order created successfully", order });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};







exports.getOrders = async (req, res) => {
    try{
       // Change find() to only look for orders that are NOT "Paid"
        const orders = await Order.find({ status: { $ne: "Paid" } })
            .populate("table")
            .populate("items.menuItem")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



//payment final

exports.finalizePayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        // 1. Find order and update status
        const order = await Order.findByIdAndUpdate(orderId, { status: 'Paid' });
        
        if (!order) return res.status(440).json({ success: false, message: "Order not found" });

        // 2. Free the Table linked to this order
        await Table.findByIdAndUpdate(order.table, { status: 'available' });

        res.status(200).json({ success: true, message: "Table is now free" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};