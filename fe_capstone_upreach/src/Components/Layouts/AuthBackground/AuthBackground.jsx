import HeaderHomepage from "../../Layouts/Header/HeaderHomepage";
import "./AuthBackground.css";
const AuthBackground = ({ children }) => {
  return (
    <>
      <HeaderHomepage />
      <div className="auth-background">
        <div className="auth-form-cover">
          <div className="auth-custom-bg">
            <div className="auth-custom-line1"></div>
            <div className="auth-custom-line2"></div>
            <div className="auth-custom-line3"></div>
            <div className="auth-custom-line5">
              <div className="auth-custom-line4"></div>
            </div>
          </div>
          <div className="auth-form">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthBackground;
