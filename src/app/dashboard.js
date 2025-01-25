import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import LinkForm from "@/components/LinkForm";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Error fetching links:", error.message);
      } else {
        setLinks(data);
      }
      setLoading(false);
    };

    fetchLinks();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) {
      console.error("Error deleting link:", error.message);
    } else {
      setLinks(links.filter((link) => link.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <LinkForm onAdd={(newLink) => setLinks([...links, newLink])} />
      {loading ? (
        <p>Loading links...</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex justify-between items-center p-4 bg-base-100 shadow rounded-lg"
            >
              <div>
                <a
                  href={link.url}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </div>
              <button
                onClick={() => handleDelete(link.id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
