import React, { useEffect, useState } from "react";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email);

    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email
      })
    })
      .then(r => r.json())
      .then(console.log)
  }

  const signupDisabled = !email || isLoading;

  return (
    <>
      <h3>Sign up</h3>
      <form onSubmit={handleSignUp}>
        <input value={email} onChange={handleEmailChange} disabled={isLoading}/>
        <button disabled={signupDisabled}>
          Sign Up
        </button>
      </form>
    </>
  )
}

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

      <SignUp />
    </>
  );
}

export default Profile;
