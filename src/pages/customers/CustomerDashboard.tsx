

import { useState, useEffect } from "react"; // Added useEffect to sync data
import { useAuth } from "../../context/AuthContext";
import MyOrders from "./myOrders";
import Refund from "./Refund";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  RefreshCcw,
  ChevronRight,
  LogOut,
  ShieldCheck,
  FileText,
  QrCode,
  Plus,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // --- Profile State (Updated to sync with AuthContext user) ---
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || user?.name?.split(" ")[0] || "User",
    lastName: user?.lastName || user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "Male",
  });

  // UseEffect ensures that if user logs in/registers, the data updates live
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || user.name?.split(" ")[0] || "User",
        lastName: user.lastName || user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "Male",
      });
    }
  }, [user]);

  // --- Address State ---
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: `${profileData.firstName} ${profileData.lastName}`,
      phone: profileData.phone,
      pincode: "400001",
      locality: "Area Locality",
      address: "123 Street Name",
      city: "City Name",
      state: "State Name",
      type: "HOME",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "", type: "HOME",
  });

  // --- Functions ---
  const handleEditAddress = (addr) => {
    setFormData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(addresses.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a)));
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "", type: "HOME" });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabContentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#f1f3f6] text-slate-900 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-white p-3 flex items-center gap-4 shadow-sm rounded-sm">
            <div className="relative">
              <img
                /* FIXED: Strict real-time check for gender avatar */
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                  profileData.gender === "Female" ? "Aneka" : "Felix"
                }`}
                alt="avatar"
                className={`w-12 h-12 rounded-full border-2 border-white shadow-sm ${
                  profileData.gender === "Female" ? "bg-pink-400" : "bg-amber-400"
                }`}
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-slate-500">Hello,</p>
              <h3 className="font-bold text-slate-800 truncate">
                {profileData.firstName} {profileData.lastName}
              </h3>
            </div>
          </div>

          <nav className="bg-white shadow-sm rounded-sm overflow-hidden">
            <div className="border-t border-slate-100">
              <div className="px-6 py-4 flex items-center gap-4 text-slate-400">
                <User size={20} className="text-blue-600" />
                <span className="font-bold text-sm text-slate-500 uppercase">Account Settings</span>
              </div>
              <SubLink label="Profile Information" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
              <SubLink label="Manage Addresses" active={activeTab === "address"} onClick={() => setActiveTab("address")} />
            </div>

            <SidebarLink icon={<Package className="text-blue-600" size={20} />} label="MY ORDERS" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} showChevron />
            <SidebarLink icon={<QrCode className="text-blue-600" size={20} />} label="QR Verification" active={activeTab === "qr_verification"} onClick={() => setActiveTab("qr_verification")} showChevron />
            <SidebarLink icon={<ShieldCheck className="text-blue-600" size={20} />} label="Warranty Status" active={activeTab === "warranty"} onClick={() => setActiveTab("warranty")} showChevron />
            <SidebarLink icon={<RefreshCcw className="text-blue-600" size={20} />} label="Refund" active={activeTab === "refund"} onClick={() => setActiveTab("refund")} showChevron />
            <SidebarLink icon={<FileText className="text-blue-600" size={20} />} label="Replacement Status" active={activeTab === "replacement"} onClick={() => setActiveTab("replacement")} showChevron />

            <div className="border-t border-slate-100 mt-2">
              <SidebarLink icon={<LogOut className="text-blue-600" size={20} />} label="Logout" onClick={handleLogout} />
            </div>
          </nav>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-grow bg-white shadow-sm rounded-sm p-6 md:p-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {activeTab === "profile" && (
              <motion.div key="profile" variants={tabContentVariants} initial="initial" animate="animate" exit="exit">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
                  <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 text-sm font-semibold hover:underline">
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>
                <div className="space-y-8 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First Name" value={profileData.firstName} disabled={!isEditing} onChange={(e) => setProfileData({...profileData, firstName: e.target.value})} />
                    <InputField label="Last Name" value={profileData.lastName} disabled={!isEditing} onChange={(e) => setProfileData({...profileData, lastName: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700">Your Gender</p>
                    <div className="flex gap-6">
                      {["Male", "Female"].map((g) => (
                        <label key={g} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="gender" 
                            checked={profileData.gender === g} 
                            disabled={!isEditing} 
                            onChange={() => setProfileData({...profileData, gender: g})}
                            className="w-4 h-4 accent-blue-600" 
                          />
                          <span className="text-sm">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-700">Email Address</p>
                    <InputField value={profileData.email} disabled={!isEditing} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-700">Mobile Number</p>
                    <InputField value={profileData.phone} disabled={!isEditing} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "address" && (
              <motion.div key="address" variants={tabContentVariants} initial="initial" animate="animate" exit="exit">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-800">Manage Addresses</h2>
                  {!showForm && (
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-blue-600 text-sm font-bold border border-slate-200 px-4 py-2 hover:bg-slate-50 transition-all">
                      <Plus size={18} /> ADD A NEW ADDRESS
                    </button>
                  )}
                </div>

                {showForm && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="bg-blue-50/50 border border-blue-100 p-6 mb-8 rounded-sm">
                    <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                      <InputField label="Mobile" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                      <InputField label="Pincode" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} required />
                      <InputField label="Locality" value={formData.locality} onChange={(e) => setFormData({...formData, locality: e.target.value})} required />
                      <textarea 
                        placeholder="Address (Area and Street)" 
                        className="md:col-span-2 w-full border border-slate-200 p-3 text-sm rounded-sm h-24 outline-none focus:border-blue-600"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required
                      />
                      <InputField label="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
                      <InputField label="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required />
                      <div className="md:col-span-2 flex gap-4 mt-2">
                        <button type="submit" className="bg-blue-600 text-white px-10 py-3 rounded-sm font-bold text-sm shadow-md uppercase">Save</button>
                        <button type="button" onClick={() => {setShowForm(false); setEditingId(null)}} className="text-blue-600 font-bold text-sm px-6 uppercase">Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border border-slate-200 p-5 rounded-sm relative group bg-white hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-sm uppercase">{addr.type}</span>
                        <div className="flex gap-4">
                           <button onClick={() => handleEditAddress(addr)} className="text-blue-600 text-xs font-bold hover:underline uppercase">Edit</button>
                           <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="text-red-500 text-xs font-bold hover:underline uppercase">Delete</button>
                        </div>
                      </div>
                      <div className="mt-4 font-bold text-slate-800 flex gap-4">
                        <span>{addr.name}</span>
                        <span>{addr.phone}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2 max-w-md">
                        {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-semibold">{addr.pincode}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}




             {activeTab === "orders" && (
  <motion.div 
    key="orders" 
    variants={tabContentVariants} 
    initial="initial" 
    animate="animate" 
    exit="exit"
  >
    {/* Sirf is line ko change kiya gaya hai */}
    <MyOrders /> 
  </motion.div>
)}



{/* Refund */}


{activeTab === "refund" && (
  <motion.div
    key="refund"
    variants={tabContentVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <Refund />
  </motion.div>
)}

            {activeTab === "qr_verification" && (
              <motion.div key="qr" variants={tabContentVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Product Authenticity Check</h2>
                <div className="max-w-md p-8 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center text-center">
                   <QrCode size={48} className="text-blue-600 mb-4" />
                   <p className="text-slate-600 mb-4 font-medium">Scan the QR code on your product box to verify authenticity.</p>
                   <button className="bg-blue-600 text-white px-6 py-2 rounded-sm font-bold text-sm">OPEN SCANNER</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const SidebarLink = ({ icon, label, active, onClick, showChevron }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${active ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-600"}`}>
    <div className="flex items-center gap-4 font-bold text-sm uppercase">{icon} <span>{label}</span></div>
    {showChevron && <ChevronRight size={16} className="text-slate-400" />}
  </button>
);

const SubLink = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`w-full text-left px-16 py-3 text-sm transition-colors ${active ? "text-blue-600 bg-blue-50/50 font-semibold" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"}`}>
    {label}
  </button>
);

const InputField = ({ label, ...props }) => (
  <div className="w-full space-y-1">
    {label && <label className="text-xs text-slate-400 ml-1 font-bold uppercase">{label}</label>}
    <input {...props} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:bg-white focus:border-blue-500 outline-none transition-all disabled:text-slate-500" />
  </div>
);

export default CustomerDashboard;