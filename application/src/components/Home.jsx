import React from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <button onClick={() => navigate('/register')} > Register </button>
        </div>
    )
}
