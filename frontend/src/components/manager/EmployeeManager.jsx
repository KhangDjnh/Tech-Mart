import './EmployeeManager.css';
import AddEmployeeForm from './AddEmployeeForm';
import { useEffect, useState } from 'react';
import { userApi } from '../../../api/userApi';
import DeleteWarning from '../DeleteWarning';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Email';
import { useNavigate} from "react-router-dom";

function EmployeeManager(){
  const [showForm, setShowForm] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try{
      const res = await userApi.getAllUsers();
      const allEmployees = res.data.data.filter(
        user => user.role.includes('employee'));
      setEmployees(allEmployees);
    } catch (e) {
      console.error('Error fetching user data:', e);
    }
  }

  useEffect(() => {
    try{
      if(localStorage.getItem("token")){
      }else{
        navigate("/login");
      }
    }catch (e){
      console.log(e);
    }
    fetchData();
  },[])

  const handleAddClick = () => {
    setShowForm(true);
  }
  const handleEditClick = (employee) => {
    setEmployeeInfo(employee);
    setShowForm(true);
  }
  const handleAddAndEditAction = async (data, id) => {

    try {
      if(id != null){
        const res = await userApi.updateUser2(data, id);
        console.log("Edited user", res);
      }else{
        const res = await userApi.createUser(data);
        console.log("New user added", res);
      }
    } catch (e){
      console.error("Error adding or editing employee:", e);
    } finally{
      setShowForm(false);
      fetchData();
    }
  }
  const handleDeleteClick = (id) => {
    setShowWarn(true);
    setEmployeeId(id);
  }
  const handleDeleteAction = async () => {
    try{
      const res = await userApi.deleteUser(employeeId);
    } catch (e){
      console.error("Error removing employee:", e);
    } finally {
      setShowWarn(false);
      setEmployeeId("");
      fetchData();
    }
  }

  return(
    <div>
      <div className='headerInEmployeeManager'>
        Danh Sách Nhân Viên
      </div>
      <div>
        <div className='headerInEmployeeManager'>
          Số nhân viên: {employees ? (employees.length) : 0}
          <button className='addEmployeeButton' onClick={handleAddClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox='0 0 24 24' fill="none" id="plus">
                <path fill="#fff" d="M12 5a1 1 0 0 0-1 1v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6a1 1 0 0 0-1-1Z"></path>
            </svg>
            <span style={{margin: "0 10px"}}>Thêm nhân viên mới</span>
          </button>
        </div>
      </div>
      <table className='employeeTable'>
        <thead>
          <tr>
            <th><PersonIcon/> Tên</th>
            <th><MailIcon/> Email</th>
            <th><PhoneIcon/> Số Điện Thoại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map(employee => (
              <tr className='employeeRecord' key={employee._id}>
                <td>{employee.fullname}</td>
                <td>{employee.email}</td>
                <td>{employee.phonenumber}</td>
                <td style={{textAlign: "center", width: "90px"}}>
                  <button className='editEmployeeButton' style={{marginRight: "15px"}}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditClick(employee);
                  }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" id="edit">
                      <path fill='#ccc' d="M12.82373,12.95898l-1.86279,6.21191c-0.1582,0.52832-0.01367,1.10156,0.37646,1.49121c0.28516,0.28516,0.66846,0.43945,1.06055,0.43945c0.14404,0,0.28906-0.02051,0.43066-0.06348l6.2124-1.8623c0.23779-0.07129,0.45459-0.2002,0.62988-0.37598L31.06055,7.41016C31.3418,7.12891,31.5,6.74707,31.5,6.34961s-0.1582-0.7793-0.43945-1.06055l-4.3501-4.34961c-0.58594-0.58594-1.53516-0.58594-2.12109,0L13.2002,12.3291C13.02441,12.50488,12.89551,12.7207,12.82373,12.95898z M15.58887,14.18262L25.6499,4.12109l2.22852,2.22852L17.81738,16.41113l-3.18262,0.9541L15.58887,14.18262z"></path>
                      <path fill='#ccc' d="M30,14.5c-0.82861,0-1.5,0.67188-1.5,1.5v10c0,1.37891-1.12158,2.5-2.5,2.5H6c-1.37842,0-2.5-1.12109-2.5-2.5V6c0-1.37891,1.12158-2.5,2.5-2.5h10c0.82861,0,1.5-0.67188,1.5-1.5S16.82861,0.5,16,0.5H6C2.96729,0.5,0.5,2.96777,0.5,6v20c0,3.03223,2.46729,5.5,5.5,5.5h20c3.03271,0,5.5-2.46777,5.5-5.5V16C31.5,15.17188,30.82861,14.5,30,14.5z"></path>
                    </svg>
                  </button>
                  <button className='removeEmployeeButton'
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(employee._id);
                  }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" id="x">
                      <g fill="none" fillRule="evenodd" stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M13 1 1 13M1 1l12 12"></path>
                      </g>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{textAlign: "center"}}>Chưa có nhân viên</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddEmployeeForm action={handleAddAndEditAction} showModal={showForm} setShowModal={setShowForm} employeeInfo={employeeInfo} setEmployeeInfo={setEmployeeInfo}/>
      <DeleteWarning action={handleDeleteAction} showModal={showWarn} setShowModal={setShowWarn} text={"nhân viên"}/>
    </div>
  )
}
export default EmployeeManager;