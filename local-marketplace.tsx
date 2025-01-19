import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Store, Clock, Package, Calendar, Edit, Plus, Save, Trash2, Mail, Phone, Google, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = ({ onSwitch }) => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgetFlow, setIsForgetFlow] = useState(false);
  const [step, setStep] = useState(1); // For forget password flow

  const handleForgetPassword = () => {
    setIsForgetFlow(true);
  };

  const handleResetRequest = () => {
    // In real app, would send reset code to email/phone
    setStep(2);
  };

  const handleVerifyCode = () => {
    setStep(3);
  };

  if (isForgetFlow) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <input
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone'}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleResetRequest}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Send Reset Code
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleVerifyCode}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Verify Code
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => setIsForgetFlow(false)}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Reset Password
              </button>
            </div>
          )}
          <button
            onClick={() => setIsForgetFlow(false)}
            className="w-full mt-4 text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Login to LocalMart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 p-2 rounded ${loginMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              <Mail size={20} className="mx-auto" />
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 p-2 rounded ${loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              <Phone size={20} className="mx-auto" />
            </button>
          </div>

          {loginMethod === 'email' ? (
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-2 border rounded"
            />
          )}

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={handleForgetPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-50"
          >
            <Google size={20} />
            Continue with Google
          </button>

          <button
            onClick={() => onSwitch('register')}
            className="w-full text-blue-600 hover:underline"
          >
            Don't have an account? Register
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductCard = ({ product, isSellerView, onEdit, onDelete, onAddToCart }) => {
  const commission = product.price * 0.04; // 4% commission
  const finalPrice = product.price + commission;

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <img
        src={product.imageUrl || "/api/placeholder/300/200"}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <div>
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className="text-sm text-gray-600">
          <p>Base Price: ${product.price.toFixed(2)}</p>
          <p>Commission (4%): ${commission.toFixed(2)}</p>
          <p className="font-medium">Final Price: ${finalPrice.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Clock size={14} />
          Delivery: {product.deliveryTime}
        </div>
      </div>
      
      {isSellerView ? (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Edit size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      ) : (
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      )}
    </div>
  );
};

const ProductEditor = ({ product, onSave }) => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(product || {
    name: '',
    price: 0,
    quantity: 0,
    deliveryTime: '1-2 days',
    description: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // In a real app, you would upload the image to a server and get back a URL
      // For now, we'll create a temporary URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl });
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}
      </div>

      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Product name"
        className="w-full p-2 border rounded"
      />

      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Product description"
        className="w-full p-2 border rounded"
        rows={3}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          placeholder="Price"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          placeholder="Quantity"
          className="p-2 border rounded"
        />
      </div>

      <input
        type="text"
        value={formData.deliveryTime}
        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
        placeholder="Delivery time (e.g. 1-2 days)"
        className="w-full p-2 border rounded"
      />

      <button
        onClick={() => onSave(formData)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Product
      </button>
    </div>
  );
};

const Cart = ({ items, onCheckout }) => {
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const commission = subtotal * 0.04;
    const total = subtotal + commission;
    return { subtotal, commission, total };
  };

  const { subtotal, commission, total } = calculateTotals();

  return (
    <Card className="sticky bottom-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart size={24} />
          Cart ({items.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={item.imageUrl || "/api/placeholder/50/50"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Commission (4%):</span>
                <span>${commission.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onCheckout('app')}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Pay in App
              </button>
              <button
                onClick={() => onCheckout('store')}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
              >
                Pay at Store
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
      </CardContent>
    </Card>
  );
};

const LocalMarketplace = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // ... rest of the existing state variables ...

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // ... rest of the existing component code ...
};

export default LocalMarketplace;