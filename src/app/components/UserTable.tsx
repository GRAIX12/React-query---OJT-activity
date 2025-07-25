// app/components/UserTable.tsx
'use client';

import { User } from "@/app/types/User";
import styles from "@/app/styles/table.module.css";

interface Props {
  users: User[];
  onEdit: (u: User) => void;
  onRemove: (id: number) => void;
}

export default function UserTable({ users, onEdit, onRemove }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td className={styles.td}>{u.id}</td>
            <td className={styles.td}>{u.name}</td>
            <td className={styles.td}>{u.email}</td>
            <td className={styles.td}>
              <div className={styles.actions}>
                <button
                  className={styles.updateButton}
                  onClick={() => onEdit(u)}
                >
                  Edit
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => onRemove(u.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}