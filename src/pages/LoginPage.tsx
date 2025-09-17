import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Shield, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | 'admin'>('teacher');

  // Demo credentials for easy testing
  const demoCredentials = {
    teacher: { email: 'teacher@college.edu', name: 'Dr. Sarah Johnson' },
    student: { email: 'student@college.edu', name: 'Alex Kumar' },
    admin: { email: 'admin@college.edu', name: 'Prof. Michael Chen' },
  };

  useEffect(() => {
    setEmail(demoCredentials[selectedRole].email);
    setPassword('demo123');
  }, [selectedRole]);

  // Redirect based on user role
  if (user) {
    switch (user.role) {
      case 'teacher':
        return <Navigate to="/teacher" replace />;
      case 'student':
        return <Navigate to="/student" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MarkMe</h1>
          <p className="text-white/90">AI-Powered Smart Attendance System</p>
        </div>

        <Card className="shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>
              Select your role and enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {([
                { role: 'teacher', icon: Users, label: 'Teacher' },
                { role: 'student', icon: GraduationCap, label: 'Student' },
                { role: 'admin', icon: Shield, label: 'Admin' },
              ] as const).map(({ role, icon: Icon, label }) => (
                <Button
                  key={role}
                  type="button"
                  variant={selectedRole === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col items-center gap-1 h-auto py-3 ${
                    selectedRole === role ? 'shadow-glow' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>

            {/* Demo Info */}
            <div className="bg-muted p-3 rounded-lg mb-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Demo Account:</p>
              <p className="text-sm">{demoCredentials[selectedRole].name}</p>
              <p className="text-xs text-muted-foreground">Password: demo123</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-white/80 text-sm">
          <p>© 2024 MarkMe - AI-Powered Smart Attendance System</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;