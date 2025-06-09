import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import profileImg from "../assets/profile.jpg";
import AddProfileModal from "../components/AddProfileModal";
import { fetchProfiles } from "../redux/slice/profileSlice"; // 👈 Import the thunk

const Profiles = () => {
  const dispatch = useDispatch();
  const { data: profiles, isLoading, isError } = useSelector((state) => state.profile);

  const [showModal, setShowModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  useEffect(() => {
    dispatch(fetchProfiles()); // 👈 Fetch profiles on mount
  }, [dispatch]);

  const handleAddProfile = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewProfileName("");
  };

  const handleSave = () => {
    alert(`Profile "${newProfileName}" added!`);
    handleClose();
  };

  if (isLoading) return <p className="text-white text-xl">Loading...</p>;
  if (isError) return <p className="text-red-500 text-xl">Failed to load profiles.</p>;

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden flex-col items-center justify-center">
      <h1 className="text-9xl font-semibold mb-12 text-center tracking-wide">
        Who's watching?
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center cursor-pointer group"
          >
            <img
              src={profileImg}
              alt={profile.name}
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-md border-2 border-transparent group-hover:border-white transition"
            />
            <p className="mt-2 text-2xl text-gray-400 font-medium w-full text-center group-hover:text-gray-300">
              {profile.name}
            </p>
          </div>
        ))}

        {/* Add Profile Button */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={handleAddProfile}
        >
          <div className="w-36 h-36 sm:w-24 sm:h-24 mt-10 flex items-center justify-center bg-gray-400 rounded-full transition group-hover:bg-gray-300">
            <span className="text-black text-9xl mb-3.5">+</span>
          </div>
          <p className="mt-4 text-2xl text-gray-400 group-hover:text-white text-center">
            Add Profile
          </p>
        </div>
      </div>

      <AddProfileModal
        isOpen={showModal}
        onClose={handleClose}
        onSave={handleSave}
        newProfileName={newProfileName}
        setNewProfileName={setNewProfileName}
      />
    </div>
  );
};

export default Profiles;
