export function formatStatus(status){
    if(status == "pending") return "Đang chờ xác nhận";
    else if(status == "confirmed") return "Đã xác nhận";
    else if(status == "confirmed") return "Đã vận chuyển";
    else if(status == "confirmed") return "Đã giao hàng";
    else if(status == "confirmed") return "Đơn hủy";
    else return "Đơn lỗi";
}