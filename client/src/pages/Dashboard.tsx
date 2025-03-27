import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getQueryFn } from '@/lib/queryClient';

// Types for our analytics data
interface DailyStats {
  id: number;
  date: string;
  signupCount: number;
  totalReferrals: number;
  conversionRate: number;
}

interface GeographicStats {
  id: number;
  region: string;
  userCount: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
}

interface ReferralChannel {
  id: number;
  channelName: string;
  referralCount: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
}

interface WaitlistEntry {
  id: number;
  email: string;
  fullName: string;
  referralCode: string;
  referralCount: number;
  referredBy?: string;
  createdAt: string;
}

interface AnalyticsOverview {
  totalSignups: number;
  totalReferrals: number;
  avgReferralsPerUser: number;
  topReferrers: WaitlistEntry[];
  dailyStats: DailyStats[];
  topChannels: ReferralChannel[];
  topRegions: GeographicStats[];
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Query for analytics overview data
  const { 
    data: overviewData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['/api/analytics/overview'],
    queryFn: getQueryFn<AnalyticsOverview>({ on401: 'returnNull' }),
    enabled: isAuthenticated,
  });

  // Handle authentication
  const handleAuthenticate = () => {
    localStorage.setItem('adminApiKey', apiKey);
    setIsAuthenticated(true);
    refetch();
  };

  if (!isAuthenticated) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>PEOCHAIN Analytics Dashboard</CardTitle>
            <CardDescription>Enter your API key to access analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                type="password" 
                placeholder="Enter API Key" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
              />
              <Button onClick={handleAuthenticate}>Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (isError || !overviewData) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              {error instanceof Error 
                ? error.message 
                : "Failed to load analytics data. Please check your API key and try again."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsAuthenticated(false)}>
              Try Different API Key
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format data for charts
  const formatDateStr = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const dailyStatsChartData = overviewData.dailyStats
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(stat => ({
      name: formatDateStr(stat.date),
      Signups: stat.signupCount,
      Referrals: stat.totalReferrals
    }));

  const topRegionsChartData = overviewData.topRegions.map(region => ({
    name: region.region,
    value: region.userCount
  }));

  const referralChannelsChartData = overviewData.topChannels.map(channel => ({
    name: channel.channelName,
    value: channel.referralCount
  }));

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">PEOCHAIN Analytics Dashboard</h1>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Logout
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.totalSignups.toLocaleString()}</div>

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            window.location.href = '/api/analytics/export';
          }}
        >
          Export Analytics Data
        </Button>
      </div>

          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.totalReferrals.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Referrals Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.avgReferralsPerUser.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different analytics views */}
      <Tabs defaultValue="daily">
        <TabsList className="mb-4">
          <TabsTrigger value="daily">Daily Stats</TabsTrigger>
          <TabsTrigger value="referrers">Top Referrers</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="channels">Referral Channels</TabsTrigger>
        </TabsList>

        {/* Daily Stats Tab */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Signups & Referrals</CardTitle>
              <CardDescription>
                Tracking user acquisition and referral performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyStatsChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Signups" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Referrals" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Referrers Tab */}
        <TabsContent value="referrers">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>
                Users who have referred the most new signups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={overviewData.topReferrers.map(referrer => ({
                      name: referrer.email.split('@')[0] + '...',
                      Referrals: referrer.referralCount
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="Referrals" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Top Referrers Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {overviewData.topReferrers.map((referrer) => (
                        <tr key={referrer.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{referrer.fullName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{referrer.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{referrer.referralCode}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{referrer.referralCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                User distribution by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topRegionsChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {topRegionsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referral Channels Tab */}
        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Referral Channels</CardTitle>
              <CardDescription>
                Distribution of users by referral source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={referralChannelsChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" name="Referrals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}