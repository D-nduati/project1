
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './MedicalRecords.css'; // Make sure to import or adjust styles accordingly
import Navbarmain from '../../NavbarMain/Navbarmain';
import Footer from '../footer/Footer';

pdfjs.GlobalWorkerOptions.workerSrc = '../../../assets/cdnjs/pdf.worker.min.js'
const MedicalRecords = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // You can implement file upload logic here (e.g., API call to the server)
      // For simplicity, let's just store the file name in state
      setUploadedFiles([...uploadedFiles, selectedFile]);
      setSelectedFile(null);
    }
  };

  const renderFileContent = () => {
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      // Handle PDF files separately
      if (fileExtension === 'pdf') {
        return (
          <Document file={URL.createObjectURL(selectedFile)}>
            <Page pageNumber={1} />
          </Document>
        );
      }

      // For other file types, provide a download link
      return (
        <div>
          <p>Preview not available. Download the file:</p>
          <a href={URL.createObjectURL(selectedFile)} download={selectedFile.name}>
            {selectedFile.name}
          </a>
        </div>
      );
    }

    return null;
  };

  return (
    
    <div className="medical-records-container">
      <Navbarmain/>
      <h2>Medical Records</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {renderFileContent()}
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <a href={URL.createObjectURL(file)} download={file.name}>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default MedicalRecords;



