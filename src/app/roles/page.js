'use client';

import { useState } from 'react';

export default function CreateRole() {
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/roles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    permissions: permissions.split(',').map(p => p.trim())
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Role created successfully');
                setName('');
                setPermissions('');
            } else {
                setMessage(data.errors ? data.errors.join(', ') : 'Failed to create role');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <div>
            <h1>Create Role</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Role Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="permissions">Permissions (comma-separated):</label>
                    <input
                        type="text"
                        id="permissions"
                        value={permissions}
                        onChange={(e) => setPermissions(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Role</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}