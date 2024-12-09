import './EmployeeManager.css';
import AddEmployeeForm from './AddEmployeeForm';
import { useEffect, useState } from 'react';
import { userApi } from '../../../api/userApi';
import DeleteWarning from '../DeleteWarning';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Email';

function EmployeeManager(){
  const [showForm, setShowForm] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

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
    fetchData();
  },[])

  const handleAddClick = () => {
    setShowForm(true);
  }
  const handleAddAction = async (data) => {
    try {
      const res = await userApi.createUser(data);
      console.log("New user added", res);
    } catch (e){
      console.error("Error adding employee:", e);
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
    console.log("id got pass in", employeeId);
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
            <span style={{margin: "0 10px"}}>Thêmn nhân viên mới</span>
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
                <td>
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
      <AddEmployeeForm action={handleAddAction} showModal={showForm} setShowModal={setShowForm}/>
      <DeleteWarning action={handleDeleteAction} showModal={showWarn} setShowModal={setShowWarn} text={"nhân viên"}/>
    </div>
  )
}
export default EmployeeManager;