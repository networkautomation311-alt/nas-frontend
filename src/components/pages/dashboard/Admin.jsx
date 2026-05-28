import { useState } from 'react';

const Admin = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            setItems(prevItems => [...prevItems, trimmedValue]);
            setInputValue('');
        }
    };

    return (
        <div>
            <h2>Admin Add Panel</h2>
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Enter new item"
            />
            <button onClick={handleAdd} disabled={!inputValue.trim()}>Add</button>
            <ul>
                {items.map((item, idx) => (
                    <li key={`${item}-${idx}`}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;