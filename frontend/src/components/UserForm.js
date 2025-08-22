import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/users';

function UserForm({ user, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(user ? `${API_URL}/${user.id}` : API_URL, {
        method: user ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save user');
      setForm({ name: '', email: '' });
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleChange} required type="email" />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : (user ? 'Update' : 'Create')}</button>
        {onCancel && <button type="button" onClick={onCancel} style={{marginLeft:8}}>Cancel</button>}
      </form>
    </div>
  );
}

export default UserForm;
