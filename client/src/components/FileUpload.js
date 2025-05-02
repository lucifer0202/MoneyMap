import React, { useState } from "react";
import API from "../api";

const FileUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/transactions/import", formData);
      alert(res.data.message);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow max-w-md mx-auto mt-8">
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
