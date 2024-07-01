"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Companies() {
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState({ name: '', location: '', type: 'unit', users: [] });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('/api/companies');
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/companies', newCompany);
            setNewCompany({ name: '', location: '', type: 'unit', users: [] });
            fetchCompanies();
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    return (
        <div>
            <h1>Companies</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newCompany.name}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={newCompany.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    required
                />
                <select name="type" value={newCompany.type} onChange={handleInputChange}>
                    <option value="unit">Unit</option>
                    <option value="division">Division</option>
                </select>
                <button type="submit">Create Company</button>
            </form>
            <ul>
                {companies.map(company => (
                    <li key={company._id}>
                        {company.name} - {company.location} ({company.type})
                    </li>
                ))}
            </ul>
        </div>
    );
}