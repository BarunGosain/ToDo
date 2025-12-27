const ENV = {
  local: "http://localhost:3000/api",
  prod: "https://your-vercel-api.vercel.app/api"
};

const API_URL =
  location.hostname === "localhost"
    ? ENV.local
    : ENV.prod;
