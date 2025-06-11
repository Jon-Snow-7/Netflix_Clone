import React from "react";
import ProfileSelector from "../components/ProfileSelector";

const Profiles = () => {
  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden flex-col items-center justify-center">
      <ProfileSelector />
    </div>
  );
};

export default Profiles;
