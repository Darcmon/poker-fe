import GoogleLogin from "react-google-login";
import React from "react";

export default function Login({ setAuth }) {
  const oauth = async (code) => {
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    const data = await resp.json();
    setAuth(data);
  };

  return (
    <div className="green center" style={{ minHeight: 300 }}>
      <GoogleLogin
        clientId="951763265125-6f417ln1kmlc6kmrtgh5sbt463cm8eh3.apps.googleusercontent.com"
        responseType="code"
        onSuccess={oauth}
      />
    </div>
  );
}
