import React, { useState } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ArrowLeft, Plus, X } from "lucide-react";

interface CreateCouponProps {
  onBack: () => void;
}

const CreateCoupon: React.FC<CreateCouponProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    codeName: "",
    discountType: "Percentage",
    discountValue: "",
    startDate: "",
    expiryDate: "",
    totalLimit: "",
    perCustomerLimit: "",
    minCartValue: "",
    maxDiscountCap: "",
    selectedProducts: [] as string[],
    selectedCategories: [] as string[],
    countryRestrictions: [] as string[],
    assignTo: "Public"
  });

  const [currentCountry, setCurrentCountry] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const availableProducts = [
    "All Engines",
    "Turbos",
    "Exhaust Systems",
    "Diesel Engines",
    "Diesel Turbos",
    "Performance Parts",
    "Cooling Systems"
  ];

  const availableCategories = [
    "Performance",
    "Engines",
    "Diesel Performance",
    "New Products",
    "Seasonal",
    "Clearance"
  ];

  const countries = ["US", "Canada", "Mexico", "UK", "Europe", "Australia", "Asia"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(product)
        ? prev.selectedProducts.filter(p => p !== product)
        : [...prev.selectedProducts, product]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }));
  };

  const addCountry = () => {
    if (currentCountry && !formData.countryRestrictions.includes(currentCountry)) {
      setFormData(prev => ({
        ...prev,
        countryRestrictions: [...prev.countryRestrictions, currentCountry]
      }));
      setCurrentCountry("");
    }
  };

  const removeCountry = (country: string) => {
    setFormData(prev => ({
      ...prev,
      countryRestrictions: prev.countryRestrictions.filter(c => c !== country)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.codeName.trim()) newErrors.codeName = "Coupon code is required";
    if (!formData.discountValue) newErrors.discountValue = "Discount value is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.totalLimit) newErrors.totalLimit = "Total usage limit is required";
    if (!formData.perCustomerLimit) newErrors.perCustomerLimit = "Per customer limit is required";
    if (!formData.minCartValue) newErrors.minCartValue = "Minimum cart value is required";
    if (!formData.maxDiscountCap) newErrors.maxDiscountCap = "Maximum discount cap is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show success message
    setSuccessMessage("✓ Coupon created successfully!");

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        codeName: "",
        discountType: "Percentage",
        discountValue: "",
        startDate: "",
        expiryDate: "",
        totalLimit: "",
        perCustomerLimit: "",
        minCartValue: "",
        maxDiscountCap: "",
        selectedProducts: [],
        selectedCategories: [],
        countryRestrictions: [],
        assignTo: "Public"
      });
      setSuccessMessage("");
      onBack();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Coupon</h1>
          <p className="text-slate-400 text-sm mt-1">Fill in the details to create a new discount coupon</p>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-6 py-4 rounded-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Coupon Code Name *</label>
              <input
                type="text"
                name="codeName"
                placeholder="e.g., TORQUE10, SUMMER20"
                value={formData.codeName}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                  errors.codeName
                    ? "border-red-500/50 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/20"
                    : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                }`}
              />
              {errors.codeName && <p className="text-red-400 text-xs mt-1">{errors.codeName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Discount Type *</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M1 4l5 5 5-5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="Percentage" className="bg-slate-800 text-white">Percentage (%)</option>
                  <option value="Fixed" className="bg-slate-800 text-white">Fixed Amount ($)</option>
                  <option value="Free Shipping" className="bg-slate-800 text-white">Free Shipping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Discount Value *</label>
                <input
                  type="number"
                  name="discountValue"
                  placeholder={formData.discountType === "Free Shipping" ? "N/A" : formData.discountType === "Percentage" ? "10" : "20"}
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  disabled={formData.discountType === "Free Shipping"}
                  className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors disabled:opacity-50 ${
                    errors.discountValue
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/10 focus:border-blue-500/50"
                  }`}
                />
                {errors.discountValue && <p className="text-red-400 text-xs mt-1">{errors.discountValue}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Unit</label>
                <div className="py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-sm">
                  {formData.discountType === "Percentage" ? "%" : formData.discountType === "Fixed" ? "$" : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Dates */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Validity Period</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white focus:outline-none transition-colors ${
                  errors.startDate
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-blue-500/50"
                }`}
              />
              {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date (Optional)</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>
        </GlassCard>

        {/* Usage Limits */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Usage Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Total Usage Limit *</label>
              <input
                type="number"
                name="totalLimit"
                placeholder="e.g., 500"
                value={formData.totalLimit}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                  errors.totalLimit
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-blue-500/50"
                }`}
              />
              {errors.totalLimit && <p className="text-red-400 text-xs mt-1">{errors.totalLimit}</p>}
              <p className="text-xs text-slate-500 mt-1">Maximum times this coupon can be used</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Per Customer Limit *</label>
              <input
                type="number"
                name="perCustomerLimit"
                placeholder="e.g., 5"
                value={formData.perCustomerLimit}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                  errors.perCustomerLimit
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-blue-500/50"
                }`}
              />
              {errors.perCustomerLimit && <p className="text-red-400 text-xs mt-1">{errors.perCustomerLimit}</p>}
              <p className="text-xs text-slate-500 mt-1">Times each customer can use this coupon</p>
            </div>
          </div>
        </GlassCard>

        {/* Order Value Rules */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Order Value Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Minimum Cart Value ($) *</label>
              <input
                type="number"
                name="minCartValue"
                placeholder="e.g., 100"
                value={formData.minCartValue}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                  errors.minCartValue
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-blue-500/50"
                }`}
              />
              {errors.minCartValue && <p className="text-red-400 text-xs mt-1">{errors.minCartValue}</p>}
              <p className="text-xs text-slate-500 mt-1">Minimum order amount to apply coupon</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Maximum Discount Cap ($) *</label>
              <input
                type="number"
                name="maxDiscountCap"
                placeholder="e.g., 500"
                value={formData.maxDiscountCap}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                  errors.maxDiscountCap
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-blue-500/50"
                }`}
              />
              {errors.maxDiscountCap && <p className="text-red-400 text-xs mt-1">{errors.maxDiscountCap}</p>}
              <p className="text-xs text-slate-500 mt-1">Maximum discount amount allowed</p>
            </div>
          </div>
        </GlassCard>

        {/* Product & Category Selection */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Products & Categories</h2>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Select Products</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {availableProducts.map(product => (
                <label key={product} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.selectedProducts.includes(product)}
                    onChange={() => handleProductToggle(product)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-slate-200">{product}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Select Categories</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {availableCategories.map(category => (
                <label key={category} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-slate-200">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Country Restrictions */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Country Restrictions</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <select
                value={currentCountry}
                onChange={(e) => setCurrentCountry(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M1 4l5 5 5-5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="" className="bg-slate-800 text-white">Select a country...</option>
                {countries.map(c => (
                  <option key={c} value={c} className="bg-slate-800 text-white">{c}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addCountry}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {formData.countryRestrictions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Selected Countries</p>
                <div className="flex flex-wrap gap-2">
                  {formData.countryRestrictions.map(country => (
                    <div key={country} className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium">
                      {country}
                      <button
                        type="button"
                        onClick={() => removeCountry(country)}
                        className="hover:text-blue-200 transition-colors ml-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Visibility & Access */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Visibility & Access</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="assignTo"
                value="Public"
                checked={formData.assignTo === "Public"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-slate-300">Public</span>
                <p className="text-xs text-slate-500">Available to all customers</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="assignTo"
                value="Dealer Only"
                checked={formData.assignTo === "Dealer Only"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-slate-300">Dealer Only</span>
                <p className="text-xs text-slate-500">Only dealers can use this coupon</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="assignTo"
                value="Distributor Only"
                checked={formData.assignTo === "Distributor Only"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-slate-300">Distributor Only</span>
                <p className="text-xs text-slate-500">Only distributors can use this coupon</p>
              </div>
            </label>
          </div>
        </GlassCard>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg font-medium transition-colors border border-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Create Coupon
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;
