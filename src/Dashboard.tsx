import React, { useState } from 'react';
import { filterCourses, getNavigationByRole } from './authService';

const Dashboard: React.FC = () => {
    const [query, setQuery] = useState('');
    const role = 'student';

    const allCourses = [
        { name: 'Основи React' },
        { name: 'TypeScript для професіоналів' },
        { name: 'UI/UX Дизайн' }
    ];

    const filtered = filterCourses(allCourses, query);
    const menu = getNavigationByRole(role);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                {menu.map(item => <span key={item} style={{ marginRight: '15px' }}>{item}</span>)}
            </nav>

            <h1>Мої курси (Вимога R1.5)</h1>
            <input
                type="text"
                placeholder="Пошук курсу..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
            />

            <ul>
                {filtered.map(course => (
                    <li key={course.name} style={{ fontSize: '18px', margin: '10px 0' }}>
                        {course.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;