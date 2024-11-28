import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>ĐĂNG KÝ</h2>
          <div style={styles.socialButtons}>
            <button style={styles.facebookButton}>+ Facebook</button>
            <button style={styles.googleButton}>+ Google</button>
          </div>
          <form style={styles.form}>
            <label style={styles.label}>
              Họ và Tên
              <input type="text" placeholder="Nhập họ và tên" style={styles.input} />
            </label>
            <label style={styles.label}>
              Số điện thoại
              <input type="text" placeholder="Nhập số điện thoại" style={styles.input} />
            </label>
            <label style={styles.label}>
              Email
              <input type="email" placeholder="Nhập email" style={styles.input} />
            </label>
            <label style={styles.label}>
              Mật khẩu
              <input type="password" placeholder="Nhập mật khẩu" style={styles.input} />
            </label>
            <label style={styles.label}>
              Nhập lại mật khẩu
              <input type="password" placeholder="Nhập lại mật khẩu" style={styles.input} />
            </label>
            <button type="submit" style={styles.registerButton}>
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  formContainer: {
    width: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "2px solid #004d99",
    display: "inline-block",
    paddingBottom: "5px",
  },
  socialButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  facebookButton: {
    flex: 1,
    backgroundColor: "#3b5998",
    color: "#fff",
    border: "none",
    padding: "10px",
    marginRight: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  googleButton: {
    flex: 1,
    backgroundColor: "#db4437",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    textAlign: "left",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  registerButton: {
    backgroundColor: "#004d99",
    color: "#fff",
    border: "none",
    padding: "10px",
    marginTop: "20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Register;
