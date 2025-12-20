
import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ArrowRight, CheckCircle, Package, Download, Star, CreditCard, Smartphone, Info } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { useStore } from './store';
import { CartItem, Product, Address, Order } from './types';
import { jsPDF } from 'jspdf';

// --- Context ---
const StoreContext = createContext<ReturnType<typeof useStore> | null>(null);
const useGlobalStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("Store context error");
  return context;
};

// --- Components ---

const Navbar = () => {
  const { cart } = useGlobalStore();
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="brand-font text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="bg-black text-white px-2 py-0.5 transform -skew-x-12">F6</div>
          <span>SYNDICATE</span>
        </Link>
        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/shop" className="hover:text-red-600 transition">SHOP</Link>
          <Link to="/orders" className="hover:text-red-600 transition">MY ORDERS</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/orders" className="p-2 hover:bg-gray-100 rounded-full transition">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black text-white py-16 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div>
        <h3 className="brand-font text-2xl font-bold mb-6">F6 SYNDICATE</h3>
        <p className="text-gray-400">Defining the future of street-wear through elite design and seamless shopping experiences.</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">SUPPORT</h4>
        <ul className="text-gray-400 space-y-2">
          <li>Help Center</li>
          <li>Returns & Exchanges</li>
          <li>Shipping Information</li>
          <li>Track Order</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">COMPANY</h4>
        <ul className="text-gray-400 space-y-2">
          <li>About Us</li>
          <li>Careers</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">NEWSLETTER</h4>
        <div className="flex bg-zinc-900 rounded p-1">
          <input type="email" placeholder="Email Address" className="bg-transparent px-3 py-2 flex-grow focus:outline-none" />
          <button className="bg-white text-black px-4 py-2 font-bold rounded">JOIN</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} F6 Syndicate. All Rights Reserved.
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => (
  <div className="space-y-20">
    <section className="relative h-[80vh] bg-zinc-900 flex items-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&h=1080&auto=format&fit=crop" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <h1 className="brand-font text-7xl md:text-9xl text-white font-bold leading-none mb-6">
            EVOLVE <br /> THE <span className="text-red-600">FIT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg">Premium essentials for the modern vanguard. Engineered for comfort, designed for the streets of Bharat.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-lg font-bold hover:bg-red-600 hover:text-white transition group">
            SHOP COLLECTION <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <h2 className="brand-font text-4xl font-bold">LATEST DROPS</h2>
        <Link to="/shop" className="text-red-600 font-bold hover:underline">VIEW ALL</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.slice(0, 3).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>

    <section className="bg-zinc-900 py-24 px-6 text-white text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="brand-font text-5xl font-bold tracking-tight">CRAFTED FOR THE VANGUARD</h2>
        <p className="text-zinc-400 text-xl">Every piece in the F6 collection is a statement of intent. We combine architectural silhouettes with the finest bio-washed cotton to deliver a fit that lasts.</p>
        <Link to="/shop" className="inline-block bg-red-600 px-10 py-4 font-bold text-lg hover:bg-red-700 transition">EXPLORE THE DROP</Link>
      </div>
    </section>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link to={`/product/${product.id}`} className="group block space-y-4">
    <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
      />
      <div className="absolute top-4 left-4 bg-white px-2 py-1 text-xs font-bold tracking-widest">
        {product.category.toUpperCase()}
      </div>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-500 text-sm">Premium Cotton</p>
      </div>
      <p className="font-bold text-xl">₹{product.price}</p>
    </div>
  </Link>
);

const ShopPage = () => {
  const [filter, setFilter] = useState('All');
  const filteredProducts = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="brand-font text-5xl font-bold">COLLECTIONS</h1>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm font-bold border transition ${filter === cat ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:border-black'}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useGlobalStore();
  const product = PRODUCTS.find(p => p.id === id);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!size) return alert("Please select a size");
    addToCart({ ...product, selectedSize: size, selectedColor: color || product.colors[0], quantity: 1 });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      <div className="aspect-[4/5] bg-gray-200">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-8">
        <div>
          <h1 className="brand-font text-5xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-red-600">₹{product.price}</p>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
        
        <div>
          <p className="font-bold mb-4">SELECT SIZE</p>
          <div className="flex gap-4">
            {product.sizes.map(s => (
              <button 
                key={s} 
                onClick={() => setSize(s)}
                className={`w-14 h-14 border-2 flex items-center justify-center font-bold transition ${size === s ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-5 font-bold text-xl hover:bg-zinc-800 transition"
        >
          ADD TO CART
        </button>

        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
          <div className="text-center">
            <Package className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-xs font-bold uppercase">Fast Shipping</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-xs font-bold uppercase">100% Cotton</p>
          </div>
          <div className="text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-xs font-bold uppercase">Elite Quality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useGlobalStore();
  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-gray-300" />
        <h1 className="text-3xl font-bold mb-4">YOUR CART IS EMPTY</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your syndicate bag yet.</p>
        <Link to="/shop" className="inline-block bg-black text-white px-8 py-4 font-bold">START SHOPPING</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="brand-font text-5xl font-bold mb-12">SHOPPING BAG</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 border-b border-gray-100 pb-6">
              <div className="w-32 h-40 bg-gray-200">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-500 mb-4">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                    <span className="px-4 py-1 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                  <p className="font-bold text-xl">₹{item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-8 h-fit space-y-6 rounded">
          <h2 className="font-bold text-2xl border-b border-gray-200 pb-4">SUMMARY</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-2xl pt-4 border-t border-gray-200">
              <span>TOTAL</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full bg-black text-white py-4 text-center font-bold hover:bg-zinc-800 transition">
            CHECKOUT NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, createOrder } = useGlobalStore();
  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const [formData, setFormData] = useState<Address>({
    fullName: '', email: '', phone: '', street: '', city: '', state: '', zip: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [showDocs, setShowDocs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'UPI' && !upiId.includes('@')) {
      alert("Please enter a valid UPI ID (e.g. user@bank)");
      return;
    }
    const order = createOrder(formData);
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="brand-font text-5xl font-bold">CHECKOUT</h1>
        <button 
          onClick={() => setShowDocs(!showDocs)}
          className="text-sm font-bold flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200 hover:bg-amber-100 transition"
        >
          <Info className="w-4 h-4" /> IMPLEMENTATION STEPS
        </button>
      </div>

      {showDocs && (
        <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="font-bold text-xl mb-4 text-amber-800 uppercase tracking-wider">How to implement real UPI payments</h2>
          <div className="grid md:grid-cols-3 gap-8 text-sm text-amber-900">
            <div>
              <p className="font-bold mb-2">1. MERCHANT ONBOARDING</p>
              <p>Register with a Payment Aggregator (Razorpay, Cashfree, or PhonePe PG). Complete KYC to get your <code className="bg-amber-200 px-1 rounded">MERCHANT_ID</code> and API keys.</p>
            </div>
            <div>
              <p className="font-bold mb-2">2. SDK INTEGRATION</p>
              <p>Add the SDK script to your HTML. In React, use <code className="bg-amber-200 px-1 rounded">razorpay.js</code>. Create an 'Order' on your backend before calling the frontend SDK.</p>
            </div>
            <div>
              <p className="font-bold mb-2">3. THE PAYMENT CALL</p>
              <p>Call the SDK's pay method. Specify <code className="bg-amber-200 px-1 rounded">method: 'upi'</code> to deep-link directly to apps like GooglePay, PhonePe, or BHIM.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span>
              SHIPPING ADDRESS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Full Name</label>
                <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email</label>
                <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="rahul@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Mobile Phone</label>
                <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="+91 98765 43210" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Street Address</label>
                <input required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="Apartment 42, Elite Towers" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">City</label>
                <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="Mumbai" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">State / Pincode</label>
                <div className="flex gap-4">
                  <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} type="text" className="w-1/2 border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="MH" />
                  <input required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} type="text" className="w-1/2 border-b-2 border-gray-200 py-3 focus:border-black focus:outline-none transition" placeholder="400001" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span>
              PAYMENT METHOD (INR)
            </h2>
            <div className="space-y-4">
              <div 
                onClick={() => setPaymentMethod('UPI')}
                className={`p-6 border-2 rounded-xl flex justify-between items-center cursor-pointer transition ${paymentMethod === 'UPI' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${paymentMethod === 'UPI' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">UPI Payment</p>
                    <p className="text-sm text-gray-500">GooglePay, PhonePe, Paytm</p>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
                   {paymentMethod === 'UPI' && <div className="w-3 h-3 bg-black rounded-full"></div>}
                </div>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="p-6 bg-gray-100 rounded-xl space-y-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Enter UPI ID (VPA)</label>
                  <input 
                    required={paymentMethod === 'UPI'}
                    type="text" 
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="example@upi"
                  />
                  <div className="flex gap-4 opacity-50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6" />
                  </div>
                </div>
              )}

              <div 
                onClick={() => setPaymentMethod('CARD')}
                className={`p-6 border-2 rounded-xl flex justify-between items-center cursor-pointer transition ${paymentMethod === 'CARD' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${paymentMethod === 'CARD' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
                   {paymentMethod === 'CARD' && <div className="w-3 h-3 bg-black rounded-full"></div>}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-zinc-900 text-white p-8 h-fit space-y-6 rounded">
          <h2 className="font-bold text-2xl border-b border-zinc-800 pb-4 uppercase tracking-tighter">Your Bag</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold">{item.name} x {item.quantity}</p>
                  <p className="text-zinc-500 uppercase text-[10px]">{item.selectedSize} / {item.selectedColor}</p>
                </div>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-zinc-800 space-y-4">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-green-400">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-3xl pt-4 text-white">
              <span>TOTAL</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-5 font-bold text-lg hover:bg-red-700 transition shadow-lg shadow-red-900/20">
            {paymentMethod === 'UPI' ? 'PAY SECURELY VIA UPI' : 'PAY VIA CARD'}
          </button>
        </div>
      </form>
    </div>
  );
};

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { orders } = useGlobalStore();
  const order = orders.find(o => o.id === orderId);

  const downloadInvoice = () => {
    if (!order) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.text("F6 SYNDICATE", 10, 20);
    doc.setFontSize(10);
    doc.text("Elite Street-wear Collective", 10, 26);
    
    doc.setFontSize(14);
    doc.text("INVOICE", 160, 20);
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id}`, 160, 26);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 160, 31);

    // Shipping
    doc.setFontSize(12);
    doc.text("Ship To:", 10, 50);
    doc.setFontSize(10);
    doc.text(order.address.fullName, 10, 56);
    doc.text(order.address.street, 10, 61);
    doc.text(`${order.address.city}, ${order.address.state} ${order.address.zip}`, 10, 66);
    doc.text(order.address.phone, 10, 71);

    // Items
    let y = 90;
    doc.setFontSize(12);
    doc.text("Description", 10, y);
    doc.text("Qty", 130, y);
    doc.text("Price", 150, y);
    doc.text("Total", 180, y);
    doc.line(10, y + 2, 200, y + 2);
    
    y += 10;
    doc.setFontSize(10);
    order.items.forEach(item => {
      doc.text(`${item.name} (${item.selectedSize})`, 10, y);
      doc.text(item.quantity.toString(), 130, y);
      doc.text(`INR ${item.price}`, 150, y);
      doc.text(`INR ${item.price * item.quantity}`, 180, y);
      y += 8;
    });

    doc.line(150, y + 2, 200, y + 2);
    y += 10;
    doc.setFontSize(12);
    doc.text("GRAND TOTAL", 140, y);
    doc.text(`INR ${order.total}`, 180, y);

    doc.save(`F6-Syndicate-Invoice-${order.id}.pdf`);
  };

  if (!order) return <div>Order not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle className="w-12 h-12" />
      </div>
      <h1 className="brand-font text-5xl font-bold mb-4">ORDER CONFIRMED</h1>
      <p className="text-xl text-gray-500 mb-8">Your order <span className="text-black font-bold">#{order.id}</span> has been processed. A confirmation email is on its way to {order.address.email}.</p>
      
      <div className="bg-gray-50 p-8 rounded text-left mb-12 border border-gray-200">
        <h3 className="font-bold mb-4 border-b border-gray-200 pb-2 uppercase text-xs tracking-widest text-gray-500">Delivery Information</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Recipient: <span className="text-black font-medium">{order.address.fullName}</span></p>
          <p>Address: <span className="text-black font-medium">{order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}</span></p>
          <p>Contact: <span className="text-black font-medium">{order.address.phone}</span></p>
          <p>Status: <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">{order.status}</span></p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={downloadInvoice} className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-bold hover:bg-zinc-800 transition shadow-lg">
          <Download className="w-5 h-5" /> DOWNLOAD TAX INVOICE
        </button>
        <Link to="/shop" className="border-2 border-black px-8 py-4 font-bold hover:bg-black hover:text-white transition">
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const { orders } = useGlobalStore();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="brand-font text-5xl font-bold mb-12">ORDER HISTORY</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No orders found yet. Start building your syndicate wardrobe.</p>
          <Link to="/shop" className="text-black font-bold underline mt-4 inline-block hover:text-red-600 transition">GO SHOPPING</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {[...orders].reverse().map(order => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md transition">
              <div>
                <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">ORDER #{order.id}</p>
                <h3 className="font-bold text-xl mb-1">{order.items.length} {order.items.length === 1 ? 'Product' : 'Products'}</h3>
                <p className="text-gray-500 text-sm">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded border border-gray-100 shadow-sm" />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white font-bold">{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="md:text-right">
                <p className="text-2xl font-bold mb-2">₹{order.total}</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{order.status}</span>
              </div>
              <Link to={`/order-success/${order.id}`} className="w-full md:w-auto text-center bg-gray-50 border-2 border-gray-100 px-6 py-2 rounded font-bold hover:bg-black hover:text-white hover:border-black transition">
                VIEW RECEIPT
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- App Root ---

const App = () => {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </StoreContext.Provider>
  );
};

export default App;
