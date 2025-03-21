import { createClient } from "@supabase/supabase-js";
import setting from "./../../config/setting";

const supabase = createClient(setting.supabase_url, setting.supabase_key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

if (supabase) {
  console.log("Supabase is connected");
}

export default supabase;
