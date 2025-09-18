# MarkMe - AI-Powered Smart Attendance System

A modern, intelligent attendance management system for educational institutions built with React, TypeScript, and Tailwind CSS.

## Features

- **AI-Powered Face Detection**: Automatically detect and mark student attendance using camera
- **Multi-Level Classification**: Support for Branch, Section, Semester, and Subject organization
- **Role-Based Dashboards**: Separate interfaces for Students, Teachers, and Administrators
- **Real-time Analytics**: Comprehensive attendance tracking and reporting
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/JB-uses-git/stud-face-attendance-76.git

# Navigate to project directory
cd stud-face-attendance-76

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # Global styles and CSS modules
```

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **Camera Access**: Web API (getUserMedia)

## Usage

### For Teachers
1. Login with teacher credentials
2. Select Branch, Section, Semester, and Subject
3. Click "Start Capture" to take attendance photos
4. Review and submit attendance records

### For Students
1. Login with student credentials
2. View attendance statistics and records
3. Track attendance across different subjects

### For Administrators
1. Access comprehensive analytics
2. Monitor overall attendance trends
3. Generate reports and insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.
