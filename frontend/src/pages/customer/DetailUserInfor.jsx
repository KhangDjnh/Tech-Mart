import React from 'react';
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import DetailUser from "../../components/DetailUser.jsx"
function DetailUserInfor(props) {
    return (
        <div>
            <div className={' bg-gray-50'}>
                <div className={'mx-20'}>
                    <Navbar />
                    <DetailUser/>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default DetailUserInfor;