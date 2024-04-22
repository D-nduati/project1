import { Box, Button } from "@chakra-ui/react";
// Function to fetch recently signed up users
const fetchRecentUsers = async () => {
  try {
    const response = await fetch('http://localhost:4040/admin/recent-users');
    if (response.ok) {
      const users = await response.json();
      // Handle the list of users (e.g., store it in state)
      console.log(users);
    } else {
      console.error('Failed to fetch recent users');
    }
  } catch (error) {
    console.error('Error fetching recent users:', error);
  }
};

// Function to generate report
const generateReport = async () => {
  try {
    const response = await fetch('http://localhost:4040/admin/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* Parameters for generating report */ }),
    });
    if (response.ok) {
      const reportData = await response.json();
      // Handle the report data (e.g., display it in the admin panel)
      console.log(reportData);
    } else {
      console.error('Failed to generate report');
    }
  } catch (error) {
    console.error('Error generating report:', error);
  }
};


const AdminPanel = () => {
  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={fetchRecentUsers}>
        Fetch Recent Users
      </Button>
      <Button colorScheme="blue" onClick={generateReport}>
        Generate Report
      </Button>
      {/* Display list of recent users and report data here */}
    </Box>
  );
};

export default AdminPanel;
