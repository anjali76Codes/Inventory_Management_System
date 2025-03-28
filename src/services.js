import { databases } from './appwrite/config';

// Define Database and Collection IDs
const DATABASE_ID = '67e639190027766c5b32'; // Database ID (Ensure this matches your Appwrite database ID)
const PRODUCTS_COLLECTION_ID = '67e6394c00109c224448'; // Collection ID for products
const CATEGORIES_COLLECTION_ID = '67e63c06002b30bec4ac'; // Collection ID for categories

// Get all products
export const getProducts = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
    return response.documents; // Return the list of products
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array in case of error
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, CATEGORIES_COLLECTION_ID);
    return response.documents; // Return the list of categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return an empty array in case of error
  }
};

// Add a new category (if it doesn't exist already)
export const createCategory = async (categoryName) => {
  try {
    // First, check if the category already exists
    const categories = await getCategories();
    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    // If it exists, return it; otherwise, create a new one
    if (existingCategory) {
      return existingCategory; // Return the existing category
    }

    // Create a new category if it doesn't exist
    const categoryData = {
      name: categoryName,
      created_at: new Date().toISOString(), // Timestamp of creation
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      CATEGORIES_COLLECTION_ID,
      'unique()', // Auto-generate a unique ID
      categoryData
    );

    return response; // Return the created category document
  } catch (error) {
    console.error('Error creating category:', error);
    return null; // Return null in case of error
  }
};

// Add a new product with the selected category
export const createProduct = async (productData, categoryName) => {
  try {
    // If the category does not exist, create it
    const category = await createCategory(categoryName);

    if (!category) {
      console.error('Error creating category');
      return null; // Return null if category creation fails
    }

    // Once the category is added (either existing or new), proceed with the product creation
    const productDataWithCategory = {
      ...productData,
      category_id: category.$id, // Add the category ID to the product data
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      'unique()', // Auto-generate a unique ID
      productDataWithCategory
    );

    return response; // Return the created product document
  } catch (error) {
    console.error('Error creating product:', error);
    return null; // Return null in case of error
  }
};
