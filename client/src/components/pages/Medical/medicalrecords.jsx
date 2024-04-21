import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import './MedicalRecords.css'; 
import Navbarmain from '../../NavbarMain/Navbarmain';
import Footer from '../footer/Footer';

const MedicalRecords = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

 
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:4040/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data.message);

      // Store uploaded file in state
      setUploadedFiles([...uploadedFiles, selectedFile]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
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
      <Navbarmain />
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
      <Footer />
    </div>
  );
};

export default MedicalRecords;

