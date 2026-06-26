import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function AccountDashboard({ onLogout }: { onLogout: () => void }) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            setRole('customer'); // fallback
          }
        } catch (e) {
          console.error(e);
          setRole('customer');
        }
      }
      setLoading(false);
    };
    fetchRole();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-stone-200 p-6 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-stone-200 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
            {role === 'admin' ? 'Admin Dashboard' : role === 'employee' ? 'Employee Dashboard' : 'My Account'}
          </h1>
          <button
            onClick={handleLogout}
            className="text-stone-400 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
          >
            Logout
          </button>
        </header>

        {role === 'customer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-white/10 p-6">
              <h3 className="font-mono text-[#FF3E00] uppercase tracking-widest font-bold mb-4">Order History</h3>
              <p className="text-stone-400 text-sm">View your past orders and tracking statuses.</p>
            </div>
            <div className="bg-[#121212] border border-white/10 p-6">
              <h3 className="font-mono text-emerald-500 uppercase tracking-widest font-bold mb-4">Profile Settings</h3>
              <p className="text-stone-400 text-sm">Update your email, password, and shipping address.</p>
            </div>
          </div>
        )}

        {(role === 'admin' || role === 'employee') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {role === 'admin' && (
              <div className="bg-[#121212] border border-white/10 p-6">
                <h3 className="font-mono text-[#FF3E00] uppercase tracking-widest font-bold mb-4">User Management</h3>
                <p className="text-stone-400 text-sm">View customers, employees, and admins. Manage roles and permissions.</p>
              </div>
            )}
            <div className="bg-[#121212] border border-white/10 p-6">
              <h3 className="font-mono text-emerald-500 uppercase tracking-widest font-bold mb-4">Product Catalog & Content</h3>
              <p className="text-stone-400 text-sm">Add, edit, or remove inventory. Manage images, pages, and blog posts.</p>
            </div>
            <div className="bg-[#121212] border border-white/10 p-6">
              <h3 className="font-mono text-blue-500 uppercase tracking-widest font-bold mb-4">Orders, Sales & CRM</h3>
              <p className="text-stone-400 text-sm">Process incoming orders, view sales reports, and manage contact form leads.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
