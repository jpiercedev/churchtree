import { useState } from "react";
import supabase from "@/lib/supabase";

export default function Onboarding() {
  const [churchName, setChurchName] = useState("");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(null);

  const handleOnboarding = async (e) => {
    e.preventDefault();

    // Upload the logo
    const logoFileName = `${Date.now()}-${logo.name}`;
    const { data: logoData, error: logoError } = await supabase.storage
      .from("churchtree-assets")
      .upload(logoFileName, logo);

    if (logoError) {
      setError(logoError.message);
      return;
    }

    // Save church info
    const logoUrl = supabase.storage
      .from("churchtree-assets")
      .getPublicUrl(logoFileName).publicUrl;
    const { error: dbError } = await supabase
      .from("churches")
      .insert([{ name: churchName, logo_url: logoUrl }]);

    if (dbError) {
      setError(dbError.message);
    } else {
      alert("Onboarding complete!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleOnboarding}
        className="p-6 bg-base-100 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Onboarding</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Church Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your church name"
            className="input input-bordered"
            value={churchName}
            onChange={(e) => setChurchName(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Upload Logo</span>
          </label>
          <input
            type="file"
            className="input input-bordered"
            onChange={(e) => setLogo(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Complete Onboarding
        </button>
      </form>
    </div>
  );
}
