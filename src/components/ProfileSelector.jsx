import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProfileModal from "./AddProfileModal";
import { createProfile } from "../redux/apis";

import imgBlue from "../assets/blue.jpg";
import imgMehendi from "../assets/mehendi.jpg";
import imgWhite from "../assets/white.jpg";
import imgRed from "../assets/red.jpg";
import imgOrange from "../assets/orange.jpg";

const profileImages = [imgBlue, imgMehendi, imgOrange, imgRed, imgWhite];

const ProfileSelector = ({ hideHeader = false, hideManageButton = false ,profile_wide = 12,profile_height = 12, rounded = 1 ,plus_margin_top = 2.5, plus_margin_text = 1,navigation = "/home"}) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  

  const loadProfiles = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`http://localhost:8080/api/profiles`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Failed to load profiles:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

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
      await createProfile({
        name: newProfileName,
        adult: isKidsProfile ? 0 : 1,
      });

      await loadProfiles();
      handleClose();
    } catch (error) {
      console.error("Failed to create profile:", error);
      alert("Failed to create profile.");
    }
  };

  const handleProfileClick = async (profileId,name) => {
   
    try {
      const res = await fetch(`http://localhost:8080/api/profiles/${profileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
       
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", profileId);
      localStorage.setItem("prifilename", name);

      
      navigate(navigation);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Could not load profile.");
    }
  };

  if (isLoading) return <p className="text-white text-xl">Loading...</p>;
  if (isError) return <p className="text-red-500 text-xl">Failed to load profiles.</p>;

  return (
    <>
      {!hideHeader && (
      <h1 className="text-9xl font-semibold mb-12 text-center tracking-wide">
        Who's watching?
      </h1>
      )}

      <div className="flex flex-row gap-x-8">
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleProfileClick(profile.id,profile.name)}
          >
          <img
            src={profileImages[index % profileImages.length]}
            alt={profile.name}
            className={`rounded-md transition-all ${profile.id.toString() == localStorage.getItem("profile")
              ? "border-6 bg-gradient-to-br from-blue-400 to-white hover:from-blue-300 hover:to-gray-100 transition-all"
              : ""
            }`}
            style={{
              width: `${profile_wide}rem`,
              height: `${profile_height}rem`,
              borderRadius: `${rounded}rem`,
              backgroundImage: "linear-gradient(to bottom right, #bfdbfe, #ffffff)",
            }}
          />
            <p className="mt-2 text-2xl text-gray-400 font-medium w-full text-center group-hover:text-gray-300">
              {profile.name}
            </p>
          </div>
        ))}

        {profiles.length < 5 && (
          <div
            className="flex flex-col items-center cursor-pointer group"
            onClick={handleAddProfile}
          >
            <div className="w-36 h-36 sm:w-24 sm:h-24 mt-1 flex items-center justify-center bg-gray-400 rounded-full transition group-hover:bg-gray-300" style={{marginTop:`${plus_margin_top}rem`}}>
              <span className="text-black text-9xl mb-3.5">+</span>
            </div>
            <p className="mt-3 text-2xl text-gray-400 group-hover:text-white text-center" style={{marginTop:`${plus_margin_text}rem`}}>
              Add Profile
            </p>
          </div>
        )}
      </div>

      <div>
        {!hideManageButton && (
        <button
          onClick={() => navigate("/manage_profiles")}
          className="cursor-pointer mt-24 px-20 py-4 !bg-black text-white text-2xl font-semibold rounded border border-white hover:!bg-gray-200 hover:!text-black transition"
        >
          Manage Profiles
        </button>
         )}
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
    </>
  );
};

export default ProfileSelector;
