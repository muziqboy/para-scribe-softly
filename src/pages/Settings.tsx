
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-ink-white text-ink-black">
      <Helmet>
        <title>Settings - Inkwell</title>
      </Helmet>
      
      <Header user={user} currentApp="inkwell" />
      
      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="max-w-3xl">
          <Card className="bg-white border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle>Writing Style</CardTitle>
              <CardDescription>Inkwell Copilot writing style settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Copilot features will be available in a future update. Stay tuned!
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                
                {user.user_metadata?.full_name && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Name</h3>
                    <p className="text-gray-600">{user.user_metadata.full_name}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Account Created</h3>
                  <p className="text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
