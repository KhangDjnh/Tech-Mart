import TextField from "@mui/material/TextField";
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getActions} from "../../store/actions/authAction.js";
import {Link, useNavigate} from "react-router-dom";
import {notify} from "../../utils/toastify.js";
import eventEmitter from "../../utils/eventEmitter.js";
import CircularProgress from '@mui/material/CircularProgress';


function CreateAccount({register}) {
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
        <div className={" w-full h-[100vh] flex justify-center items-center"}>
            <div
                className="flex flex-col justify-center items-center w-[40vw] bg-white   shadow-[0px_0px_10px] shadow-gray-500 my-44">
                <div className={"uppercase font-bold text-3xl mt-8"}>TeckMart</div>
                <div className="px-10  rounded-md  flex flex-col justify-center items-center w-full  mt-10">
                    <h1 className="font-medium text-xl mb-6 mt-3">Tạo tài khoản</h1>
                    <TextField
                        label="UserName"
                        className="w-full !my-4 "
                        value={username}
                        onChange={handleNameChange}
                    />
                    <div className={"grid grid-cols-2 gap-3 w-full"}>
                        <TextField
                            label="Email"
                            className="w-full !my-4"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Số điện thoại"
                            className="w-full !my-4"
                            value={phonenumber}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    {/* <TextField label="Địa chỉ" className="w-full !my-4" /> */}
                    <div className={"grid grid-cols-2 gap-3 w-full"}>
                        <FormControl variant="outlined" className={"w-full !my-4"}>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Mật khẩu
                            </InputLabel>
                            <OutlinedInput
                                value={password}
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
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
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
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
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
                                className={"!my-4 w-[200px] h-[50px]"}
                                onClick={registerHandling}
                            >
                                Tạo tài khoản
                            </Button> : <Button variant="contained"
                                                className={"!my-4 w-[200px] h-[50px]"} disabled={true}>
                                <CircularProgress className={'h-4'}/>
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
