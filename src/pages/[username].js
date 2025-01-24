import supabase from "../lib/supabase";

export async function getServerSideProps(context) {
  const { username } = context.params;

  const { data, error } = await supabase
    .from("users")
    .select("id, links")
    .eq("username", username)
    .single();

  if (!data || error) {
    return { notFound: true };
  }

  return {
    props: {
      username,
      links: data.links
    }
  };
}

export default function UserPage({ username, links }) {
  return (
    <div>
      <h1>{username}'s Links</h1>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
