import React, { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, CheckCircle, X, User, UserCheck, RefreshCcw } from 'lucide-react';
import { mockStudents } from '@/types/attendance';
import { toast } from '@/hooks/use-toast';

interface AttendanceCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: string;
  selectedSubject: string;
}

const AttendanceCameraModal: React.FC<AttendanceCameraModalProps> = ({
  isOpen,
  onClose,
  selectedClass,
  selectedSubject,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedStudents, setDetectedStudents] = useState<typeof mockStudents>([]);
  const [attendanceMarked, setAttendanceMarked] = useState<Record<string, 'present' | 'absent'>>({});
  const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      // Prefer the back camera
      let stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: { ideal: 'environment' },
        },
      });

      // If it's not clearly the back camera, try to switch using enumerateDevices
      let track = stream.getVideoTracks()[0];
      const label = (track?.label || '').toLowerCase();
      const looksFront = !(label.includes('back') || label.includes('rear') || label.includes('environment'));

      if (looksFront) {
        // Stop initial stream before switching
        stream.getTracks().forEach((t) => t.stop());
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputsFound = devices.filter((d) => d.kind === 'videoinput');
        const backDevice =
          videoInputsFound.find((d) => {
            const l = (d.label || '').toLowerCase();
            return l.includes('back') || l.includes('rear') || l.includes('environment');
          }) || videoInputsFound[1] || videoInputsFound[0];

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: backDevice ? { exact: backDevice.deviceId } : undefined,
            width: 640,
            height: 480,
          },
        });
        track = stream.getVideoTracks()[0];
      }

      console.log('Using camera:', track?.label || 'unknown');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      // Remember current device and list available cameras
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((d) => d.kind === 'videoinput');
        setVideoInputs(cams);
        const devId = track?.getSettings().deviceId || null;
        setCurrentDeviceId(devId);
      } catch (e) {
        console.warn('enumerateDevices not available or blocked');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: 'Camera Error',
        description: 'Unable to access camera. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const switchCamera = async () => {
    try {
      const devices = videoInputs.length
        ? videoInputs
        : (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'videoinput');
      if (!devices.length) return;

      const currentIndex = Math.max(0, devices.findIndex((d) => d.deviceId === currentDeviceId));
      const nextIndex = (currentIndex + 1) % devices.length;
      const next = devices[nextIndex];

      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: next ? { exact: next.deviceId } : undefined,
          width: 640,
          height: 480,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;

      const track = stream.getVideoTracks()[0];
      setCurrentDeviceId(track?.getSettings().deviceId || next?.deviceId || null);
      const updated = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'videoinput');
      setVideoInputs(updated);

      console.log('Switched to camera:', track?.label || 'unknown');
    } catch (e) {
      console.error('Switch camera failed', e);
      toast({
        title: 'Unable to switch camera',
        description: 'Try using your device browser or grant camera permission.',
        variant: 'destructive',
      });
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      
      // Simulate AI face detection and recognition
      setTimeout(() => {
        const randomDetectedStudents = mockStudents
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * mockStudents.length) + 1);
        
        setDetectedStudents(randomDetectedStudents);
        
        // Mark detected students as present
        const initialAttendance: Record<string, 'present' | 'absent'> = {};
        mockStudents.forEach(student => {
          initialAttendance[student.id] = randomDetectedStudents.some(d => d.id === student.id) 
            ? 'present' 
            : 'absent';
        });
        setAttendanceMarked(initialAttendance);
        
        setIsCapturing(false);
        toast({
          title: "Face Detection Complete",
          description: `Detected ${randomDetectedStudents.length} students in the photo`,
        });
      }, 2000);
    }
  }, []);

  const toggleStudentAttendance = (studentId: string) => {
    setAttendanceMarked(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }));
  };

  const submitAttendance = () => {
    const presentCount = Object.values(attendanceMarked).filter(status => status === 'present').length;
    const totalCount = mockStudents.length;
    
    toast({
      title: "Attendance Submitted Successfully!",
      description: `${presentCount}/${totalCount} students marked present`,
    });
    
    onClose();
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setDetectedStudents([]);
    setAttendanceMarked({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Take Attendance - {selectedSubject}</DialogTitle>
          <DialogDescription>
            Class: {selectedClass} • Capture group photo to automatically detect students
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!capturedImage ? (
            /* Camera View */
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-80 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {isCapturing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Processing image with AI...</p>
                      <p className="text-sm text-white/80">Detecting faces and matching students</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={switchCamera}
                  disabled={isCapturing}
                >
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  Switch Camera
                </Button>
                <Button
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  size="lg"
                  className="px-8"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {isCapturing ? 'Processing...' : 'Capture Photo'}
                </Button>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              {/* Captured Image */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Captured Image</h3>
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured classroom" 
                    className="w-full h-60 object-cover rounded-lg border"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {detectedStudents.length} faces detected
                  </Badge>
                </div>
              </div>

              {/* Attendance List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Student Attendance</h3>
                  <div className="text-sm text-muted-foreground">
                    Present: {Object.values(attendanceMarked).filter(s => s === 'present').length} / {mockStudents.length}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {mockStudents.map((student) => {
                    const isPresent = attendanceMarked[student.id] === 'present';
                    const wasDetected = detectedStudents.some(d => d.id === student.id);
                    
                    return (
                      <Card
                        key={student.id}
                        className={`cursor-pointer transition-all ${
                          isPresent 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-red-200 bg-red-50'
                        }`}
                        onClick={() => toggleStudentAttendance(student.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isPresent ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {isPresent ? (
                                  <UserCheck className="w-5 h-5 text-green-600" />
                                ) : (
                                  <User className="w-5 h-5 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-1">
                              <Badge variant={isPresent ? 'default' : 'destructive'}>
                                {isPresent ? 'Present' : 'Absent'}
                              </Badge>
                              {wasDetected && (
                                <Badge variant="outline" className="text-xs">
                                  Auto-detected
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={resetCapture}
                >
                  <X className="w-4 h-4 mr-2" />
                  Retake Photo
                </Button>
                
                <Button
                  onClick={submitAttendance}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Attendance
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceCameraModal;