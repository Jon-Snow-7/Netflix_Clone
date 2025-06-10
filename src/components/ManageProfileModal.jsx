import React, { useState } from "react";
import profileImg from "../assets/profile.jpg";
import { X } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import { deleteProfileThunk ,updateProfileThunk} from "../redux/slice/profileSlice";


const ManageProfileModal = ({
  isOpen,
  onClose,
  onSave,
  newProfileName,
  setNewProfileName,
  profileId, // 👈 Pass this in from parent
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
const dispatch = useDispatch();
const handleDelete = async () => {
  try {
    setLoadingDelete(true);
    await dispatch(deleteProfileThunk(profileId)); // ✅ delete via Redux
    setShowDeleteConfirm(false);
    onClose();
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Something went wrong while deleting the profile.");
  } finally {
    setLoadingDelete(false);
  }
};

const handleUpdate = async () => {
  try {
    setLoadingUpdate(true);
    await dispatch(updateProfileThunk({
      profileId,
      profileData: { name: newProfileName }
    })).unwrap(); // unwrap() to throw error if rejected
    onClose();  // Close modal on success
  } catch (error) {
    console.error("Update failed:", error);
    alert("Something went wrong while updating the profile.");
  } finally {
    setLoadingUpdate(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 0%)",
          }}
        />
      )}

      <ConfirmDeleteModal
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={loadingDelete}
      />

      {/* Modal box stays the same as your version */}
      <div className={`relative bg-black border border-white/30 rounded-lg px-10 py-8 w-[30rem] sm:w-[40rem] h-auto flex flex-col justify-start z-50 ${showDeleteConfirm ? "pointer-events-none opacity-60" : ""}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 !text-white !bg-black rounded-full p-2 hover:!bg-white/30 transition z-50"
        >
          <X size={30} />
        </button>

        <h2 className="text-3xl font-semibold text-white mt-8 text-center z-50">
          Rename Profile
        </h2>

        <div className="flex items-center gap-8 mt-10 w-[550px] z-50">
          <img
            src={profileImg}
            alt="Profile icon"
            className="w-20 h-20 rounded-md object-cover"
          />
          <input
            type="text"
            placeholder="Enter profile name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            className="flex-1 px-5 py-3 border border-white/30 rounded text-lg text-white bg-black"
          />
        </div>

        <hr className="mt-8 border-t border-white/30 w-[550px] mx-auto z-50" />

        <div className="flex flex-col gap-2 mt-10 w-[550px] mx-auto z-50">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="cursor-pointer w-full px-6 py-3 !bg-red-500 !text-white rounded hover:!bg-red-700 text-lg transition"
          >
            Delete
          </button>
<button
  onClick={handleUpdate}
  disabled={loadingUpdate}
  className="cursor-pointer w-full px-6 py-3 !bg-white/10 hover:!bg-white/20 !text-white rounded text-lg transition"
>
  {loadingUpdate ? "Saving..." : "Save"}
</button>
          <button
            onClick={onClose}
            className="cursor-pointer w-full px-6 py-3 !bg-gray-100 !text-black rounded hover:!bg-white text-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfileModal;
