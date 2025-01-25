import { useState } from "react";
import supabase from "@/lib/supabase";

export default function LinkForm({ onAdd }) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("links")
      .insert([{ label, url }])
      .select("*");

    if (error) {
      console.error("Error adding link:", error.message);
    } else {
      onAdd(data[0]);
      setLabel("");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control mb-6 bg-base-100 p-4 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-2">Add a New Link</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Label"
          className="input input-bordered w-full"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="url"
          placeholder="URL"
          className="input input-bordered w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Link"}
      </button>
    </form>
  );
}
