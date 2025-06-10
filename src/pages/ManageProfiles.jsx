import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProfiles } from "../redux/slice/profileSlice";

import imgBlue from "../assets/blue.jpg";
import imgMehendi from "../assets/mehendi.jpg";
import imgWhite from "../assets/white.jpg";
import imgRed from "../assets/red.jpg";
import imgOrange from "../assets/orange.jpg";

import ManageProfileModal from "../components/ManageProfileModal";

const profileImages = [imgBlue, imgMehendi, imgOrange, imgRed, imgWhite];

const ManageProfiles = () => {
  const dispatch = useDispatch();
  const { data: profiles, isLoading, isError } = useSelector(
    (state) => state.profile
  );
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [newProfileName, setNewProfileName] = useState("");

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  // When selectedProfile changes, update newProfileName state
  useEffect(() => {
    if (selectedProfile) {
      setNewProfileName(selectedProfile.name);
    }
  }, [selectedProfile]);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  if (isLoading)
    return <p className="text-white text-xl">Loading...</p>;
  if (isError)
    return <p className="text-red-500 text-xl">Failed to load profiles.</p>;

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden flex-col items-center justify-center">
      <h1 className="text-9xl font-semibold mb-12 text-center tracking-wide">
        Manage Profiles
      </h1>

      <div className="flex flex-row gap-x-8 flex-wrap justify-center">
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            onClick={() => handleProfileClick(profile)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <img
              src={profileImages[index % profileImages.length]}
              alt={profile.name}
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-md border-2 border-transparent group-hover:border-white transition opacity-50"
            />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                width="45"
                height="45"
                data-icon="PencilStandard"
                aria-hidden="true"
                className="svg-icon svg-icon-edit"
                style={{ marginTop: "-120px" }}
              >
                <path
                  fill="currentColor"
                  d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="mt-2 text-2xl text-gray-400 font-medium w-full text-center group-hover:text-gray-300">
              {profile.name}
            </p>
          </div>
        ))}


      </div>
          <div>
          <button
            onClick={() => navigate("/profiles")}
            className="cursor-pointer mt-24 px-20 py-4 !bg-black text-white text-2xl font-semibold rounded border border-white hover:!bg-gray-200 hover:!text-black transition"
          >
            Go Back
          </button>

        </div>
      {selectedProfile && (
        <ManageProfileModal
          isOpen={!!selectedProfile}
          onClose={handleCloseModal}
          onSave={() => {
            console.log("Save clicked:", newProfileName);
            handleCloseModal();
          }}
          newProfileName={newProfileName}
          setNewProfileName={setNewProfileName}
          isKidsProfile={selectedProfile.adult === 0}
          setIsKidsProfile={() => {}}
          profileId={selectedProfile.id}
        />
      )}
    </div>
  );
};

export default ManageProfiles;
