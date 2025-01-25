import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function PublicPage({ username }) {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username, background_image_url, church_id")
        .eq("username", username)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }

      setUser(userData);

      const { data: linksData, error: linksError } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", userData.id)
        .order("order_index", { ascending: true });

      if (linksError) {
        console.error("Error fetching links:", linksError.message);
      } else {
        setLinks(linksData);
      }
    };

    fetchData();
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${user.background_image_url})`,
        backgroundSize: "cover"
      }}
    >
      <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          {user.username}'s ChurchTree
        </h1>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                className="btn btn-primary w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Fetch username from URL
export async function getServerSideProps({ params }) {
  return {
    props: { username: params.username }
  };
}
