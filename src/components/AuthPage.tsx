import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create user document with default customer role
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          role: 'customer',
          createdAt: new Date()
        });
      }
      onLogin();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-stone-200 flex items-center justify-center p-6">
      <div className="bg-[#121212] border border-white/10 p-8 w-full max-w-md">
        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-6">
          {isLogin ? 'Login to Your Account' : 'Create Account'}
        </h2>
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-stone-500 uppercase mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/5 p-3 text-sm focus:outline-none focus:border-[#FF3E00] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-stone-500 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/5 p-3 text-sm focus:outline-none focus:border-[#FF3E00] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF3E00] text-white font-mono text-xs uppercase tracking-widest font-bold py-4 hover:bg-orange-600 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-stone-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
