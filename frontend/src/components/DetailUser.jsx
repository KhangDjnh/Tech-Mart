import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HomeIcon from '@mui/icons-material/Home';
import ManIcon from '@mui/icons-material/Man';
import { userApi } from "../../api/userApi.js"


function DetailUser(props) {
    console.log('Session data:', localStorage);
    const { userDetails } = JSON.parse(localStorage.getItem('session'))
    console.log('Session data:', localStorage.getItem('session'));
    const [infor, setInfor] = useState({});
    useEffect(() => {
        const fetchData = async (userId) => {
            try {
                if (!userId) {
                    console.warn("User ID is undefined.");
                    return;
                }
                console.log('Chua fetch data')
                const res = await userApi.getUserById(userId);
                console.log('Respond: ', res);
                setInfor(res.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        //fetchData(userDetails._id);
        if (userDetails?._id) {
            fetchData(userDetails?._id);
        } else {
            console.error("userDetails._id is not available.");
        }
    }, []);
    console.log(infor)

    return (
        <div className={'mt-20'}>
            <div className='border-b-[1px]  pb-2 pt-8 mb-6 border-gray-700'>
                <h1 className='font-bold text-xl uppercase'>Hồ sơ của tôi</h1>
                <p>Thông tin cá nhân của bạn</p>
            </div>
            <div className='grid bg-white grid-cols-[60%,40%] cursor-pointer '>
                <div className={'py-6'}>
                    <div className={'flex flex-col gap-3  px-[10vw] '}>
                        <div className={'flex gap-3 items-center'}>
                            <div>
                                <PersonIcon />
                            </div>
                            <div>
                                <div className={'text-[#8F90A6]'}>Tên</div>
                                <div className={' text-[#1C1C28]'}>{infor?.fullname}</div>
                            </div>
                        </div>
                        <div className={'flex gap-3 items-center'}>
                            <div>
                                <PhoneIphoneIcon />
                            </div>
                            <div>
                                <div className={'text-[#8F90A6]'}>Số điện thoại</div>
                                <div className={' text-[#1C1C28]'}>{infor?.phonenumber}</div>
                            </div>
                        </div>

                        <div className={'flex gap-3 items-center'}>
                            <div>
                                <EmailIcon />
                            </div>
                            <div>
                                <div className={'text-[#8F90A6]'}>Email</div>
                                <div className={'text-[#1C1C28]'}>{infor?.email}</div>
                            </div>
                        </div>

                        <div className={'flex gap-3 items-center'}>
                            <div>
                                <HomeIcon />
                            </div>
                            <div>
                                <div className={'text-[#8F90A6]'}>Địa chỉ</div>
                                <div className={'text-[#1C1C28]'}>{infor?.address}</div>
                            </div>
                        </div>

                    </div>
                    <div className={'w-full flex justify-end mt-16'}>
                        <button type="button"
                            className="text-white rounded bg-red-700 hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center mr-6 mb-2">Cập
                            nhật thông tin
                        </button>
                    </div>
                </div>

                <div className={'border-l-[1px] p-10 flex flex-col items-center justify-center border-gray-700'}>
                    <div className=' flex flex-col items-center justify-center'>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <button type="button"
                            className="mt-4 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ">Chọn
                            ảnh
                        </button>
                        <p className='text-[#8F90A6]'>Dung lượng file tối đa 1 MB</p>
                        <p className='text-[#8F90A6]'>Định dạng: JPEG, .PNG</p>
                    </div>
                    <div className={'w-full justify-end mt-16 flex opacity-0 cursor-none'}>
                        <button type="button"
                            className="text-white rounded bg-red-700 hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center mr-6 mb-2">Cập
                            nhật thông tin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailUser;
