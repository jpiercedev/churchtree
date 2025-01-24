import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", userId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
