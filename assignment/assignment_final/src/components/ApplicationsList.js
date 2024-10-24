import React, { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const STATUS = {
  PENDING_REVIEW: 'pending_review',
  REVIEWED: 'reviewed',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const StatusBadge = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case STATUS.PENDING_REVIEW:
        return { 
          icon: FiAlertCircle, 
          colors: 'bg-yellow-100 text-yellow-800',
          text: 'Pending Review'
        };
      case STATUS.REVIEWED:
        return { 
          icon: FiAlertCircle, 
          colors: 'bg-blue-100 text-blue-800',
          text: 'Reviewed'
        };
      case STATUS.APPROVED:
        return { 
          icon: FiCheckCircle, 
          colors: 'bg-green-100 text-green-800',
          text: 'Approved'
        };
      case STATUS.REJECTED:
        return { 
          icon: FiXCircle, 
          colors: 'bg-red-100 text-red-800',
          text: 'Rejected'
        };
      default:
        return { 
          icon: FiAlertCircle, 
          colors: 'bg-gray-100 text-gray-800',
          text: status
        };
    }
  };

  const { icon: Icon, colors, text } = getStatusInfo();
  return (
    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${colors}`}>
      <Icon size={16} />
      <span className="text-sm">{text}</span>
    </div>
  );
};

const ApplicationsList = ({ user, applications, setApplications }) => {
  const [remark, setRemark] = useState('');

  const handleApplicationAction = (applicationId, status) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status,
          remarks: [...app.remarks, { user: user.username, remark, timestamp: new Date().toISOString() }]
        };
      }
      return app;
    });
    setApplications(updatedApplications);
    setRemark('');
  };

  const relevantApplications = applications.filter(app => {
    if (user.role === 'applicant') return app.applicantId === user.username;
    if (user.role === 'reviewer') return app.status === STATUS.PENDING_REVIEW;
    if (user.role === 'approver') return app.status === STATUS.REVIEWED;
    return false;
  });

  const downloadResume = (resume) => {
    const link = document.createElement('a');
    link.href = resume.fileContent;
    link.download = resume.fileName;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      {relevantApplications.length === 0 ? (
        <div className="text-center">No applications found.</div>
      ) : (
        relevantApplications.map(app => (
          <div key={app.id} className="bg-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{app.position}</h3>
              <StatusBadge status={app.status} />
            </div>
            <div className="space-y-4">
              <p><strong>Applicant:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              
              {/* Display Download Link for Resume */}
              {app.resume && (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => downloadResume(app.resume)}
                >
                  Download Resume
                </button>
              )}

              {/* Display Remarks for Applicants */}
              {user.role === 'applicant' && (
                <div>
                  <h4 className="font-bold">Reviewer & Approver Remarks:</h4>
                  {app.remarks.length === 0 ? (
                    <p>No remarks yet.</p>
                  ) : (
                    <ul className="list-disc ml-5 space-y-2">
                      {app.remarks.map((remark, index) => (
                        <li key={index}>
                          <strong>{remark.user}</strong> ({new Date(remark.timestamp).toLocaleString()}): {remark.remark}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Reviewer and Approver actions */}
              {user.role !== 'applicant' && (
                <div className="space-y-2">
                  <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Add a remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    {user.role === 'reviewer' && (
                      <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleApplicationAction(app.id, STATUS.REVIEWED)}>Mark as Reviewed</button>
                    )}
                    {user.role === 'approver' && (
                      <>
                        <button className="bg-green-500 text-white p-2 rounded" onClick={() => handleApplicationAction(app.id, STATUS.APPROVED)}>Approve</button>
                        <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleApplicationAction(app.id, STATUS.REJECTED)}>Reject</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApplicationsList;
