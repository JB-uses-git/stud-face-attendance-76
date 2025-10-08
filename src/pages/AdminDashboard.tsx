import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  UserCheck,
  Info
} from 'lucide-react';
import { mockClasses, mockStudents, generateMockAttendance } from '@/types/attendance';

const AdminDashboard = () => {
  const [showMealInfoModal, setShowMealInfoModal] = useState(false);
  
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

        {/* Mid Day Meal - Student Information */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Mid Day Meal - Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Beneficiaries</p>
                    <p className="text-2xl font-bold text-blue-900">2,847</p>
                    <p className="text-xs text-blue-700 mt-1">Across all schools</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-200 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Daily Meals Served</p>
                    <p className="text-2xl font-bold text-green-900">2,683</p>
                    <p className="text-xs text-green-700 mt-1">94.2% participation</p>
                  </div>
                  <div className="h-12 w-12 bg-green-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Nutritional Rating</p>
                    <p className="text-2xl font-bold text-orange-900">A+</p>
                    <p className="text-xs text-orange-700 mt-1">Meets WHO standards</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-200 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Program Budget</p>
                    <p className="text-2xl font-bold text-purple-900">₹18.5L</p>
                    <p className="text-xs text-purple-700 mt-1">Monthly allocation</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-200 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mid Day Meal - Analytics */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Mid Day Meal - Analytics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meal Participation Trends */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-sm border border-blue-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-3"></span>
                Meal Participation (Last 7 Days)
              </h4>
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent rounded-lg"></div>
                
                <div className="flex justify-around items-end h-56 bg-white/50 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-6 left-0 right-0 h-px bg-gray-200"></div>
                    <div className="absolute bottom-20 left-0 right-0 h-px bg-gray-100"></div>
                    <div className="absolute bottom-32 left-0 right-0 h-px bg-gray-100"></div>
                    <div className="absolute bottom-44 left-0 right-0 h-px bg-gray-100"></div>
                  </div>
                  
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '142px'}}>
                      <span className="font-semibold">2,580</span>
                    </div>
                    <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Mon</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '155px'}}>
                      <span className="font-semibold">2,720</span>
                    </div>
                    <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Tue</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '148px'}}>
                      <span className="font-semibold">2,640</span>
                    </div>
                    <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Wed</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '160px'}}>
                      <span className="font-semibold">2,800</span>
                    </div>
                    <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Thu</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '151px'}}>
                      <span className="font-semibold">2,683</span>
                    </div>
                    <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Fri</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '138px'}}>
                      <span className="font-semibold">2,540</span>
                    </div>
                    <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Sat</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-gradient-to-t from-red-500 to-red-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-red-600 hover:to-red-500" style={{height: '32px'}}>
                      <span className="font-semibold">0</span>
                    </div>
                    <span className="text-sm mt-2 text-red-600 font-medium group-hover:text-red-700 transition-colors">Sun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* School-Wise Meal Distribution */}
            <div>
              <h4 className="text-md font-medium text-slate-600 mb-4">School-wise Meal Distribution</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left p-3 text-sm font-medium text-slate-600">School</th>
                      <th className="text-right p-3 text-sm font-medium text-slate-600">Students</th>
                      <th className="text-right p-3 text-sm font-medium text-slate-600">Served</th>
                      <th className="text-right p-3 text-sm font-medium text-slate-600">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 text-sm">Primary School A</td>
                      <td className="p-3 text-sm text-right">847</td>
                      <td className="p-3 text-sm text-right">823</td>
                      <td className="p-3 text-sm text-right">
                        <Badge className="bg-green-100 text-green-800">97.2%</Badge>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm">Middle School B</td>
                      <td className="p-3 text-sm text-right">1,245</td>
                      <td className="p-3 text-sm text-right">1,187</td>
                      <td className="p-3 text-sm text-right">
                        <Badge className="bg-green-100 text-green-800">95.3%</Badge>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm">High School C</td>
                      <td className="p-3 text-sm text-right">755</td>
                      <td className="p-3 text-sm text-right">673</td>
                      <td className="p-3 text-sm text-right">
                        <Badge className="bg-yellow-100 text-yellow-800">89.1%</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <Dialog open={showMealInfoModal} onOpenChange={setShowMealInfoModal}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      <Info className="w-4 h-4 mr-2" />
                      View Program Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-slate-800">Mid Day Meal Program - Admin Overview</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-700 mb-3">Program Overview</h3>
                          <div className="space-y-2 text-sm text-slate-600">
                            <p><strong>Total Schools:</strong> 127 schools enrolled</p>
                            <p><strong>Coverage Area:</strong> 15 districts</p>
                            <p><strong>Implementation Partner:</strong> Ministry of Education</p>
                            <p><strong>Program Duration:</strong> 2024-2029 (5 years)</p>
                            <p><strong>Quality Standards:</strong> WHO/UNICEF approved</p>
                            <p><strong>Monitoring Frequency:</strong> Weekly inspections</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-700 mb-3">Key Performance Indicators</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Enrollment Rate</span>
                                <span>98.5%</span>
                              </div>
                              <Progress value={98.5} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Daily Participation</span>
                                <span>94.2%</span>
                              </div>
                              <Progress value={94.2} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Nutrition Standards</span>
                                <span>96.8%</span>
                              </div>
                              <Progress value={96.8} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Budget Utilization</span>
                                <span>87.3%</span>
                              </div>
                              <Progress value={87.3} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;