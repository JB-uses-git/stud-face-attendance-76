import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  BookOpen, 
  AlertTriangle, 
  TrendingUp, 
  Download,
  Calendar,
  GraduationCap,
  UserCheck
} from 'lucide-react';
import { mockClasses, mockStudents, generateMockAttendance } from '@/types/attendance';

const AdminDashboard = () => {
  // Generate comprehensive analytics data
  const attendanceRecords = generateMockAttendance();
  
  // Overall statistics
  const totalStudents = mockStudents.length;
  const totalClasses = mockClasses.length;
  const totalSessions = attendanceRecords.length / totalStudents;
  
  // Calculate overall attendance rate
  const presentCount = attendanceRecords.filter(record => record.status === 'present').length;
  const overallAttendanceRate = Math.round((presentCount / attendanceRecords.length) * 100);

  // Subject-wise analytics
  const subjectAnalytics = mockClasses.map((subject, index) => {
    const subjectRecords = attendanceRecords.filter(record => record.classId === `class-${index}`);
    const presentInSubject = subjectRecords.filter(record => record.status === 'present').length;
    const attendanceRate = Math.round((presentInSubject / subjectRecords.length) * 100);
    
    return {
      subject: subject.split(' ').slice(0, 2).join(' '), // Shorten names for charts
      attendanceRate,
      totalSessions: subjectRecords.length / totalStudents,
      presentStudents: presentInSubject,
      totalRecords: subjectRecords.length,
    };
  });

  // Students with low attendance (< 75%)
  const lowAttendanceStudents = mockStudents.map(student => {
    const studentRecords = attendanceRecords.filter(record => record.studentId === student.id);
    const studentPresent = studentRecords.filter(record => record.status === 'present').length;
    const attendanceRate = Math.round((studentPresent / studentRecords.length) * 100);
    
    return {
      ...student,
      attendanceRate,
      totalClasses: studentRecords.length,
      attendedClasses: studentPresent,
    };
  }).filter(student => student.attendanceRate < 75);

  // Daily attendance trend (last 7 days)
  const dailyTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayRecords = attendanceRecords.filter(record => record.date === dateStr);
    const dayPresent = dayRecords.filter(record => record.status === 'present').length;
    const attendanceRate = dayRecords.length > 0 ? Math.round((dayPresent / dayRecords.length) * 100) : 0;
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      attendanceRate,
    };
  }).reverse();

  // Color scheme for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const exportReport = (type: 'csv' | 'pdf') => {
    // Simulate report generation
    const fileName = `attendance_report_${new Date().toISOString().split('T')[0]}.${type}`;
    alert(`Generating ${type.toUpperCase()} report: ${fileName}`);
  };

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      subtitle="Comprehensive attendance analytics and system management"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{totalClasses}</p>
                  <p className="text-sm text-muted-foreground">Active Subjects</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overallAttendanceRate}%</p>
                  <p className="text-sm text-muted-foreground">Overall Attendance</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{lowAttendanceStudents.length}</p>
                  <p className="text-sm text-muted-foreground">Below 75%</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
              <CardDescription>Attendance rates across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendanceRate" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Attendance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Trend</CardTitle>
              <CardDescription>Attendance rates over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendanceRate" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Low Attendance Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Students with Low Attendance
                </CardTitle>
                <CardDescription>
                  Students below 75% attendance threshold requiring attention
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => exportReport('csv')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={() => exportReport('pdf')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {lowAttendanceStudents.length > 0 ? (
              <div className="space-y-4">
                {lowAttendanceStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-red-50 border-red-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.rollNumber} • {student.course}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{student.attendedClasses}/{student.totalClasses}</span>
                      </div>
                      <Badge variant="destructive">
                        {student.attendanceRate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-green-600">All students have good attendance!</p>
                <p className="text-sm text-muted-foreground">No students below 75% threshold</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest attendance sessions and system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjectAnalytics.slice(0, 4).map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{mockClasses[index]} Session</p>
                    <p className="text-sm text-muted-foreground">
                      Today • Dr. Sarah Johnson
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={subject.attendanceRate >= 85 ? "default" : "secondary"}>
                      {subject.attendanceRate}% attendance
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;