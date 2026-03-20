import React, { useState } from "react";

const generateCaseId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `TC-WR-${year}-${random}`;
};

const Refund = () => {
  const [formData, setFormData] = useState({
    orderNumber: "",
    qrCode: "",
    sku: "",
    engineModel: "",
    installationDate: "",
    installerName: "",
    problem: "",
    damagePhotos: null,
    invoice: null,
  });

  const [caseId, setCaseId] = useState(generateCaseId());
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("Refund Submitted:", { ...formData, caseId });

    setSubmitted(true);

    // Reset form after submit
    setFormData({
      orderNumber: "",
      qrCode: "",
      sku: "",
      engineModel: "",
      installationDate: "",
      installerName: "",
      problem: "",
      damagePhotos: null,
      invoice: null,
    });

    setCaseId(generateCaseId());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Refund / Warranty Request
        </h2>

        {/* Case ID */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-500">Generated Case ID</p>
          <p className="text-lg font-semibold text-blue-600">{caseId}</p>
        </div>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Request submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="orderNumber"
            placeholder="Order Number"
            value={formData.orderNumber}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="qrCode"
            placeholder="QR Code Serial"
            value={formData.qrCode}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="sku"
            placeholder="Product SKU"
            value={formData.sku}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="engineModel"
            placeholder="Engine Model"
            value={formData.engineModel}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="installerName"
            placeholder="Installer / Workshop Name"
            value={formData.installerName}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Problem Description */}
          <textarea
            name="problem"
            placeholder="Describe the problem"
            value={formData.problem}
            onChange={handleChange}
            required
            className="input col-span-1 md:col-span-2 h-24"
          />

          {/* Upload Damage Photos */}
          <div>
            <label className="text-sm text-gray-600">Upload Damage Photos</label>
            <input
              type="file"
              name="damagePhotos"
              accept="image/*"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Upload Invoice */}
          <div>
            <label className="text-sm text-gray-600">Upload Installation Invoice</label>
            <input
              type="file"
              name="invoice"
              accept="image/*,.pdf"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Request
          </button>

        </form>
      </div>

      {/* Tailwind reusable class */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default Refund;