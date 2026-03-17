import React, { useState, useEffect } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { Globe, Check, X, AlertCircle, MapPin } from "lucide-react";

interface CountryRestrictionProps {
  allowedCountries: string[];
  couponCode: string;
  onValidationChange: (isValid: boolean, userCountry: string) => void;
}

interface GeolocationData {
  country: string;
  countryCode: string;
  city?: string;
  flag?: string;
}

const CountryRestriction: React.FC<CountryRestrictionProps> = ({
  allowedCountries,
  couponCode,
  onValidationChange
}) => {
  const [userLocation, setUserLocation] = useState<GeolocationData | null>(null);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [manualCountry, setManualCountry] = useState("");
  const [showManualSelect, setShowManualSelect] = useState(false);

  // Common country codes and names
  const countryList = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" }
  ];

  // Simulate geolocation detection
  const detectUserLocation = async () => {
    setLoading(true);
    try {
      // Simulate API call to detect location
      // In production, use a real geolocation service like ip-api.com or maxmind
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      const detectedCountry = data.country_code || "US";
      const detectedCountryName = data.country_name || "United States";

      const location: GeolocationData = {
        country: detectedCountryName,
        countryCode: detectedCountry,
        city: data.city || "Unknown"
      };

      setUserLocation(location);
      validateCoupon(detectedCountry);
    } catch (error) {
      // Fallback to US if API fails
      const fallbackLocation: GeolocationData = {
        country: "United States",
        countryCode: "US",
        city: "Unknown"
      };
      setUserLocation(fallbackLocation);
      validateCoupon("US");
    } finally {
      setLoading(false);
    }
  };

  const validateCoupon = (countryCode: string) => {
    // Check if country code matches allowed countries (case-insensitive)
    const allowed = allowedCountries.some(
      c => c.toUpperCase() === countryCode.toUpperCase()
    );
    setIsAllowed(allowed);
    onValidationChange(allowed, countryCode);
  };

  const handleManualCountrySelect = (selectedCode: string) => {
    const selectedCountry = countryList.find(c => c.code === selectedCode);
    if (selectedCountry) {
      setManualCountry(selectedCode);
      setUserLocation({
        country: selectedCountry.name,
        countryCode: selectedCode,
        flag: selectedCountry.flag
      });
      validateCoupon(selectedCode);
      setShowManualSelect(false);
    }
  };

  useEffect(() => {
    detectUserLocation();
  }, [couponCode]);

  return (
    <div className="space-y-4">
      {/* Location Detection Card */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe size={20} />
            Country Restriction Check
          </h3>
          {loading && (
            <div className="animate-spin">
              <AlertCircle size={20} className="text-blue-400" />
            </div>
          )}
        </div>

        {/* User Location Display */}
        {userLocation && !loading && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Detected Location</p>
                    <p className="text-white font-semibold">
                      {userLocation.country}
                      {userLocation.city && ` • ${userLocation.city}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowManualSelect(!showManualSelect)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium px-3 py-1 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-colors"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Manual Country Selection */}
            {showManualSelect && (
              <div className="border-t border-white/10 pt-4">
                <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">
                  Select Your Country
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {countryList.map(country => (
                    <button
                      key={country.code}
                      onClick={() => handleManualCountrySelect(country.code)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        manualCountry === country.code
                          ? "bg-blue-600 text-white border border-blue-500"
                          : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {country.flag} {country.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Allowed Countries Card */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Allowed Countries</h3>
        <div className="flex flex-wrap gap-2">
          {allowedCountries.map((country, idx) => {
            const countryData = countryList.find(c => c.code.toUpperCase() === country.toUpperCase());
            const isUserCountry = userLocation?.countryCode.toUpperCase() === country.toUpperCase();

            return (
              <div
                key={idx}
                className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                  isUserCountry
                    ? "bg-green-500/20 border border-green-500/50 text-green-300"
                    : "bg-slate-500/20 border border-slate-500/30 text-slate-300"
                }`}
              >
                {countryData?.flag} {country}
                {isUserCountry && <Check size={16} className="ml-1" />}
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Validation Result Card */}
      {!loading && isAllowed !== null && (
        <GlassCard className={`p-6 border ${isAllowed ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${isAllowed ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {isAllowed ? (
                <Check size={24} className="text-green-400" />
              ) : (
                <X size={24} className="text-red-400" />
              )}
            </div>

            <div className="flex-1">
              <p className={`text-lg font-bold ${isAllowed ? "text-green-400" : "text-red-400"}`}>
                {isAllowed ? "✓ Coupon Applicable" : "✗ Coupon Not Available"}
              </p>
              <p className={`text-sm mt-1 ${isAllowed ? "text-green-300/80" : "text-red-300/80"}`}>
                {isAllowed
                  ? `The coupon "${couponCode}" is valid in ${userLocation?.country}. You can apply this coupon to your order.`
                  : `The coupon "${couponCode}" is not available in ${userLocation?.country}. Only available in: ${allowedCountries.join(", ")}`}
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Loading State */}
      {loading && (
        <GlassCard className="p-6 text-center">
          <div className="inline-block animate-spin mb-2">
            <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full" />
          </div>
          <p className="text-slate-400">Detecting your location...</p>
        </GlassCard>
      )}
    </div>
  );
};

export default CountryRestriction;
