import TextField from "@mui/material/TextField";
import { Close } from "@mui/icons-material"; // Import Close icon
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eventEmitter from "../../utils/eventEmitter.js";
import { notify } from "../../utils/toastify.js";
import { userApi } from "../../../api/userApi.js";


export default function ForgotPassword({ register }) {

    const navigate = useNavigate();
    const [send, setSend] = useState(false)
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailChangeRequest = async () => {
        try {
            const res = await userApi.forgotPassword(email)
            if (res.data.status === 'success') {
                notify('success', 'Đã gửi mật khẩu mới, Vui lòng kiểm tra email!')
            } else notify('error', 'Có lỗi xảy ra!')
            setSend(true)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className={" w-full h-[100vh] flex justify-center items-center"}>
            <div
                className="flex flex-col justify-center items-center w-[40vw] bg-white   shadow-[0px_0px_10px] shadow-gray-500 my-44 relative">
                <Link to="/" className="absolute top-0 right-0 text-gray-500 hover:text-gray-700">
                    <Close />
                </Link>
                <div className={"uppercase font-bold text-3xl mt-8"}>TeckMart</div>
                <div className="px-10  rounded-md  flex flex-col justify-center items-center w-full  mt-10">
                    <h1 className="font-medium text-xl mb-6 mt-3">Quên mật khẩu</h1>
                    <div className={"grid grid-cols-[80%,20%] gap-3 w-full"}>
                        <FormControl variant="outlined" className={"w-full !my-4"}>
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                value={email}
                                onChange={handleEmailChange}
                                type="email"
                                label="Email"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            className={"!my-4"}
                            onClick={handleEmailChangeRequest}
                            disabled={send}
                        >
                            Gửi
                        </Button>
                    </div>
                    <div className={'flex justify-end items-center w-full p-6'}><Link to={'/login'}
                        className={'underline hover:text-blue-700 hover:cursor-pointer'}>Trở
                        về trang đăng nhập</Link></div>
                </div>
            </div>
        </div>
    );
}