const pool = require('../db');

const createOrder = async (req, res) => {
  const { user_id, items, total } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING id',
      [user_id, total, 'pending']
    );
    const orderId = result.rows[0].id;

    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    console.error("Order error:", err.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT o.id AS order_id, u.username, o.total, o.status, o.time
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.id DESC
      `);      
    res.json(result.rows);
  } catch (err) {
    console.error("Get orders error:", err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getAllOrders
};
