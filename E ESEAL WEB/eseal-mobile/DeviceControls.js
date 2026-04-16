import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { database } from "./firebaseConfig";
import { ref, set, get } from "firebase/database";

export default function DeviceControls() {
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
    <View style={styles.container}>
      <Text style={styles.heading}>Device Controls</Text>
      <View style={styles.buttonRow}>
        <Button title="Lock" onPress={handleLock} />
        <View style={{ width: 12 }} />
        <Button title="Unlock" onPress={() => setShowOtpInput(true)} />
        <View style={{ width: 12 }} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      {showOtpInput && (
        <View style={styles.otpRow}>
          <TextInput
            style={styles.otpInput}
            placeholder="Enter OTP to unlock"
            value={otpInput}
            onChangeText={setOtpInput}
          />
          <Button title="Submit OTP" onPress={handleUnlock} />
        </View>
      )}
      {message ? (
        <Text style={{ marginTop: 16, color: message.includes("Invalid") ? "red" : "green" }}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  otpInput: {
    width: 120,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
  },
});
