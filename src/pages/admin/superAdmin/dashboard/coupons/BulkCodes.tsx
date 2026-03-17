import React, { useState } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";

interface BulkCodesProps {
  onBack: () => void;
}

interface GeneratedCode {
  code: string;
  created: string;
}

const BulkCodes: React.FC<BulkCodesProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    numberOfCodes: "",
    discountType: "Percentage",
    discountValue: "",
    expiryDate: "",
    usageRule: "single-use"
  });

  const [generatedCodes, setGeneratedCodes] = useState<GeneratedCode[]>([]);
  const [showCodes, setShowCodes] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const generateCodes = (count: number): string[] => {
    const codes: string[] = [];
    const prefixes = ["TCX", "TQT", "TSM", "TDL"];
    const usedCodes = new Set<string>();

    for (let i = 0; i < count; i++) {
      let code: string;
      let attempts = 0;

      do {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const randomNum = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0");
        code = `${prefix}${randomNum}`;
        attempts++;
      } while (usedCodes.has(code) && attempts < 10);

      if (!usedCodes.has(code)) {
        usedCodes.add(code);
        codes.push(code);
      }
    }

    return codes;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.numberOfCodes) newErrors.numberOfCodes = "Number of codes is required";
    else if (parseInt(formData.numberOfCodes) < 1 || parseInt(formData.numberOfCodes) > 10000)
      newErrors.numberOfCodes = "Enter a number between 1 and 10,000";

    if (!formData.discountValue) newErrors.discountValue = "Discount value is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const count = parseInt(formData.numberOfCodes);
    const codes = generateCodes(count);

    const codesWithMeta: GeneratedCode[] = codes.map(code => ({
      code,
      created: new Date().toLocaleDateString()
    }));

    setGeneratedCodes(codesWithMeta);
    setShowCodes(true);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exportToCSV = () => {
    const headers = ["Coupon Code", "Date Created", "Discount Type", "Discount Value", "Expiry Date"];
    const rows = generatedCodes.map(item => [
      item.code,
      item.created,
      formData.discountType,
      formData.discountValue,
      formData.expiryDate
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bulk-codes-${new Date().getTime()}.csv`;
    a.click();
  };

  const copyAllCodes = () => {
    const allCodes = generatedCodes.map(item => item.code).join("\n");
    navigator.clipboard.writeText(allCodes);
    setCopiedCode("all");
    setTimeout(() => setCopiedCode(null), 2000);
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
          <h1 className="text-3xl font-bold text-white">Bulk Code Generation</h1>
          <p className="text-slate-400 text-sm mt-1">Generate multiple coupon codes at once</p>
        </div>
      </div>

      {!showCodes ? (
        // Generation Form
        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Code Generation Settings */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">Generation Settings</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Number of Codes *</label>
                  <input
                    type="number"
                    name="numberOfCodes"
                    placeholder="e.g., 500"
                    min="1"
                    max="10000"
                    value={formData.numberOfCodes}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                      errors.numberOfCodes
                        ? "border-red-500/50 focus:border-red-500/70"
                        : "border-white/10 focus:border-blue-500/50"
                    }`}
                  />
                  {errors.numberOfCodes && <p className="text-red-400 text-xs mt-1">{errors.numberOfCodes}</p>}
                  <p className="text-xs text-slate-500 mt-1">Maximum: 10,000 codes per batch</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Usage Rule *</label>
                  <select
                    name="usageRule"
                    value={formData.usageRule}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M1 4l5 5 5-5'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="single-use" className="bg-slate-800 text-white">Single Use Only</option>
                    <option value="multi-use" className="bg-slate-800 text-white">Multi-Use</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    {formData.usageRule === "single-use"
                      ? "Each code can be used once"
                      : "Each code can be used multiple times"}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Discount Settings */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">Discount Settings</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Discount Type *</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
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
                    placeholder={formData.discountType === "Percentage" ? "10" : "20"}
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

          {/* Expiry Settings */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">Expiry Settings</h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className={`w-full bg-white/5 border rounded-lg py-2.5 px-4 text-white focus:outline-none transition-colors ${
                  errors.expiryDate
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-blue-500/50"
                }`}
              />
              {errors.expiryDate && <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>}
              <p className="text-xs text-slate-500 mt-2">All generated codes will expire on this date</p>
            </div>
          </GlassCard>

          {/* Submit Button */}
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
              Generate Codes
            </button>
          </div>
        </form>
      ) : (
        // Generated Codes Display
        <div className="space-y-6">
          {/* Summary Card */}
          <GlassCard className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Codes Generated</p>
                <p className="text-3xl font-bold text-blue-400">{generatedCodes.length}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Discount Type</p>
                <p className="text-xl font-bold text-white">{formData.discountType}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Discount Value</p>
                <p className="text-xl font-bold text-white">
                  {formData.discountValue}{formData.discountType === "Percentage" ? "%" : formData.discountType === "Fixed" ? "$" : ""}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Expires</p>
                <p className="text-xl font-bold text-white">{new Date(formData.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </GlassCard>

          {/* Generated Codes Table */}
          <GlassCard className="overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Generated Codes</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyAllCodes}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-white/10 flex items-center gap-2"
                >
                  {copiedCode === "all" ? (
                    <>
                      <Check size={16} className="text-green-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy All
                    </>
                  )}
                </button>
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <Download size={16} /> Export CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Code</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Created</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedCodes.map((item, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-blue-400">{item.code}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.created}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => copyToClipboard(item.code)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
                        >
                          {copiedCode === item.code ? (
                            <>
                              <Check size={14} className="text-green-400" />
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 text-xs text-slate-500">
              Showing {generatedCodes.length} of {generatedCodes.length} codes
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowCodes(false);
                setGeneratedCodes([]);
              }}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg font-medium transition-colors border border-white/10"
            >
              Generate More
            </button>
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
            >
              Back to Bulk Codes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkCodes;
