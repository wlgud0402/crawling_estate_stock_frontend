import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

const GoogleOauth = () => {
  const responseGoogle = async (response) => {
    const loginRes = await axios.post("/api/user/", {
      googleId: response.profileObj.googleId,
      email: response.profileObj.email,
    });
    localStorage.setItem("user_token", loginRes.data.user_token);
  };
  const responseGoogleError = (error) => {};
  return (
    <div>
      <GoogleLogin
        clientId="374075298681-g3s166507q5fmg0t25fav7sceu7edqvn.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ background: "red" }}
          >
            로그인
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogleError}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleOauth;
