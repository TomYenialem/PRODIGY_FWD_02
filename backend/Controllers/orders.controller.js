
const orderServices = require("../Services/orders.service");

const sendOrdersRequest = async (req, res) => {
  try {
    const order = req.body;
    console.log(req.body);
    const result = await orderServices.sendOrders(order);
    console.log(result);
    if (!result) {
      return res.status(400).json({ error: "Failed to send orders" });
    }
    res.status(200).json({ message: "Orders sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllOrdersInfo = async (req, res) => {
  try {
    const orders = await orderServices.getAllOrders();
    if (!orders) {
      return res.status(400).json({ error: "Failed to get orders" });
    } else {
      return res.status(200).json({
        data: orders,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
const editOrdersInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const order = req.body;

    const result = await orderServices.editOrders(id, order);
    if (!result) {
      return res.status(400).json({ error: "Failed to edit orders" });
    }
    res.status(200).json({ message: "Orders edited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
const getsingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderServices.getSingleOrderInfo(id);

    console.log(order); // Debugging: check the structure of `order`

    if (!order || order.length === 0) {
      return res.status(400).json({ error: "Failed to get order" });
    }

    // Check if the order is an array or a single object
    const parsedOrder = Array.isArray(order)
      ? order.map((o) => ({
          ...o,
          order_services:
            typeof o.order_services === "string"
              ? JSON.parse(o.order_services) || []
              : o.order_services || [], // Use existing array if already parsed
        }))
      : {
          ...order,
          order_services:
            typeof order.order_services === "string"
              ? JSON.parse(order.order_services) || []
              : order.order_services || [],
        };

    return res.status(200).json({
      data: parsedOrder,
    });
  } catch (error) {
    console.error("Error in getsingleOrder:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const getsinglecustomersOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderServices.getAllOrdersPerCustomer(id);
    if (!order) {
      return res.status(400).json({ error: "Failed to get order" });
    } else {
      return res.status(200).json({
        data: order,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  sendOrdersRequest,
  getAllOrdersInfo,
  editOrdersInfo,
  getsingleOrder,
  getsinglecustomersOrder,
};
