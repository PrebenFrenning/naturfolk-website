import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, FileEdit, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Dashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    events: 0,
    pages: 0,
    members: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [postsResult, eventsResult, pagesResult, membersResult] = await Promise.all([
      supabase.from('posts').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('pages').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      posts: postsResult.count || 0,
      events: eventsResult.count || 0,
      pages: pagesResult.count || 0,
      members: membersResult.count || 0,
    });
  };

  const statCards = [
    { title: 'Total Posts', value: stats.posts, icon: FileText, color: 'text-blue-600' },
    { title: 'Total Events', value: stats.events, icon: Calendar, color: 'text-green-600' },
    { title: 'Total Pages', value: stats.pages, icon: FileEdit, color: 'text-purple-600' },
    { title: 'Medlemmer', value: stats.members, icon: Users, color: 'text-orange-600' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Nettverket i Norge</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your content management system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Use the sidebar to navigate to different sections and manage your content.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
