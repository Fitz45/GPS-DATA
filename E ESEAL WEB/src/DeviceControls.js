import React, { useState } from "react";
import { database } from "./firebaseConfig";
import { ref, set, get } from "firebase/database";

  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Fetch OTP generated during lock (should be set by backend/ESP32)
  const fetchOtp = async () => {
    const otpRef = ref(database, "device/otp");
    const snapshot = await get(otpRef);
    if (snapshot.exists()) {
      setOtp(snapshot.val());
    } else {
      setOtp("");
    }
  };

  const handleLock = async () => {
    try {
      await set(ref(database, "device/command"), "LOCK");
      setMessage("Lock command sent!");
      setShowOtpInput(true);
      await fetchOtp();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Failed to send lock command.");
    }
  };

  const handleUnlock = async () => {
    if (otpInput === otp && otp !== "") {
      await set(ref(database, "device/command"), "UNLOCK");
      setMessage("Unlock command sent!");
      setShowOtpInput(false);
      setOtpInput("");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("Invalid OTP. Try again.");
    }
  };

  const handleReset = async () => {
    await set(ref(database, "device/command"), "RESET");
    setMessage("Reset command sent!");
    setShowOtpInput(false);
    setOtpInput("");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h3>Device Controls</h3>
      <button onClick={handleLock} style={{ marginRight: 12 }}>Lock</button>
      <button onClick={() => setShowOtpInput(true)} style={{ marginRight: 12 }}>Unlock</button>
      <button onClick={handleReset}>Reset</button>
      {showOtpInput && (
        <div style={{ marginTop: 16 }}>
          <input
            type="text"
            placeholder="Enter OTP to unlock"
            value={otpInput}
            onChange={e => setOtpInput(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <button onClick={handleUnlock}>Submit OTP</button>
        </div>
      )}
      {message && <div style={{ marginTop: 16, color: message.includes("Invalid") ? "red" : "green" }}>{message}</div>}
    </div>
  );
}
