export function formatStatus(status){
    switch (status){
        case "pending": return "Đang xử lý";
        case "confirmed": return "Đã xác nhận";
        case "shipped": return "Đang vận chuyển";
        case "delivered": return "Đã giao hàng";
        case "canceled": return "Đơn hủy";
        case "paid": return "Đã thanh toán";
        default: return "Đơn lỗi";
    }
}