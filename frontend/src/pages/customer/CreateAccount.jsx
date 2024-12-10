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
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction.js";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastify.js";
import eventEmitter from "../../utils/eventEmitter.js";
import CircularProgress from '@mui/material/CircularProgress';
import bgImg from "../../assets/bg_login.jpg"


function CreateAccount({ register }) {
    const style = {
        backgroundImage: `url(${bgImg})`, // Đường dẫn đến ảnh
        backgroundSize: 'cover', // Đảm bảo ảnh lấp đầy vùng nền
        backgroundRepeat: 'no-repeat', // Ảnh không bị lặp lại
        backgroundPosition: 'center', // Canh giữa ảnh
      };
    const profilePic =
        "https://res.cloudinary.com/dlgyapagf/image/upload/v1712984661/TechMarket-User/avatar_default/avatar-default_l2kmh0.jpg";
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhone] = useState("");
    const [username, setName] = useState("");
    const [loading, setLoadind] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function registerHandling() {
        setLoadind(true)
        const userDetails = {
            username,
            email,
            password,
            phonenumber,
            profilePic,
        };

        register(userDetails, navigate);
    }

    useEffect(() => {
        const handleSuccess = () => {
            setLoadind(false)
            notify('success', 'Đăng nhập thành công');
        };
        const handleError = (error) => {
            setLoadind(false)
            notify('error', error);
        };

        eventEmitter.on('success', handleSuccess);
        eventEmitter.on('error', handleError);

        return () => {
            eventEmitter.off('success', handleSuccess);
            eventEmitter.off('error', handleError);
        };
    }, []);

    return (
        <div className={" w-full h-[100vh] flex justify-center items-center"} style={style}>
            <div className="flex flex-col justify-center items-center w-[40vw] bg-white   shadow-[0px_0px_10px] shadow-gray-500 my-44 relative rounded-[30px]">
                {/* <Link to="/" className="absolute top-0 right-0 text-gray-500 hover:text-gray-700">
                    <Close />
                </Link> */}

                <div className={"uppercase font-bold text-3xl mt-8"}>TeckMart</div>
                <div className="px-10  rounded-md  flex flex-col justify-center items-center w-full  mt-10">
                    <h1 className="font-medium text-xl mb-6 mt-3">Tạo tài khoản</h1>
                    <FormControl variant="outlined" className={"w-full !my-4"}>
                        <InputLabel htmlFor="outlined-adornment-username">UserName</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            value={username}
                            onChange={handleNameChange}
                            label="UserName"
                            type="username"
                            className="!rounded-[10px]"
                        />
                    </FormControl>

                    <div className={"grid grid-cols-2 gap-3 w-full"}>
                        <FormControl variant="outlined" className={"w-full !my-4"}>
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                value={email}
                                onChange={handleEmailChange}
                                type="email"
                                label="Email"
                            className="!rounded-[10px]"

                            />
                        </FormControl>

                        <FormControl variant="outlined" className={"w-full !my-4"}>
                            <InputLabel htmlFor="outlined-adornment-phonenumber">Số điện thoại</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phonenumber"
                                value={phonenumber}
                                onChange={handlePhoneChange}
                                label="Số điện thoại"
                                type="phonenumber"
                            className="!rounded-[10px]"

                            />
                        </FormControl>
                    </div>

                    {/* <TextField label="Địa chỉ" className="w-full !my-4" /> */}
                    <div className={"grid grid-cols-2 gap-3 w-full"}>
                        <FormControl variant="outlined" className={"w-full !my-4"}>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Mật khẩu
                            </InputLabel>
                            <OutlinedInput
                                value={password}
                            className="!rounded-[10px]"

                                onChange={handlePasswordChange}
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                            />
                        </FormControl>
                        <FormControl variant="outlined" className={"w-full !my-4"}>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Nhập lại mật khẩu
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                            className="!rounded-[10px]"

                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Nhập lại mật khẩu"
                            />
                        </FormControl>
                    </div>
                    <div>
                        {
                            !loading ? <Button
                                variant="contained"
                                className={"!my-4 w-[200px] h-[50px] !rounded-[10px]"}
                                onClick={registerHandling}
                            >
                                Tạo tài khoản
                            </Button> : <Button variant="contained"
                                className={"!my-4 w-[200px] h-[50px]"} disabled={true}>
                                <CircularProgress className={'h-4'} />
                            </Button>
                        }
                    </div>
                </div>
                <div className={'flex justify-end items-center w-full p-6'}><Link to={'/login'}
                    className={'underline hover:text-blue-700 hover:cursor-pointer'}>Trở
                    về trang đăng nhập</Link></div>
            </div>
        </div>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(CreateAccount);
