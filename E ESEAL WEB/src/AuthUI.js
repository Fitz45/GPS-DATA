import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function AuthUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ maxWidth: 320, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      {user ? (
        <div>
          <h3>Welcome, {user.email}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <form>
          <h3>Sign In / Register</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button onClick={handleSignIn} style={{ width: "100%", marginBottom: 8 }}>Sign In</button>
          <button onClick={handleSignUp} style={{ width: "100%" }}>Register</button>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
