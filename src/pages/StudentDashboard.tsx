import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, BookOpen, AlertTriangle, TrendingUp } from 'lucide-react';
import { generateMockAttendance, mockClasses, mockStudents } from '@/types/attendance';

const StudentDashboard = () => {
  // Generate mock attendance data for the current student
  const studentAttendance = generateMockAttendance().filter(record => record.studentId === '2'); // Alex Kumar
  
  // Calculate subject-wise statistics
  const subjectStats = mockClasses.map((subject, index) => {
    const subjectRecords = studentAttendance.filter(record => record.classId === `class-${index}`);
    const totalClasses = subjectRecords.length;
    const attendedClasses = subjectRecords.filter(record => record.status === 'present').length;
    const percentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
    
    return {
      subject,
      total: totalClasses,
      attended: attendedClasses,
      percentage: Math.round(percentage * 10) / 10,
    };
  });

  const overallStats = {
    totalClasses: subjectStats.reduce((sum, stat) => sum + stat.total, 0),
    attendedClasses: subjectStats.reduce((sum, stat) => sum + stat.attended, 0),
  };
  
  const overallPercentage = overallStats.totalClasses > 0 
    ? Math.round((overallStats.attendedClasses / overallStats.totalClasses) * 100 * 10) / 10
    : 0;

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Data Structures', room: 'Lab-101', date: 'Today' },
    { time: '11:00 AM', subject: 'Computer Networks', room: 'Room-205', date: 'Today' },
    { time: '02:00 PM', subject: 'Database Management', room: 'Lab-102', date: 'Tomorrow' },
    { time: '10:00 AM', subject: 'Operating Systems', room: 'Room-301', date: 'Tomorrow' },
  ];

  const recentActivity = [
    { date: '2024-01-15', subject: 'Data Structures', status: 'present', time: '09:00 AM' },
    { date: '2024-01-14', subject: 'Computer Networks', status: 'present', time: '11:00 AM' },
    { date: '2024-01-13', subject: 'Database Management', status: 'absent', time: '02:00 PM' },
    { date: '2024-01-12', subject: 'Operating Systems', status: 'present', time: '10:00 AM' },
  ];

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPercentageBadgeColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-100 text-green-800';
    if (percentage >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <DashboardLayout 
      title="Student Dashboard" 
      subtitle="Track your attendance and academic progress"
    >
      <div className="space-y-6">
        {/* Overall Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Attendance
            </CardTitle>
            <CardDescription>
              Your attendance summary across all subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overallPercentage}%</p>
                  <p className="text-sm text-muted-foreground">
                    {overallStats.attendedClasses} out of {overallStats.totalClasses} classes attended
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getPercentageBadgeColor(overallPercentage)}>
                    {overallPercentage >= 85 ? 'Excellent' : overallPercentage >= 75 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                  {overallPercentage < 75 && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Below 75% requirement
                    </div>
                  )}
                </div>
              </div>
              <Progress value={overallPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Subject-wise Attendance
            </CardTitle>
            <CardDescription>
              Detailed breakdown by subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{stat.subject}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {stat.attended}/{stat.total}
                      </span>
                      <span className={`font-semibold ${getPercentageColor(stat.percentage)}`}>
                        {stat.percentage}%
                      </span>
                    </div>
                  </div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Upcoming Classes
              </CardTitle>
              <CardDescription>
                Your schedule for the next few days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{classItem.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.time} • {classItem.room}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {classItem.date}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date} • {activity.time}
                      </p>
                    </div>
                    <Badge 
                      variant={activity.status === 'present' ? 'default' : 'destructive'}
                    >
                      {activity.status === 'present' ? 'Present' : 'Absent'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;