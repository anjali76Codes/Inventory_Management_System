import React, { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../services'; // Ensure these functions are correctly defined in your services

function InventoryPage() {
  const [products, setProducts] = useState([]); // Initial state is an empty array
  const [name, setName] = useState('');
  const [category, setCategory] = useState(''); // Store selected category
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from the API
        const fetchedProducts = await getProducts();

        // Log the fetched data for debugging purposes
        console.log("Fetched Products:", fetchedProducts);

        // Ensure the response is an array before setting the state
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to an empty array in case of error
      }
    };

    fetchData(); // Call fetchData on component mount
  }, []); // Empty dependency array means this effect runs once after the first render

  // Handle form submission to create a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Validate category selection before submitting
    if (!category) {
      alert('Please select a category!');
      return;
    }

    const productData = {
      name,
      category_id: category, // Use the selected category
      description,
      price: parseFloat(price),
      quantity_in_stock: parseInt(quantity),
      created_at: new Date().toISOString(),
    };

    try {
      const newProduct = await createProduct(productData, category);

      if (newProduct) {
        // Add the new product to the existing list
        setProducts([...products, newProduct]);
        // Clear the form fields
        setName('');
        setCategory('');
        setDescription('');
        setPrice('');
        setQuantity('');
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Inventory Management
      </h1>

      {/* Add Product Form */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Product</h2>
        <form onSubmit={handleAddProduct}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
              <option value="toys">Toys</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Products List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products List</h2>
        <ul className="space-y-4">
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <li key={product.$id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-700">{product.name}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-blue-600">Price: ${product.price}</p>
                <p className="text-green-600">Stock: {product.quantity_in_stock}</p>
              </li>
            ))
          ) : (
            <p>No products available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InventoryPage;
