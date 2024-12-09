export function formatStatus(status){
    if(status == "pending") return "Đang xử lý";
    else if(status == "confirmed") return "Đã xác nhận";
    else if(status == "shipped") return "Đang vận chuyển";
    else if(status == "delivered") return "Đã giao hàng";
    else if(status == "canceled") return "Đơn hủy";
    else return "Đơn lỗi";
}