import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("/api/user/ram")
      .then(r => r.json())
      .then(setProfile)
  }, []);

  return (
    <>
      <h2>Profile</h2>
      <pre>
        {JSON.stringify(profile, undefined, 2)}
      </pre>
    </>
  );
}

export default Profile;
