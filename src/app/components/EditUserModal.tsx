// app/components/EditUserModal.tsx
'use client';

import { FormEvent, useState, useEffect } from "react";
import { User } from "@/app/types/User";
import styles from "@/app/styles/table.module.css";

interface Props {
  user: User | null;
  onUpdate: (u: User) => void;
  onClose: () => void;
}

export default function EditUserModal({ user, onUpdate, onClose }: Props) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, name, email });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h2>Update User</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <button type="submit" className={styles.updateButton}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}