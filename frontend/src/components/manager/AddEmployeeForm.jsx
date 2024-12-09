import { useState } from "react";

function AddEmployeeForm({action, showModal, setShowModal}){
  const [employee, setEmployee] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  const handleCancel = () => {
    setShowModal(false);
    setEmployee(null);
    setIsHidden(true);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", "employee");
    formData.append("fullname", employee?.fullname || "");
    formData.append("email", employee?.email || "");
    formData.append("phonenumber", employee?.phonenumber || "");
    formData.append("username", employee?.username || "");
    formData.append("password", employee?.password || "");
    
    action(formData);
  }

  return(
    <div>
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2 style={{fontSize: "20px", fontWeight: "bold"}}>Thêm nhân viên mới</h2>

            <form className="employeeForm" onSubmit={handleSubmit} style={{textAlign: "left"}}>
              <label>Tên nhân viên</label> <br />
              <input type="text" name="fullname" value={employee?.fullname || ""}
               onChange={handleInputChange} required placeholder="Nguyễn Văn A"/> <br />
              <label>Email</label> <br />
              <input type="text" name="email" value={employee?.email || ""}
               onChange={handleInputChange} required placeholder="employee001@ẽample.com"/> <br />
              <label>Số diện thoại</label> <br />
              <input type="text" name="phonenumber" value={employee?.phonenumber || ""}
               onChange={handleInputChange} required placeholder="0123456789"/> <br />
              <label>Tên tài khoản</label> <br />
              <input type="text" name="username" value={employee?.username || ""}
               onChange={handleInputChange} required placeholder="Nhập tên tài khoản"/> <br />
              <label>Mật khẩu</label> <br />
              <div style={{position: "relative"}}>
                <input type={isHidden ? 'password' : 'text'} name="password" value={employee?.password || ""}
                  onChange={handleInputChange} required placeholder="Nhập mặt khẩu"/>
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  style={{position: 'absolute', right: '10px', top: '40%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px'}}
                >
                  {isHidden ? 
                    <svg xmlns="http://www.w3.org/2000/svg" xmls="preserve" width="24" height="24" viewBox="0 0 512 512" id="eye">
                      <path fill="#ccc" d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 224-126.6C428.2 198.6 354.8 128 256 128zm0 219.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 89.6-91.3s89.6 41 89.6 91.3c0 50.4-40.2 91.3-89.6 91.3z"></path>
                      <path fill="#ccc" d="M256 224c0-7.9 2.9-15.1 7.6-20.7-2.5-.4-5-.6-7.6-.6-28.8 0-52.3 23.9-52.3 53.3s23.5 53.3 52.3 53.3 52.3-23.9 52.3-53.3c0-2.3-.2-4.6-.4-6.9-5.5 4.3-12.3 6.9-19.8 6.9-17.8 0-32.1-14.3-32.1-32z"></path>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" xmls="preserve" width="24" height="24" viewBox="0 0 512 512" id="eye">
                      <path d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 224-126.6C428.2 198.6 354.8 128 256 128zm0 219.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 89.6-91.3s89.6 41 89.6 91.3c0 50.4-40.2 91.3-89.6 91.3z"></path>
                      <path d="M256 224c0-7.9 2.9-15.1 7.6-20.7-2.5-.4-5-.6-7.6-.6-28.8 0-52.3 23.9-52.3 53.3s23.5 53.3 52.3 53.3 52.3-23.9 52.3-53.3c0-2.3-.2-4.6-.4-6.9-5.5 4.3-12.3 6.9-19.8 6.9-17.8 0-32.1-14.3-32.1-32z"></path>
                    </svg>
                  }
                </button>
              </div> <br />
              <div style={{textAlign: "center"}}>
                <button type="submit"
                className="bg-blue-500 text-white px-4 py-2 mx-8 mt-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Tạo
                </button>
                <button type="button" onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 mx-8 mt-4 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
                >
                  Hủy
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const modalStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "200",
};

const modalContentStyles = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

export default AddEmployeeForm;