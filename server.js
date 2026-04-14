import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🔐 Replace these
const SUPABASE_URL = "https://skiobwufqhlshehwbzcs.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNraW9id3VmcWhsc2hlaHdiemNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzk0ODIsImV4cCI6MjA5MTc1NTQ4Mn0.qcNZvvL4GTVx-f7h_63ijtGdTfLvNlEfpW-BT-mkwFw";

app.post("/gps", async (req, res) => {
  try {
    const { lat, lng, time } = req.body;

    console.log("Incoming:", req.body);

    const response = await fetch(`${SUPABASE_URL}/rest/v1/gps_data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
        time: time
      })
    });

    const data = await response.text();
    console.log("Supabase response:", data);

    res.status(200).send("OK");

  } catch (err) {
    console.error(err);
    res.status(500).send("ERROR");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});