import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'

interface MidDayMealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const MidDayMealModal: React.FC<MidDayMealModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-slate-700">
            Mid-Day Meal Program Dashboard
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

          {/* Basic Student Information */}
          <div className="section">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Basic Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-blue-50 border-l-4 border-l-blue-500">
                <h3 className="font-semibold text-blue-600 mb-2">Total Enrolled Students</h3>
                <div className="text-2xl font-bold text-slate-800">1,250</div>
              </Card>
              <Card className="p-4 bg-green-50 border-l-4 border-l-green-500">
                <h3 className="font-semibold text-green-600 mb-2">Students Present Today</h3>
                <div className="text-3xl font-bold text-green-600">1,050</div>
              </Card>
              <Card className="p-4 bg-blue-50 border-l-4 border-l-blue-500">
                <h3 className="font-semibold text-blue-600 mb-2">Average Daily Attendance</h3>
                <div className="text-2xl font-bold text-slate-800">92%</div>
              </Card>
              <Card className="p-4 bg-blue-50 border-l-4 border-l-blue-500">
                <h3 className="font-semibold text-blue-600 mb-2">Meals Served Today</h3>
                <div className="text-2xl font-bold text-slate-800">1,020</div>
              </Card>
            </div>
          </div>

          {/* Student Analytics */}
          <div className="section">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Student Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Attendance Trends */}
              <div>
                <h3 className="text-lg font-medium text-slate-700 mb-4">Attendance Trends (Last 7 Days)</h3>
                <div className="flex justify-around items-end h-48 bg-slate-50 p-4 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '80%'}}>
                      850
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Mon</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '90%'}}>
                      950
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Tue</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '85%'}}>
                      900
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Wed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '95%'}}>
                      1,000
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Thu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '88%'}}>
                      920
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Fri</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '92%'}}>
                      970
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Sat</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-400 text-white text-xs p-2 rounded-t flex items-end justify-center w-12" style={{height: '10%'}}>
                      0
                    </div>
                    <span className="text-xs mt-1 text-slate-600">Sun</span>
                  </div>
                </div>
              </div>

              {/* Grade-Wise Enrollment Table */}
              <div>
                <h3 className="text-lg font-medium text-slate-700 mb-4">Grade-Wise Enrollment</h3>
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
  )
}