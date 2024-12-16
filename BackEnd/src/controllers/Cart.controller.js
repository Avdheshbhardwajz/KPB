import Cart from "../models/Cart.model";

const CartController = {

    /** 
     * @desc    Get all carts (Admins only, typically)
     * @route   GET /api/carts
     * @access  Admin
     */
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find().populate('user').populate('products.product');
            res.status(200).json({ success: true, data: carts });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Get a single cart by ID
     * @route   GET /api/carts/:id
     * @access  Private (Only cart owner)
     */
    getCartById: async (req, res) => {
        try {
            const { id } = req.params;
            const cart = await Cart.findById(id).populate('user').populate('products.product');

            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            if (cart.user.toString() !== req.user._id) {
                return res.status(403).json({ success: false, message: 'Access denied. You do not own this cart.' });
            }

            res.status(200).json({ success: true, data: cart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Create a new cart
     * @route   POST /api/carts
     * @access  Private (Only logged-in users)
     */
    createCart: async (req, res) => {
        try {
            const userId = req.user._id;
            const { products } = req.body;

            if (!products) {
                return res.status(400).json({ success: false, message: 'Products are required' });
            }

            const newCart = new Cart({ user: userId, products });
            const savedCart = await newCart.save();

            res.status(201).json({ success: true, data: savedCart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Update an existing cart
     * @route   PUT /api/carts/:id
     * @access  Private (Only cart owner)
     */
    updateCart: async (req, res) => {
        try {
            const { id } = req.params;
            const { products } = req.body;

            const cart = await Cart.findById(id);
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            if (cart.user.toString() !== req.user._id) {
                return res.status(403).json({ success: false, message: 'Access denied. You do not own this cart.' });
            }

            cart.products = products || cart.products;
            cart.updatedAt = Date.now();

            const updatedCart = await cart.save();
            res.status(200).json({ success: true, data: updatedCart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Delete a cart by ID
     * @route   DELETE /api/carts/:id
     * @access  Private (Only cart owner)
     */
    deleteCart: async (req, res) => {
        try {
            const { id } = req.params;

            const cart = await Cart.findById(id);
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            if (cart.user.toString() !== req.user._id) {
                return res.status(403).json({ success: false, message: 'Access denied. You do not own this cart.' });
            }

            await cart.remove();
            res.status(200).json({ success: true, message: 'Cart deleted successfully', data: cart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Add product to cart
     * @route   POST /api/carts/:id/products
     * @access  Private (Only cart owner)
     */
    addProductToCart: async (req, res) => {
        try {
            const { id } = req.params;
            const { product, quantity } = req.body;

            const cart = await Cart.findById(id);
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            if (cart.user.toString() !== req.user._id) {
                return res.status(403).json({ success: false, message: 'Access denied. You do not own this cart.' });
            }

            cart.products.push({ product, quantity });
            await cart.save();

            res.status(200).json({ success: true, data: cart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Remove product from cart
     * @route   DELETE /api/carts/:id/products/:productId
     * @access  Private (Only cart owner)
     */
    removeProductFromCart: async (req, res) => {
        try {
            const { id, productId } = req.params;

            const cart = await Cart.findById(id);
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            if (cart.user.toString() !== req.user._id) {
                return res.status(403).json({ success: false, message: 'Access denied. You do not own this cart.' });
            }

            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            await cart.save();

            res.status(200).json({ success: true, data: cart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },
    
    getCartByUser: async (req, res) => {
        try {
            const userId = req.user._id; // Assuming req.user contains the authenticated user info
            const cart = await Cart.findOne({ user: userId }).populate('user').populate('products.product');

            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found for this user' });
            }

            res.status(200).json({ success: true, data: cart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

};

export default CartController;