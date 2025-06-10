
import profileImg from "../assets/profile.jpg";
import { X } from "lucide-react";

const AddProfileModal = ({
  isOpen,
  onClose,
  onSave,
  newProfileName,
  setNewProfileName,
  isKidsProfile,
  setIsKidsProfile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-black border border-white/30 rounded-lg px-10 py-8 w-[30rem] sm:w-[40rem] h-[38rem] sm:h-[36rem] flex flex-col justify-start">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white !bg-black rounded-full p-2 hover:!bg-white/30 transition-colors duration-300"
        >
          <X size={30} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-white mt-8 text-center">
          Add a Profile
        </h2>
        <p className="text-sm text-white text-center mt-2">
          Add a profile for another person watching Netflix
        </p>

        {/* Image + input */}
        <div className="flex items-center gap-8 mt-10 mr-18 w-[550px]">
          <img
            src={profileImg}
            alt="Profile icon"
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-md object-cover"
          />
          <input
            type="text"
            placeholder="Enter profile name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            className="flex-1 px-5 py-3 border border-white/30 rounded text-lg text-white"
          />
        </div>

        {/* Divider */}
        <hr className="mt-8 border-t border-white/30 w-[550px] mx-auto" />

        {/* Kids toggle */}
        <div className="flex justify-between items-center w-[550px] mx-auto mt-10">
          <div>
            <p className="text-lg font-medium text-white">Children Profile</p>
            <p className="text-sm text-gray-400 ">
              Only see kid-friendly TV shows and movies
            </p>
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer scale-100">
            <input
              type="checkbox"
              checked={isKidsProfile}
              onChange={() => setIsKidsProfile(!isKidsProfile)}
              className="sr-only peer"
            />
            <div
              className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                isKidsProfile ? "bg-blue-800" : "bg-gray-300"
              } relative`}
            >
              <div
                className={`absolute top-[4px] left-[3px] h-6 w-6 bg-white rounded-full transition-all duration-300 transform ${
                  isKidsProfile ? "translate-x-[calc(100%+2px)]" : ""
                } flex items-center justify-center`}
              >
                {isKidsProfile ? (
                  <span className="text-green-600 text-sm font-bold">✓</span>
                ) : (
                  <div className="w-3 h-0.5 bg-gray-500" />
                )}
              </div>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-10 w-[550px] mx-auto">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 text-black rounded hover:!bg-white/80 text-lg transition-all duration-600"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="w-full px-6 py-3 text-white rounded hover:!bg-white/20 text-lg !bg-black dark:!bg-black transition-all duration-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfileModal;
