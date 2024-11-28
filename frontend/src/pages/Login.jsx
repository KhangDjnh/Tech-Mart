import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const styles = {
    container: {
      width: "400px",
      margin: "50px auto",
      padding: "20px 30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
      position: "relative",
    },
    socialButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    socialButton: {
      flex: 1,
      margin: "0 5px",
      padding: "10px 0",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
    },
    facebook: {
      backgroundColor: "#3b5998",
    },
    google: {
      backgroundColor: "#db4437",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#333",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      fontSize: "14px",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    checkbox: {
      marginRight: "5px",
    },
    loginButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      marginBottom: "10px",
    },
    loginButtonHover: {
      backgroundColor: "#0056b3",
    },
    actionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    actionLink: {
      textDecoration: "none",
      color: "#007bff",
      fontSize: "14px",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>ĐĂNG NHẬP</h2>
        <div style={styles.socialButtons}>
          <button style={{ ...styles.socialButton, ...styles.facebook }}>
            + Facebook
          </button>
          <button style={{ ...styles.socialButton, ...styles.google }}>
            + Google
          </button>
        </div>
        <form>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email của bạn"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              style={styles.input}
            />
          </div>
          <div style={styles.checkboxContainer}>
            <input type="checkbox" id="remember" style={styles.checkbox} />
            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
          </div>
          <button type="submit" style={styles.loginButton}>
            ĐĂNG NHẬP
          </button>
          <div style={styles.actionsContainer}>
            <a href="#" style={styles.actionLink}>
              Quên mật khẩu?
            </a>
            <a href="/register" style={styles.actionLink}>
              Đăng ký
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
