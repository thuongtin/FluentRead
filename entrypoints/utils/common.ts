// Chức năng hạn chế dòng điện chống rung, có thể truyền các thông số
import {franc} from "franc-min";

// Chức năng hạn chế dòng điện chống rung, có thể truyền các thông số
export function throttle(fn: (...args: any[]) => void, interval: number) {
    let last = 0; // Thời điểm thực hiện bảo trì lần cuối
    return function (this: any, ...args: any[]) {
        const now = Date.now();
        // Chỉ thực hiện nếu chênh lệch giữa thời gian hiện tại và thời gian thực hiện cuối cùng lớn hơn hoặc bằng khoảng thời gian
        if (now - last >= interval) {
            last = now;
            fn.apply(this, args);  // Sử dụng áp dụng để truyền mảng tham số
        }
    };
}

// Xuất ra các loại ngôn ngữ tiêu chuẩn, franc chỉ trả về kết quả đáng tin cậy nhất, francAll trả về tất cả kết quả bao gồm cả mức độ chắc chắn
export function detectlang(origin: string): string {
    const find = franc(origin, {minLength: 0});
    // Trả về mã ngôn ngữ tiêu chuẩn tương ứng
    switch (find) {
        case "cmn":
        case "zho":
            return "zh-Hans";
        case "eng":
            return "en";
        case "jpn":
            return "ja";
        case "kor":
            return "ko";
        case "fra":
            return "fr";
        case "rus":
            return "ru";
        default:
            return find; // Trả về kết quả nhận dạng bằng các ngôn ngữ khác
    }
}

// Lấy vị trí trung tâm của điểm tiếp xúc
export function getCenterPoint(touches: TouchList, point: number): { x: number, y: number } | undefined {
    // Kiểm tra xem số lượng điểm tiếp xúc có bằng số được chỉ định hay không
    if (touches.length !== point) return;

    let centerX = 0;
    let centerY = 0;
    // Tích lũy tọa độ của tất cả các điểm tiếp xúc
    for (let i = 0; i < touches.length; i++) {
        centerX += touches[i].clientX;
        centerY += touches[i].clientY;
    }
    // Tính tọa độ điểm trung tâm
    centerX /= touches.length;
    centerY /= touches.length;

    return {x: centerX, y: centerY};
}

// Tìm các phần tử khớp bằng bộ chọn, trả về các phần tử khớp hoặc sai
export function findMatchingElement(element: Element, selector: string): Element | false {
    // Kiểm tra xem phần tử hiện tại có khớp với bộ chọn đã truyền không
    if (element.matches(selector)) return element;

    // Duyệt qua các phần tử cha cho đến khi tìm thấy phần tử phù hợp hoặc không tìm thấy phần tử cha
    let parent = element.parentElement;
    while (parent) {
        if (parent.matches(selector)) return parent;
        parent = parent.parentElement;
    }

    return false; // Không tìm thấy phần tử phù hợp
}
