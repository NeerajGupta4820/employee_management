import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { handleApiError } from '../utils/helpers';

const UserProfilePage = () => {
  const { data: profile, loading, error, request } = useApi(getUserProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [formError, setFormError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState(null);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (profile) setForm({ name: profile.name, email: profile.email });
  }, [profile]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await updateUserProfile(form);
      setEditMode(false);
      request();
    } catch (err) {
      setFormError(handleApiError(err));
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{handleApiError(error)}</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <form onSubmit={handleProfileUpdate} className="space-y-4 mb-6">
        <div>
          <label className="block">Name</label>
          <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" disabled={!editMode} />
        </div>
        <div>
          <label className="block">Email</label>
          <input name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full" disabled={!editMode} />
        </div>
        {formError && <div className="text-red-500">{formError}</div>}
        <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>}
      </form>
      {/* <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label className="block">New Password</label>
          <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Change Password</button>
        {passwordMsg && <div className="mt-2 text-green-500">{passwordMsg}</div>}
      </form> */}
    </div>
  );
};

export default UserProfilePage;
