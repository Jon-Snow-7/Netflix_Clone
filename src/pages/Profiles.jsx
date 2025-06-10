import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddProfileModal from "../components/AddProfileModal";
import { fetchProfiles, createProfileThunk } from "../redux/slice/profileSlice"; // import thunk

import imgBlue from "../assets/blue.jpg";
import imgMehendi from "../assets/mehendi.jpg";
import imgWhite from "../assets/white.jpg";
import imgRed from "../assets/red.jpg";
import imgOrange from "../assets/orange.jpg";


const profileImages = [imgBlue, imgMehendi, imgOrange, imgRed, imgWhite];

const Profiles = () => {
  const navigate = useNavigate(); 

  const dispatch = useDispatch();
  const { data: profiles, isLoading, isError } = useSelector((state) => state.profile);

  const [showModal, setShowModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [isKidsProfile, setIsKidsProfile] = useState(false);

  useEffect(() => {
    
    dispatch(fetchProfiles()); // Fetch profiles on mount
  }, [dispatch]);

  const handleAddProfile = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setNewProfileName("");
    setIsKidsProfile(false);
  };

  const handleSave = async () => {
    if (!newProfileName.trim()) {
      alert("Please enter a profile name.");
      return;
    }

    try {
      await dispatch(
        createProfileThunk({
          name: newProfileName,
          adult: isKidsProfile ? 0 : 1,
        })
      ).unwrap();

      dispatch(fetchProfiles()); // Refresh profiles
      handleClose();
    } catch (error) {
      console.error("Failed to create profile:", error);
      alert("Failed to create profile.");
    }
  };

  if (isLoading) return <p className="text-white text-xl">Loading...</p>;
  if (isError) return <p className="text-red-500 text-xl">Failed to load profiles.</p>;

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden flex-col items-center justify-center">
      <h1 className="text-9xl font-semibold mb-12 text-center tracking-wide">
        Who's watching?
      </h1>

      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-8"> */}
      <div className="flex flex-row gap-x-8">
      {profiles.map((profile, index) => (
        <div
          key={profile.id}
          className="flex flex-col items-center cursor-pointer group"
        >
          <img
            src={profileImages[index % profileImages.length]} // ⬅️ Cycle through images
            alt={profile.name}
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-md border-2 border-transparent group-hover:border-white transition"
          />
          <p className="mt-2 text-2xl text-gray-400 font-medium w-full text-center group-hover:text-gray-300">
            {profile.name}
          </p>
        </div>
      ))}

        {/* Add Profile Button */}

        { profiles.length <5 && (
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
        )} 


      </div>
          <div>
          <button
            onClick={() => navigate("/manage_profiles")}
            className="cursor-pointer mt-24 px-20 py-4 !bg-black text-white text-2xl font-semibold rounded border border-white hover:!bg-gray-200 hover:!text-black transition"
          >
            Manage Profiles
          </button>

        </div>
      <AddProfileModal
        isOpen={showModal}
        onClose={handleClose}
        onSave={handleSave}
        newProfileName={newProfileName}
        setNewProfileName={setNewProfileName}
        isKidsProfile={isKidsProfile}
        setIsKidsProfile={setIsKidsProfile}
      />
    </div>
  );
};

export default Profiles;
