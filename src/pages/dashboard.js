import { useEffect, useState } from "react";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch("/api/links?userId=user123");
      const data = await response.json();
      setLinks(data);
    };

    fetchLinks();
  }, []);

  return (
    <div>
      <h1>Your Links</h1>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
