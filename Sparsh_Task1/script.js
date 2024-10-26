// script.js
const attendanceData = {};

// Update attendance for a given day
function updateAttendance(day, status) {
  attendanceData[day] = { ...attendanceData[day], status };
}

// Update comments for a given day
function updateComment(day, comment) {
  attendanceData[day] = { ...attendanceData[day], comment };
}

// Function to submit attendance data
function submitAttendance() {
  console.log("Attendance Data Submitted:", attendanceData);
  alert("Attendance data submitted successfully!");
}
