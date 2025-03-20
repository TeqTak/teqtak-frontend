import React from 'react';

const FileUploadModal = ({ isOpen, onClose, selectedFiles }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[7.875rem] ">
      <div className="bg-white rounded-lg px-4 py-4 w-auto ">
        <button onClick={onClose} className="absolute right-4 top-1 text-red-500">Cancel</button>
        <div className="flex flex-col items-center">
          {selectedFiles.map((file, index) => (
            <div key={index} className="w-[15vw] mt-4 ">
              {file.type.startsWith('image') ? (
                <img src={URL.createObjectURL(file)} alt="preview" className="w-[20vw] h-[100px] rounded-md" />
              ) : (
                <video src={URL.createObjectURL(file)} controls className="w-[20vw] h-[100px] rounded-md" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;



