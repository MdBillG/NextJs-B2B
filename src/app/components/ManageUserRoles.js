// src/app/components/ManageUserRoles.js

'use client';

import { useState, useEffect } from 'react';

export default function ManageUserRoles() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
    };

    const fetchRoles = async () => {
        const response = await fetch('/api/roles/get-role');
        const data = await response.json();
        setRoles(data);
    };

    const updateUserRole = async (userId, roleId) => {
        setMessage('');
        try {
            const response = await fetch('/api/users/update-role', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, roleId }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('User role updated successfully');
                fetchUsers(); // Refresh the user list
            } else {
                setMessage(data.error || 'Failed to update user role');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <div>
            <h2>Manage User Roles</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th>New Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.roleId ? user.roleId : 'No role'}</td>
                            <td>
                                <select
                                    defaultValue={user.roleId || ''}
                                    value={roles}
                                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                                >
                                    <option value="">Select a role</option>
                                    {roles?.map((role) => (
                                        <option key={role._id} value={role._id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => updateUserRole(user._id, user.roleId)}>
                                    Update Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {message && <p>{message}</p>}
        </div>
    );
}