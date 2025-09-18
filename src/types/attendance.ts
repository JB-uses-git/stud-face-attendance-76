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
  { id: '1', rollNumber: 'CS2021001', name: 'Jalad Bhairao', email: 'jalad@college.edu', course: 'B.Tech CS' },
  { id: '2', rollNumber: 'CS2021002', name: 'Aarav Sharma', email: 'aarav@college.edu', course: 'B.Tech CS' },
  { id: '3', rollNumber: 'CS2021003', name: 'Vivaan Gupta', email: 'vivaan@college.edu', course: 'B.Tech CS' },
  { id: '4', rollNumber: 'CS2021004', name: 'Aditya Singh', email: 'aditya@college.edu', course: 'B.Tech CS' },
  { id: '5', rollNumber: 'CS2021005', name: 'Vihaan Patel', email: 'vihaan@college.edu', course: 'B.Tech CS' },
  { id: '6', rollNumber: 'CS2021006', name: 'Arjun Kumar', email: 'arjun@college.edu', course: 'B.Tech CS' },
  { id: '7', rollNumber: 'CS2021007', name: 'Sai Reddy', email: 'sai@college.edu', course: 'B.Tech CS' },
  { id: '8', rollNumber: 'CS2021008', name: 'Krishna Yadav', email: 'krishna@college.edu', course: 'B.Tech CS' },
  { id: '9', rollNumber: 'CS2021009', name: 'Ishaan Joshi', email: 'ishaan@college.edu', course: 'B.Tech CS' },
  { id: '10', rollNumber: 'CS2021010', name: 'Ayaan Khan', email: 'ayaan@college.edu', course: 'B.Tech CS' },
  { id: '11', rollNumber: 'CS2021011', name: 'Priya Verma', email: 'priya@college.edu', course: 'B.Tech CS' },
  { id: '12', rollNumber: 'CS2021012', name: 'Ananya Agarwal', email: 'ananya@college.edu', course: 'B.Tech CS' },
  { id: '13', rollNumber: 'CS2021013', name: 'Diya Mehta', email: 'diya@college.edu', course: 'B.Tech CS' },
  { id: '14', rollNumber: 'CS2021014', name: 'Aadhya Nair', email: 'aadhya@college.edu', course: 'B.Tech CS' },
  { id: '15', rollNumber: 'CS2021015', name: 'Pihu Bansal', email: 'pihu@college.edu', course: 'B.Tech CS' },
  { id: '16', rollNumber: 'CS2021016', name: 'Myra Malhotra', email: 'myra@college.edu', course: 'B.Tech CS' },
  { id: '17', rollNumber: 'CS2021017', name: 'Aanya Mishra', email: 'aanya@college.edu', course: 'B.Tech CS' },
  { id: '18', rollNumber: 'CS2021018', name: 'Sara Chopra', email: 'sara@college.edu', course: 'B.Tech CS' },
  { id: '19', rollNumber: 'CS2021019', name: 'Pari Saxena', email: 'pari@college.edu', course: 'B.Tech CS' },
  { id: '20', rollNumber: 'CS2021020', name: 'Kavya Thakur', email: 'kavya@college.edu', course: 'B.Tech CS' },
  { id: '21', rollNumber: 'CS2021021', name: 'Reyansh Bhatt', email: 'reyansh@college.edu', course: 'B.Tech CS' },
  { id: '22', rollNumber: 'CS2021022', name: 'Atharv Dixit', email: 'atharv@college.edu', course: 'B.Tech CS' },
  { id: '23', rollNumber: 'CS2021023', name: 'Kabir Sinha', email: 'kabir@college.edu', course: 'B.Tech CS' },
  { id: '24', rollNumber: 'CS2021024', name: 'Shivansh Tiwari', email: 'shivansh@college.edu', course: 'B.Tech CS' },
  { id: '25', rollNumber: 'CS2021025', name: 'Rudra Pandey', email: 'rudra@college.edu', course: 'B.Tech CS' },
  { id: '26', rollNumber: 'CS2021026', name: 'Karthik Iyer', email: 'karthik@college.edu', course: 'B.Tech CS' },
  { id: '27', rollNumber: 'CS2021027', name: 'Advait Kulkarni', email: 'advait@college.edu', course: 'B.Tech CS' },
  { id: '28', rollNumber: 'CS2021028', name: 'Yash Desai', email: 'yash@college.edu', course: 'B.Tech CS' },
  { id: '29', rollNumber: 'CS2021029', name: 'Dhruv Rao', email: 'dhruv@college.edu', course: 'B.Tech CS' },
  { id: '30', rollNumber: 'CS2021030', name: 'Aryan Jain', email: 'aryan@college.edu', course: 'B.Tech CS' },
  { id: '31', rollNumber: 'CS2021031', name: 'Riya Shah', email: 'riya@college.edu', course: 'B.Tech CS' },
  { id: '32', rollNumber: 'CS2021032', name: 'Avni Soni', email: 'avni@college.edu', course: 'B.Tech CS' },
  { id: '33', rollNumber: 'CS2021033', name: 'Tanvi Kapoor', email: 'tanvi@college.edu', course: 'B.Tech CS' },
  { id: '34', rollNumber: 'CS2021034', name: 'Nisha Goyal', email: 'nisha@college.edu', course: 'B.Tech CS' },
  { id: '35', rollNumber: 'CS2021035', name: 'Simran Khanna', email: 'simran@college.edu', course: 'B.Tech CS' },
  { id: '36', rollNumber: 'CS2021036', name: 'Rhea Bajaj', email: 'rhea@college.edu', course: 'B.Tech CS' },
  { id: '37', rollNumber: 'CS2021037', name: 'Isha Aggarwal', email: 'isha@college.edu', course: 'B.Tech CS' },
  { id: '38', rollNumber: 'CS2021038', name: 'Navya Bhatia', email: 'navya@college.edu', course: 'B.Tech CS' },
  { id: '39', rollNumber: 'CS2021039', name: 'Aditi Sethi', email: 'aditi@college.edu', course: 'B.Tech CS' },
  { id: '40', rollNumber: 'CS2021040', name: 'Shreya Mittal', email: 'shreya@college.edu', course: 'B.Tech CS' },
  { id: '41', rollNumber: 'CS2021041', name: 'Dev Sharma', email: 'dev@college.edu', course: 'B.Tech CS' },
  { id: '42', rollNumber: 'CS2021042', name: 'Harsh Agrawal', email: 'harsh@college.edu', course: 'B.Tech CS' },
  { id: '43', rollNumber: 'CS2021043', name: 'Nikhil Rajput', email: 'nikhil@college.edu', course: 'B.Tech CS' },
  { id: '44', rollNumber: 'CS2021044', name: 'Rohit Goel', email: 'rohit@college.edu', course: 'B.Tech CS' },
  { id: '45', rollNumber: 'CS2021045', name: 'Varun Chawla', email: 'varun@college.edu', course: 'B.Tech CS' },
  { id: '46', rollNumber: 'CS2021046', name: 'Akshat Garg', email: 'akshat@college.edu', course: 'B.Tech CS' },
  { id: '47', rollNumber: 'CS2021047', name: 'Pranav Dutta', email: 'pranav@college.edu', course: 'B.Tech CS' },
  { id: '48', rollNumber: 'CS2021048', name: 'Shubham Singhal', email: 'shubham@college.edu', course: 'B.Tech CS' },
  { id: '49', rollNumber: 'CS2021049', name: 'Rishabh Srivastava', email: 'rishabh@college.edu', course: 'B.Tech CS' },
  { id: '50', rollNumber: 'CS2021050', name: 'Manav Kohli', email: 'manav@college.edu', course: 'B.Tech CS' },
  { id: '51', rollNumber: 'CS2021051', name: 'Pooja Arora', email: 'pooja@college.edu', course: 'B.Tech CS' },
  { id: '52', rollNumber: 'CS2021052', name: 'Neha Jindal', email: 'neha@college.edu', course: 'B.Tech CS' },
  { id: '53', rollNumber: 'CS2021053', name: 'Deepika Rastogi', email: 'deepika@college.edu', course: 'B.Tech CS' },
  { id: '54', rollNumber: 'CS2021054', name: 'Sakshi Gupta', email: 'sakshi@college.edu', course: 'B.Tech CS' },
  { id: '55', rollNumber: 'CS2021055', name: 'Kritika Joshi', email: 'kritika@college.edu', course: 'B.Tech CS' },
  { id: '56', rollNumber: 'CS2021056', name: 'Muskan Singh', email: 'muskan@college.edu', course: 'B.Tech CS' },
  { id: '57', rollNumber: 'CS2021057', name: 'Payal Chandra', email: 'payal@college.edu', course: 'B.Tech CS' },
  { id: '58', rollNumber: 'CS2021058', name: 'Khushi Bhardwaj', email: 'khushi@college.edu', course: 'B.Tech CS' },
  { id: '59', rollNumber: 'CS2021059', name: 'Janvi Solanki', email: 'janvi@college.edu', course: 'B.Tech CS' },
  { id: '60', rollNumber: 'CS2021060', name: 'Divya Mathur', email: 'divya@college.edu', course: 'B.Tech CS' },
  { id: '61', rollNumber: 'CS2021061', name: 'Raghav Tripathi', email: 'raghav@college.edu', course: 'B.Tech CS' },
  { id: '62', rollNumber: 'CS2021062', name: 'Vikram Yadav', email: 'vikram@college.edu', course: 'B.Tech CS' },
  { id: '63', rollNumber: 'CS2021063', name: 'Siddharth Khurana', email: 'siddharth@college.edu', course: 'B.Tech CS' },
  { id: '64', rollNumber: 'CS2021064', name: 'Gaurav Sachdeva', email: 'gaurav@college.edu', course: 'B.Tech CS' },
  { id: '65', rollNumber: 'CS2021065', name: 'Utkarsh Malhotra', email: 'utkarsh@college.edu', course: 'B.Tech CS' },
  { id: '66', rollNumber: 'CS2021066', name: 'Kunal Dubey', email: 'kunal@college.edu', course: 'B.Tech CS' },
  { id: '67', rollNumber: 'CS2021067', name: 'Ankit Rathore', email: 'ankit@college.edu', course: 'B.Tech CS' },
  { id: '68', rollNumber: 'CS2021068', name: 'Tushar Bansal', email: 'tushar@college.edu', course: 'B.Tech CS' },
  { id: '69', rollNumber: 'CS2021069', name: 'Lakshya Ahluwalia', email: 'lakshya@college.edu', course: 'B.Tech CS' },
  { id: '70', rollNumber: 'CS2021070', name: 'Karan Saini', email: 'karan@college.edu', course: 'B.Tech CS' },
  { id: '71', rollNumber: 'CS2021071', name: 'Arnav Bajpai', email: 'arnav@college.edu', course: 'B.Tech CS' },
  { id: '72', rollNumber: 'CS2021072', name: 'Kartik Chauhan', email: 'kartik@college.edu', course: 'B.Tech CS' },
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