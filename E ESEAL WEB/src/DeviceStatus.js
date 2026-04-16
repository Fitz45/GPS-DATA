import React, { useEffect, useState } from "react";
import { database } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function DeviceStatus() {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Listen for device status
    const statusRef = ref(database, "device/status");
    const unsubscribeStatus = onValue(statusRef, (snapshot) => {
      setStatus(snapshot.val());
    });

    // Listen for device logs
    const logsRef = ref(database, "device/logs");
    const unsubscribeLogs = onValue(logsRef, (snapshot) => {
      const logsArr = [];
      snapshot.forEach(child => logsArr.push(child.val()));
      setLogs(logsArr.reverse());
    });

    return () => {
      unsubscribeStatus();
      unsubscribeLogs();
    };
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h3>Device Status</h3>
      <div>Status: <b>{status ? status : "Loading..."}</b></div>
      <h4 style={{ marginTop: 24 }}>Logs</h4>
      <ul style={{ maxHeight: 200, overflowY: "auto", background: "#fafafa", padding: 12, borderRadius: 4 }}>
        {logs.length === 0 && <li>No logs found.</li>}
        {logs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
