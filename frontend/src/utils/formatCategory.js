export function formatCatergory(category){
    switch (category){
        case "Laptop": return "Laptop";
        case "Smartphone": return "Smartphone";
        case "Monitor": return "Màn hình";
        case "Mouse": return "Chuột";
        case "Keyboard": return "Bàn phím";
        case "Headphone": return "Tai nghe";
        default: return "";
    }
}