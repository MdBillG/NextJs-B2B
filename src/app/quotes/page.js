import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Quotes() {
    const [quotes, setQuotes] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [newQuote, setNewQuote] = useState({ companyId: '', amount: '', description: '' });
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/login');
        } else {
            setToken(storedToken);
            fetchQuotes(storedToken);
            fetchCompanies(storedToken);
        }
    }, []);

    const fetchQuotes = async (authToken, companyId = '') => {
        try {
            const url = companyId ? `/api/quotes?companyId=${companyId}` : '/api/quotes';
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setQuotes(response.data);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            if (error.response && error.response.status === 401) {
                router.push('/login');
            }
        }
    };

    const fetchCompanies = async (authToken) => {
        try {
            const response = await axios.get('/api/companies', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            if (error.response && error.response.status === 401) {
                router.push('/login');
            }
        }
    };

    const handleCompanySelect = (e) => {
        const companyId = e.target.value;
        setSelectedCompany(companyId);
        fetchQuotes(token, companyId);
    };

    const handleInputChange = (e) => {
        setNewQuote({ ...newQuote, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/quotes', {
                ...newQuote,
                amount: parseFloat(newQuote.amount)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewQuote({ companyId: '', amount: '', description: '' });
            fetchQuotes(token, selectedCompany);
        } catch (error) {
            console.error('Error creating quote:', error);
            if (error.response && error.response.status === 401) {
                router.push('/login');
            }
        }
    };

    // ... rest of the component code (handleStatusChange, render method, etc.)
}