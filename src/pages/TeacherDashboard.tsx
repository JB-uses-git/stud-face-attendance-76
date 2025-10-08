import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Users, CheckCircle, Clock, AlertCircle, Info } from 'lucide-react';
import { mockClasses, mockStudents } from '@/types/attendance';
import AttendanceCameraModal from '@/components/AttendanceCameraModal';

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [showMealInfoModal, setShowMealInfoModal] = useState(false);

  const todaysClasses = [
    { time: '09:00 AM', subject: 'Data Structures', class: 'CS-3A', status: 'completed' },
    { time: '11:00 AM', subject: 'Computer Networks', class: 'CS-3B', status: 'ongoing' },
    { time: '02:00 PM', subject: 'Database Management', class: 'CS-3A', status: 'upcoming' },
    { time: '04:00 PM', subject: 'Operating Systems', class: 'CS-3C', status: 'upcoming' },
  ];

  const recentAttendance = [
    { subject: 'Data Structures', date: '2025-01-15', present: 68, total: 72, percentage: 94.4 },
    { subject: 'Computer Networks', date: '2025-01-14', present: 65, total: 72, percentage: 90.3 },
    { subject: 'Database Management', date: '2025-01-13', present: 59, total: 72, percentage: 81.9 },
    { subject: 'Operating Systems', date: '2025-01-12', present: 62, total: 72, percentage: 86.1 },
    { subject: 'Software Engineering', date: '2025-01-11', present: 58, total: 72, percentage: 80.6 },
  ];

  const handleTakeAttendance = () => {
    if (!selectedClass || !selectedSection || !selectedSemester || !selectedSubject) {
      alert('Please select branch, section, semester, and subject first');
      return;
    }
    setShowCamera(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'upcoming':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout 
      title="Teacher Dashboard" 
      subtitle="Manage attendance and monitor class progress"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Take Attendance
            </CardTitle>
            <CardDescription>
              Select branch, section, semester, and subject to start attendance capture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Branch</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="AIML">AIML</SelectItem>
                    <SelectItem value="DS">DS</SelectItem>
                    <SelectItem value="CYSE">CYSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Section</label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I">I</SelectItem>
                    <SelectItem value="II">II</SelectItem>
                    <SelectItem value="III">III</SelectItem>
                    <SelectItem value="IV">IV</SelectItem>
                    <SelectItem value="V">V</SelectItem>
                    <SelectItem value="VI">VI</SelectItem>
                    <SelectItem value="VII">VII</SelectItem>
                    <SelectItem value="VIII">VIII</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((subject, index) => (
                      <SelectItem key={index} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleTakeAttendance}
                  className="w-full"
                  disabled={!selectedClass || !selectedSemester || !selectedSection || !selectedSubject}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Capture
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(classItem.status)}
                    <div>
                      <p className="font-medium">{classItem.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.time} • {classItem.class}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(classItem.status)}>
                    {classItem.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance Records</CardTitle>
            <CardDescription>Latest attendance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{record.present}/{record.total}</span>
                    </div>
                    <Badge 
                      variant={record.percentage >= 85 ? "default" : "destructive"}
                      className="mt-1"
                    >
                      {record.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mid Day Meal Information Section */}
      <div className="space-y-6 mt-8">
        {/* Combined Mid Day Meal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Mid Day Meal Information
              </span>
              <Button 
                onClick={() => setShowMealInfoModal(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                View Program Details
              </Button>
            </CardTitle>
            <CardDescription>
              Student enrollment, meal service statistics, and analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Basic Student Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-blue-50 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-blue-600 mb-2">Total Enrolled Students</h4>
                  <div className="text-2xl font-bold text-slate-800">1,250</div>
                </Card>
                <Card className="p-4 bg-green-50 border-l-4 border-l-green-500">
                  <h4 className="font-semibold text-green-600 mb-2">Students Present Today</h4>
                  <div className="text-3xl font-bold text-green-600">1,050</div>
                </Card>
                <Card className="p-4 bg-blue-50 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-blue-600 mb-2">Average Daily Attendance</h4>
                  <div className="text-2xl font-bold text-slate-800">92%</div>
                </Card>
                <Card className="p-4 bg-blue-50 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-blue-600 mb-2">Meals Served Today</h4>
                  <div className="text-2xl font-bold text-slate-800">1,020</div>
                </Card>
              </div>
            </div>

            {/* Student Analytics */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Attendance Trends */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-sm border border-blue-100">
                  <h4 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-3"></span>
                    Attendance Trends (Last 7 Days)
                  </h4>
                  <div className="relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-white/30 rounded-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent rounded-lg"></div>
                    
                    <div className="flex justify-around items-end h-56 bg-white/50 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-6 left-0 right-0 h-px bg-gray-200"></div>
                        <div className="absolute bottom-20 left-0 right-0 h-px bg-gray-100"></div>
                        <div className="absolute bottom-32 left-0 right-0 h-px bg-gray-100"></div>
                        <div className="absolute bottom-44 left-0 right-0 h-px bg-gray-100"></div>
                      </div>
                      
                      <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '136px'}}>
                          <span className="font-semibold">850</span>
                        </div>
                        <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Mon</span>
                      </div>
                      <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '152px'}}>
                          <span className="font-semibold">950</span>
                        </div>
                        <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Tue</span>
                      </div>
                      <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '144px'}}>
                          <span className="font-semibold">900</span>
                        </div>
                        <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Wed</span>
                      </div>
                      <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '160px'}}>
                          <span className="font-semibold">1,000</span>
                        </div>
                        <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Thu</span>
                      </div>
                      <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '147px'}}>
                          <span className="font-semibold">920</span>
                        </div>
                        <span className="text-sm mt-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors">Fri</span>
                      </div>
                      <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-gradient-to-t from-blue-600 to-blue-400 text-white text-xs p-2 rounded-t-lg flex items-end justify-center w-14 shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-blue-500" style={{height: '155px'}}>
                          <span className="font-semibold">970</span>
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

                {/* Grade-Wise Enrollment Table */}
                <div>
                  <h4 className="text-md font-medium text-slate-600 mb-4">Grade-Wise Enrollment</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="text-left p-3 font-semibold text-slate-700">Grade</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Enrolled</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Present Today</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Attendance %</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 text-slate-700">1st</td>
                          <td className="p-3 text-slate-700">220</td>
                          <td className="p-3 text-slate-700">195</td>
                          <td className="p-3 text-slate-700">89%</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 text-slate-700">2nd</td>
                          <td className="p-3 text-slate-700">210</td>
                          <td className="p-3 text-slate-700">185</td>
                          <td className="p-3 text-slate-700">88%</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 text-slate-700">3rd</td>
                          <td className="p-3 text-slate-700">200</td>
                          <td className="p-3 text-slate-700">180</td>
                          <td className="p-3 text-slate-700">90%</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 text-slate-700">4th</td>
                          <td className="p-3 text-slate-700">190</td>
                          <td className="p-3 text-slate-700">170</td>
                          <td className="p-3 text-slate-700">89%</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 text-slate-700">5th</td>
                          <td className="p-3 text-slate-700">180</td>
                          <td className="p-3 text-slate-700">165</td>
                          <td className="p-3 text-slate-700">92%</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-700">6th-8th</td>
                          <td className="p-3 text-slate-700">250</td>
                          <td className="p-3 text-slate-700">225</td>
                          <td className="p-3 text-slate-700">90%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <AttendanceCameraModal
          isOpen={showCamera}
          onClose={() => setShowCamera(false)}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
        />
      )}

      {/* Mid Day Meal Program Details Modal */}
      <Dialog open={showMealInfoModal} onOpenChange={setShowMealInfoModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-slate-700">
              Mid-Day Meal Program Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Program Overview */}
            <div className="section">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Program Overview</h2>
              <p className="text-slate-600 leading-relaxed">
                The Mid-Day Meal Program is a flagship initiative by the Government of India aimed at enhancing school attendance, improving nutritional levels, and promoting social equity among children from primary and upper primary classes. Launched in 1995, it provides free lunches to over 100 million students daily across government and government-aided schools. The program not only combats malnutrition but also fosters classroom participation and reduces dropout rates, especially among underprivileged communities.
              </p>
            </div>

            {/* Key Insights */}
            <div className="section">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Key Insights</h2>
              <Card className="p-6 bg-slate-50">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">•</span>
                    <div>
                      <strong>Nutritional Impact:</strong> 85% of students report improved energy levels post-meal, based on monthly surveys.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">•</span>
                    <div>
                      <strong>Gender Parity:</strong> Female attendance stands at 93%, slightly higher than male at 91%, promoting gender equity.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-yellow-600 mr-2">•</span>
                    <div>
                      <strong>Cost Efficiency:</strong> Average cost per meal: ₹5.50, serving nutritious rice, dal, vegetables, and fruits.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-red-600 mr-2">•</span>
                    <div>
                      <strong>Challenges:</strong> Occasional supply delays; resolved with local vendor partnerships, reducing downtime by 40% this quarter.
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TeacherDashboard;