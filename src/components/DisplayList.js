import React, { useState, useEffect } from "react";
import "./Components.css";
import { useNavigate } from "react-router-dom";
import Upload from "./upload.js";
import { Notification, ConfirmationModal } from "./Notification.js";

const DisplayList = () => {
  const [file, setFile] = useState([]);
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const navigate = useNavigate();

  // Load saved data from Electron main process
  const loadSavedData = async () => {
    try {
      const savedData = await window.electron.getData(); // Retrieve data
      if (savedData) {
        setFile(savedData.files);
      }
    } catch (error) {
      console.error("Error retrieving saved data:", error);
    }
  };

  // Handle navigation to file details
  const handleClick = (e) => {
    navigate("/display", {
      state: { fileName: e.fileName, fileDate: e.fileDate, fileData: e.data },
    });
  };

  // Handle file deletion
  const handleDeleteRecord = (recordToDelete) => {
    setRecordToDelete(recordToDelete);
    setShowConfirmDelete(true); // Show confirmation modal
  };

  // Confirm and delete file
  const handleConfirmDelete = async () => {
    if (recordToDelete) {
      try {
        const response = await window.electron.deleteData(
          recordToDelete.fileName
        ); // Use the exposed API
        if (response.success) {
          setFile((prevFiles) =>
            prevFiles.filter(
              (file) => file.fileName !== recordToDelete.fileName
            )
          );
          setNotification({
            title: "Delete Modal",
            message: `${recordToDelete.fileName} has been deleted.`,
          });
        } else {
          setNotification({
            title: "Delete Modal",
            message: "Failed to delete file.",
          });
        }
      } catch (error) {
        console.error("Error deleting file:", error);
        setNotification({
          title: "Delete Modal",
          message: "An error occurred while deleting the file.",
        });
      }
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false); // Close the confirmation modal
  };

  const handleFileUpload = () => {
    loadSavedData();
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  return (
    <>
      <Upload onFileUpload={handleFileUpload} />
      <div className="dataList">
        <Notification
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification({ title: "", message: "" })}
        />
        {file.map((file) => (
          <div className="card" key={file.fileName}>
            <h4>{file.fileName}</h4>
            <p>{file.fileDate}</p>
            <button onClick={() => handleClick(file)} className="viewButton">
              View
            </button>
            <button
              onClick={() => handleDeleteRecord(file)}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        ))}
        {showConfirmDelete && (
          <ConfirmationModal
            message={`Are you sure you want to delete the file ${recordToDelete?.fileName}?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </>
  );
};

export default DisplayList;
