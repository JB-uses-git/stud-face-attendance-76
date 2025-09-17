export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  course: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent';
  markedBy: string;
  timestamp: string;
}

export interface ClassSession {
  id: string;
  subject: string;
  date: string;
  time: string;
  teacherId: string;
  teacherName: string;
  totalStudents: number;
  presentStudents: number;
}

export interface AttendanceStats {
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  subjectWise: {
    subject: string;
    total: number;
    attended: number;
    percentage: number;
  }[];
}

// Mock data for demonstration
export const mockStudents: Student[] = [
  { id: '1', rollNumber: 'CS2021001', name: 'Alex Kumar', email: 'alex@college.edu', course: 'B.Tech CS' },
  { id: '2', rollNumber: 'CS2021002', name: 'Priya Sharma', email: 'priya@college.edu', course: 'B.Tech CS' },
  { id: '3', rollNumber: 'CS2021003', name: 'Rajesh Patel', email: 'rajesh@college.edu', course: 'B.Tech CS' },
  { id: '4', rollNumber: 'CS2021004', name: 'Sneha Reddy', email: 'sneha@college.edu', course: 'B.Tech CS' },
  { id: '5', rollNumber: 'CS2021005', name: 'Arjun Singh', email: 'arjun@college.edu', course: 'B.Tech CS' },
];

export const mockClasses = [
  'Data Structures',
  'Computer Networks',
  'Database Management',
  'Operating Systems',
  'Software Engineering',
];

export const generateMockAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });

  mockStudents.forEach(student => {
    dates.forEach(date => {
      mockClasses.forEach((subject, subjectIndex) => {
        // Generate realistic attendance (85% attendance rate)
        const isPresent = Math.random() > 0.15;
        records.push({
          id: `${student.id}-${date}-${subjectIndex}`,
          studentId: student.id,
          classId: `class-${subjectIndex}`,
          date,
          status: isPresent ? 'present' : 'absent',
          markedBy: 'teacher1',
          timestamp: new Date().toISOString(),
        });
      });
    });
  });

  return records;
};