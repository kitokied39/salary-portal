import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const [slip, setSlip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlip = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        const res = await axios.get("http://localhost:3000/api/employees/salary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSlip(res.data.data);
      } catch (err) {
        console.error("Error fetching salary slip info");
      } finally {
        setLoading(false);
      }
    };
    fetchSlip();
  }, []);

  const handleViewPdf = async () => {
    try {
      const token = localStorage.getItem("employeeToken");
      
      const response = await axios.get(`http://localhost:3000/api/admin/salaries/file/${slip._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      window.location.href = fileURL;
    } catch (err) {
      alert("Unauthorized or file not found.");
    }
  };

  if (loading) return <p style={loadingText}>Checking records...</p>;
  if (!slip) return <p style={loadingText}>No current salary slips found.</p>;

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Employee Portal</h2>
        <p style={subtitle}>Helwan Factory for Developed Industry</p>

        <div style={infoBox}>
          <p><strong>Payroll Month:</strong> {slip.month}</p>
          <p><strong>Release Date:</strong> {new Date(slip.uploadedAt).toLocaleDateString()}</p>
        </div>

        <button style={button} onClick={handleViewPdf}>
          View My Salary Slip
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;


// ===== Styles =====

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0f172a",
};

const card = {
  width: "320px",
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
};

const title = {
  color: "#e2e8f0",
};

const subtitle = {
  color: "#94a3b8",
  marginBottom: "20px",
};

const infoBox = {
  backgroundColor: "#0f172a",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
  color: "#e2e8f0",
  textAlign: "left",
};

const button = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

const loadingText = {
  color: "#e2e8f0",
  textAlign: "center",
  marginTop: "50px",
};