import dotenv from "dotenv";
dotenv.config();

const env = process.env.NEXT_PUBLIC_NODE_ENV || "development";

const settings = {
  development: {
    host: process.env.NEXT_PUBLIC_HOST || "localhost",
    port: process.env.NEXT_PUBLIC_PORT || 3000,
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_key: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
  production: {
    mongodb_url: process.env.NEXT_PUBLIC_MONGODB_URL,
  },
};

export default settings[env];
