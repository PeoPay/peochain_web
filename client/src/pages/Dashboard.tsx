import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtime } from "@/hooks/use-realtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

// Analytics dashboard component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Setup real-time connection
  const { subscribeToWaitlist, isConnected } = useRealtime({
    autoConnect: true,
    notifyOnReconnect: true
  });
  
  // Real-time stats
  const [realtimeStats, setRealtimeStats] = useState({
    totalSignups: 0,
    totalReferrals: 0,
    recentSignups: [] as { email: string; time: string }[]
  });
  
  // Fetch analytics data
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['/api/analytics/overview'],
    enabled: true
  });
  
  // Fetch daily stats
  const { data: dailyStats } = useQuery({
    queryKey: ['/api/analytics/daily-stats'],
    enabled: true
  });

  // Subscribe to realtime waitlist events
  useEffect(() => {
    const unsubscribe = subscribeToWaitlist((event) => {
      if (event.type === 'NEW_SIGNUP') {
        setRealtimeStats(prev => ({
          ...prev,
          totalSignups: prev.totalSignups + 1,
          recentSignups: [
            { email: event.email, time: new Date().toLocaleTimeString() },
            ...prev.recentSignups.slice(0, 9)
          ]
        }));
      } else if (event.type === 'NEW_REFERRAL') {
        setRealtimeStats(prev => ({
          ...prev,
          totalReferrals: prev.totalReferrals + 1
        }));
      } else if (event.type === 'ANALYTICS_UPDATE') {
        setRealtimeStats(prev => ({
          ...prev,
          totalSignups: event.totalSignups,
          totalReferrals: event.totalReferrals
        }));
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [subscribeToWaitlist]);

  // Sample colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">PeoChain Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time waitlist and blockchain analytics
            {isConnected && (
              <span className="inline-flex ml-2 items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                <span className="text-sm text-green-600">Live</span>
              </span>
            )}
          </p>
        </div>
      </div>
      
      {/* Quick stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Total Signups</CardTitle>
            <CardDescription>Overall waitlist registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {isLoading ? "..." : realtimeStats.totalSignups || (analyticsData?.data?.totalSignups || 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Total Referrals</CardTitle>
            <CardDescription>Successful user referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {isLoading ? "..." : realtimeStats.totalReferrals || (analyticsData?.data?.totalReferrals || 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Avg. Referrals</CardTitle>
            <CardDescription>Average referrals per user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {isLoading ? "..." : (analyticsData?.data?.avgReferralsPerUser || 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed analytics tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Daily Signup Trend</CardTitle>
              <CardDescription>User signups over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyStats?.data || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="signupCount" stroke="#8884d8" activeDot={{ r: 8 }} name="Signups" />
                    <Line type="monotone" dataKey="totalReferrals" stroke="#82ca9d" name="Referrals" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Users with most successful referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData?.data?.topReferrers?.slice(0, 10).map((ref: any) => ({
                      name: ref.fullName.length > 15 ? ref.fullName.slice(0, 15) + '...' : ref.fullName,
                      count: ref.referralCount
                    })) || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Referrals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="geography">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>User distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData?.data?.topRegions?.slice(0, 5).map((region: any) => ({
                        name: region.region,
                        value: region.userCount
                      })) || []}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(analyticsData?.data?.topRegions || []).map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Signups</CardTitle>
              <CardDescription>Latest waitlist registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 overflow-auto">
                {realtimeStats.recentSignups.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No recent signups. Waiting for new registrations...
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {realtimeStats.recentSignups.map((signup, index) => (
                      <li key={index} className="border-b pb-2 flex justify-between items-center">
                        <span className="font-medium">{signup.email}</span>
                        <span className="text-sm text-muted-foreground">{signup.time}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}