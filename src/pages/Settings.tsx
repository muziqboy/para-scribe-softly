
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Palette, Globe } from 'lucide-react';

const Settings = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentTab, setCurrentTab] = useState(tab || 'profile');

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    navigate(`/settings/${value}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-ink-white">
      <Helmet>
        <title>Settings - Paradocs</title>
      </Helmet>

      <Header user={user} currentApp="inkwell" />

      <main className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <Tabs 
            value={currentTab} 
            onValueChange={handleTabChange} 
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-2">
                <Palette size={16} />
                <span>Style</span>
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <Globe size={16} />
                <span>Language</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">User ID</p>
                    <p className="text-gray-500 text-sm truncate">{user?.id}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-ink-accent hover:bg-ink-accent/90" disabled>
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="style">
              <Card>
                <CardHeader>
                  <CardTitle>Inkwell Copilot</CardTitle>
                  <CardDescription>Configure your writing style preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Palette size={32} className="text-ink-accent" />
                    </div>
                    <h3 className="text-xl mb-2">Style Copilot</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Inkwell AI analyzes your writing style and provides suggestions to improve your writing.
                      This feature will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>Choose your preferred language</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['en', 'sv', 'nb', 'da', 'de', 'es', 'pt', 'fr'].map((lang) => (
                      <button
                        key={lang}
                        className={`py-2 px-4 border rounded-md flex items-center justify-center ${
                          lang === 'en' ? 'bg-ink-accent text-white border-ink-accent' : 
                          'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Language selection will be available in a future update.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
