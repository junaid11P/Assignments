'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success(isLogin ? 'Welcome back!' : 'Registration successful! Please login.');

      if (isLogin) {
        router.push('/portfolio');
      } else {
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-container w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl mb-2">
            <span className="text-gradient">Twenty20</span> Projects
          </h1>
          <p className="text-text-secondary">Secure Gateway to Innovation</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg transition-all ${isLogin ? 'bg-white/10 border border-white/20' : 'text-text-secondary hover:text-white'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg transition-all ${!isLogin ? 'bg-white/10 border border-white/20' : 'text-text-secondary hover:text-white'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-3.5 text-text-secondary" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                className="input-field pl-10"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-text-secondary" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="input-field pl-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-text-secondary" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="input-field pl-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="liquid-btn w-full mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : isLogin ? (
              <><LogIn size={20} /> Login</>
            ) : (
              <><UserPlus size={20} /> Create Account</>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-text-secondary">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Register now' : 'Log in here'}
          </button>
        </p>
      </div>
    </main>
  );
}
