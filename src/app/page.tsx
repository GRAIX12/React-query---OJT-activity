// app/page.tsx
'use client';

import { useEffect, useState } from "react";
import { User } from "@/app/types/User";
import { useUsers } from '@/app/hooks/useUsers';
import UserTable from "@/app/components/UserTable";
import AddUserForm from "@/app/components/AddUserForm";
import EditUserModal from "@/app/components/EditUserModal";

export default function Page() {
  const { data, isLoading, error } = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const addUser = (u: Omit<User, "id">) => {
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers([...users, { id: nextId, ...u }]);
  };

  const updateUser = (u: User) => {
    setUsers(users.map((old) => (old.id === u.id ? u : old)));
  };

  const removeUser = (id: number) => {
    // Filter out the user to be deleted
    const updatedUsers = users.filter((u) => u.id !== id);
    
    // Renumber the IDs sequentially starting from 1
    const renumberedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1
    }));
    
    setUsers(renumberedUsers);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Users</h1>
      <AddUserForm onAdd={addUser} />
      <UserTable users={users} onEdit={setEditing} onRemove={removeUser} />
      <EditUserModal
        user={editing}
        onUpdate={updateUser}
        onClose={() => setEditing(null)}
      />
    </main>
  );
}