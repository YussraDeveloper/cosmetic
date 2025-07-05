const pool = require('../db');


const createProduct = async (req, res) => {
  const { name, description, price, image_url, category } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, image_url, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, image_url, category } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name=$1, description=$2, price=$3, image=$4, category=$5 WHERE id=$6 RETURNING *',
      [name, description, price, image_url, category, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};


const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
