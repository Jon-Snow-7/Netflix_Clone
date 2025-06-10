import React from "react";

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-10 w-full flex justify-center z-110">
      <div className="bg-black border-4 !border-red-500 !text-white px-6 py-4 rounded-xl shadow-lg w-[90%] max-w-md">
        <p className="text-lg font-semibold text-center mb-4">
          Are you sure you want to delete this profile?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer px-5 py-2 !bg-gray-600 hover:!bg-gray-500 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer px-5 py-2 !bg-red-500 hover:!bg-red-700 rounded transition"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
