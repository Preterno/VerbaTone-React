import React, { useState, useRef } from "react";
import { Clear, Upload } from "./SvgIcons";

function FileUpload({ updateUploadedFile }) {
  const [fileStatus, setFileStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.type === "application/msword")
    ) {
      updateUploadedFile(file);
      setFileName(file.name);
      setFileStatus(true);
    } else {
      setErrorMessage(
        "Error: Unsupported file type. Please upload a valid document in one of the following formats: .docx, .doc, .pdf, or .txt"
      );
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateUploadedFile(file);
      setFileName(file.name);
      setFileStatus(true);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setFileStatus(false);
    setFileName("");
    updateUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`relative h-56 bg-accent rounded-lg ${
        !fileStatus ? "cursor-pointer" : ""
      } hover:bg-accent-light shadow-custom-sm hover:shadow-custom-md transition-all ${
        dragging ? "bg-accent-light" : ""
      } md:h-64 md:rounded-xl lg:h-full`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={fileStatus ? undefined : handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {fileStatus && (
        <div
          className="absolute top-1 right-1 z-10 cursor-pointer"
          onClick={handleClear}
          role="button"
        >
          <Clear />
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleChange}
      />

      {!fileStatus ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Upload />
          <h1
            className={`text-xl md:text-2xl mt-1 ${
              dragging || isHovered ? "opacity-75" : ""
            } min-[1750px]:text-3xl`}
          >
            Upload a File
          </h1>
          <h2
            className={`text-base font-light min-[1750px]:text-lg
                            ${dragging || isHovered ? "opacity-75" : ""}`}
          >
            or Drag and Drop
          </h2>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-xl md:text-2xl min-[1750px]:text-3xl">
            <span className="break-all">
              {fileName.length < 25
                ? fileName
                : fileName.substring(0, 10) +
                  "..." +
                  fileName.substring(fileName.length - 10)}{" "}
            </span>
            is selected
          </h1>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
