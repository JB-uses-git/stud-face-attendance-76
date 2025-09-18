import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { mockClasses, mockStudents } from '@/types/attendance';
import AttendanceCameraModal from '@/components/AttendanceCameraModal';

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const todaysClasses = [
    { time: '09:00 AM', subject: 'Data Structures', class: 'CS-3A', status: 'completed' },
    { time: '11:00 AM', subject: 'Computer Networks', class: 'CS-3B', status: 'ongoing' },
    { time: '02:00 PM', subject: 'Database Management', class: 'CS-3A', status: 'upcoming' },
    { time: '04:00 PM', subject: 'Operating Systems', class: 'CS-3C', status: 'upcoming' },
  ];

  const recentAttendance = [
    { subject: 'Data Structures', date: '2024-01-15', present: 28, total: 32, percentage: 87.5 },
    { subject: 'Computer Networks', date: '2024-01-14', present: 30, total: 32, percentage: 93.8 },
    { subject: 'Database Management', date: '2024-01-13', present: 26, total: 32, percentage: 81.3 },
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

      {/* Camera Modal */}
      {showCamera && (
        <AttendanceCameraModal
          isOpen={showCamera}
          onClose={() => setShowCamera(false)}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
        />
      )}
    </DashboardLayout>
  );
};

export default TeacherDashboard;