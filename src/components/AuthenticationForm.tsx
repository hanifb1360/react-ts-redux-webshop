// src/components/AuthenticationForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthenticationFormProps {
  isSignUp: boolean;
  toggleSignUp: () => void;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({ isSignUp, toggleSignUp }) => {
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handles the authentication process based on the form state (sign up or login)
  const handleAuth = async () => {
    setError(null);
    try {
      if (isSignUp) {
        await signUp(email, password); // Calls signUp function from AuthContext
      } else {
        await signIn(email, password); // Calls signIn function from AuthContext
      }
      setEmail(''); // Clear the email input
      setPassword(''); // Clear the password input
    } catch (error: any) {
      setError(error.message); // Sets error message if authentication fails
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">{isSignUp ? 'Sign Up' : 'Login'}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-3 mb-4 w-full rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-3 mb-4 w-full rounded"
      />
      <button onClick={handleAuth} className="bg-blue-500 text-white p-3 w-full rounded mb-4">
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button onClick={toggleSignUp} className="text-blue-500 w-full text-center">
        {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default AuthenticationForm;
