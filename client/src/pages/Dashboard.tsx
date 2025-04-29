import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useRealtime } from "../hooks/use-realtime";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected, realtimeStats } = useRealtime();

  useEffect(() => {
    // Fetch analytics data when component mounts
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/analytics/overview", {
          headers: {
            "x-api-key": "peochain-analytics-2025" // This should come from a secure source in production
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        } else {
          console.error("Failed to fetch analytics data");
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

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
              {/* Chart would go here */}
              <div className="h-80 w-full bg-muted/20 flex items-center justify-center">
                {isLoading ? (
                  <p>Loading chart data...</p>
                ) : (
                  <p>Chart visualization would render here</p>
                )}
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
              {isLoading ? (
                <p>Loading referral data...</p>
              ) : (
                <ul className="space-y-2">
                  {(analyticsData?.data?.topReferrers || []).slice(0, 5).map((referrer: any, index: number) => (
                    <li key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{referrer.fullName}</span>
                        <span className="text-sm text-muted-foreground">({referrer.email})</span>
                      </div>
                      <span className="font-bold">{referrer.referralCount} referrals</span>
                    </li>
                  ))}
                </ul>
              )}
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
              {/* Geo chart would go here */}
              <div className="h-80 w-full bg-muted/20 flex items-center justify-center">
                {isLoading ? (
                  <p>Loading geographic data...</p>
                ) : (
                  <p>Geographic visualization would render here</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Live Activity</CardTitle>
              <CardDescription>Real-time signups and referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Recent Signups</h3>
                {!isConnected ? (
                  <p className="text-sm text-muted-foreground">WebSocket connection not established. Real-time updates unavailable.</p>
                ) : (
                  <ul className="space-y-2">
                    {/* This would be populated with live data */}
                    {(realtimeStats.recentSignups || []).map((signup: any) => (
                      <li key={signup.id} className="flex justify-between items-center p-2 text-sm">
                        <span>{signup.email}</span>
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