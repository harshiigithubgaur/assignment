import React, { useState } from 'react';

const ApplicationForm = ({ user, applications, setApplications }) => {
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    position: '',
    experience: '',
    resume: ''
  });
  const [resumeFile, setResumeFile] = useState(null);

  // Convert file to base64
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeFile({
        fileName: file.name,
        fileContent: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const newApplication = {
      ...applicationData,
      id: Date.now(),
      status: 'pending_review',
      applicantId: user.username,
      remarks: [],
      resume: resumeFile, // store the resume as base64 in localStorage
      createdAt: new Date().toISOString()
    };
    setApplications([...applications, newApplication]);
    setApplicationData({ name: '', email: '', position: '', experience: '', resume: '' });
    setResumeFile(null); // reset resume file
  };

  return (
    <form onSubmit={handleSubmitApplication} className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Submit Job Application</h2>
      <div className="space-y-4">
        <input
          required
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          value={applicationData.name}
          onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
        />
        <input
          required
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={applicationData.email}
          onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
        />
        <input
          required
          className="w-full border p-2 rounded"
          placeholder="Position"
          value={applicationData.position}
          onChange={(e) => setApplicationData({ ...applicationData, position: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Years of Experience"
          value={applicationData.experience}
          onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
        />
        
        {/* Resume File Upload */}
        <input
          required
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full border p-2 rounded"
          onChange={handleFileUpload}
        />
        {resumeFile && (
          <div className="text-sm text-green-500">Resume Uploaded: {resumeFile.fileName}</div>
        )}

        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">Submit Application</button>
      </div>
    </form>
  );
};

export default ApplicationForm;