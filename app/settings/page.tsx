// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './settings.module.css';
import { redirect } from 'next/navigation';

interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  type: string;
  location: {
    street: string;
    number: number;
    zipcode: number;
    country: string;
    notes: string;
  };
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile data');
      }
    };

    if (session) {
      fetchProfile();
    }else{
      redirect("/login");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      setMessage('Profile updated successfully');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (err) {
      setError('Failed to update profile');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
    }
  };

  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Please sign in to view your profile
        </div>
      </div>
    );
  }

  if (!profile) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Profile Information</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={profile.name}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={profile.username}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={profile.email}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">User Type</label>
            <input
              id="type"
              type="text"
              value={profile.type}
              disabled={true}
              className={styles.input}
            />
          </div>

          <div className={styles.section}>
            <h2 className={styles.subtitle}>Location Information</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                value={profile.location.street}
                disabled={!isEditing}
                onChange={(e) => setProfile({
                  ...profile,
                  location: { ...profile.location, street: e.target.value }
                })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="number">Number</label>
              <input
                id="number"
                type="number"
                value={profile.location.number}
                disabled={!isEditing}
                onChange={(e) => setProfile({
                  ...profile,
                  location: { ...profile.location, number: parseInt(e.target.value) }
                })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="zipcode">Zipcode</label>
              <input
                id="zipcode"
                type="number"
                value={profile.location.zipcode}
                disabled={!isEditing}
                onChange={(e) => setProfile({
                  ...profile,
                  location: { ...profile.location, zipcode: parseInt(e.target.value) }
                })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={profile.location.country}
                disabled={!isEditing}
                onChange={(e) => setProfile({
                  ...profile,
                  location: { ...profile.location, country: e.target.value }
                })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={profile.location.notes}
                disabled={!isEditing}
                onChange={(e) => setProfile({
                  ...profile,
                  location: { ...profile.location, notes: e.target.value }
                })}
                className={styles.textarea}
              />
            </div>
          </div>

          {message && (
            <div className={styles.success}>{message}</div>
          )}

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          <div className={styles.buttonGroup}>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={styles.button}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.button}
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}