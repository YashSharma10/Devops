

import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';


import React, { useState } from 'react';

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const handleEdit = (user) => setEditingUser(user);
  const handleSuccess = () => {
    setEditingUser(null);
    setRefresh(r => !r);
  };
  const handleCancel = () => setEditingUser(null);

  return (
    <div className="App" style={{maxWidth:600, margin:'auto', padding:24}}>
      <h1>User Management</h1>
      <UserForm
        user={editingUser}
        onSuccess={handleSuccess}
        onCancel={editingUser ? handleCancel : undefined}
      />
      <hr style={{margin:'32px 0'}} />
      <UserList key={refresh} onEdit={handleEdit} />
    </div>
  );
}

export default App;
