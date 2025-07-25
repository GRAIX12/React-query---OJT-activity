// app/components/AddUserForm.tsx
'use client';

import { useState, FormEvent } from "react";
import { User } from "@/app/types/User";
import styles from "@/app/styles/table.module.css";

interface Props {
  onAdd: (user: Omit<User, "id">) => void;
}

export default function AddUserForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onAdd({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className={styles.addButton}>Add User</button>
    </form>
  );
}