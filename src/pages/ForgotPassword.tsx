import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ForgotPasswordState {
  step: 'email' | 'success';
  email: string;
  isLoading: boolean;
  error: string | null;
}

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  
  const [state, setState] = useState<ForgotPasswordState>({
    step: 'email',
    email: '',
    isLoading: false,
    error: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email) {
      setState(prev => ({ ...prev, error: 'Please enter your email address' }));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll always show success
      setState(prev => ({ 
        ...prev, 
        step: 'success', 
        isLoading: false 
      }));
      
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to send reset email. Please try again.' 
      }));
    }
  };

  const handleResendEmail = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call to resend email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to resend email. Please try again.' 
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      email: e.target.value,
      error: null
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="dashboard-card-elevated">
          <CardHeader className="space-y-4 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src="/unsaidtalks-logo-new.png" 
                alt="UnsaidTalks - Unfold Success From Untold Experiences" 
                className="h-12 w-auto"
              />
            </div>

            <CardTitle className="text-2xl">
              {state.step === 'email' ? 'Forgot Password?' : 'Check Your Email'}
            </CardTitle>
            
            <CardDescription>
              {state.step === 'email' 
                ? "No worries! Enter your email address and we'll send you a link to reset your password."
                : `We've sent a password reset link to ${state.email}`
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {state.step === 'email' ? (
              <>
                {/* Email Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={state.email}
                        onChange={handleEmailChange}
                        className="pl-10"
                        required
                        disabled={state.isLoading}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    disabled={state.isLoading}
                    size="lg"
                  >
                    {state.isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="text-center">
                  <Link to="/login">
                    <Button variant="link" className="text-sm">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-foreground-muted text-sm">
                      If an account with that email exists, we've sent you a password reset link.
                    </p>
                    <p className="text-foreground-muted text-sm">
                      Please check your email and follow the instructions to reset your password.
                    </p>
                  </div>

                  {/* Resend Email */}
                  <div className="pt-4">
                    <p className="text-sm text-foreground-muted mb-2">
                      Didn't receive the email?
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleResendEmail}
                      disabled={state.isLoading}
                      className="w-full"
                    >
                      {state.isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend Email
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Back to Login */}
                  <div className="pt-4 border-t border-border">
                    <Link to="/login">
                      <Button variant="link" className="text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-foreground-muted">
            Need more help?{' '}
            <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary-dark">
              Contact Support
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;