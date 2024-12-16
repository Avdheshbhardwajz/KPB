import Category from "../models/catogary";

// Controller for handling categories
const CategoryController = {

    /** 
     * @desc    Get all categories
     * @route   GET /api/categories
     * @access  Public
     */
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json({ success: true, data: categories });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Get a single category by ID
     * @route   GET /api/categories/:id
     * @access  Public
     */
    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);

            if (!category) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }

            res.status(200).json({ success: true, data: category });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Create a new category
     * @route   POST /api/categories
     * @access  Public
     */
    createCategory: async (req, res) => {
        try {
            const { name, description } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }

            const newCategory = new Category({ name, description });
            const savedCategory = await newCategory.save();

            res.status(201).json({ success: true, data: savedCategory });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Update an existing category
     * @route   PUT /api/categories/:id
     * @access  Public
     */
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const updatedData = { name, description, updatedAt: Date.now() };

            const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

            if (!updatedCategory) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }

            res.status(200).json({ success: true, data: updatedCategory });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Delete a category by ID
     * @route   DELETE /api/categories/:id
     * @access  Public
     */
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await Category.findByIdAndDelete(id);

            if (!deletedCategory) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }

            res.status(200).json({ success: true, message: 'Category deleted successfully', data: deletedCategory });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

};

export default CategoryController;
