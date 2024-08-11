// src/utils/timeUtils.js

export function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = {
        năm: 31536000,
        tháng: 2592000,
        tuần: 604800,
        ngày: 86400,
        giờ: 3600,
        phút: 60,
        giây: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const amount = Math.floor(diffInSeconds / value);
        if (amount >= 1) {
            return `${amount} ${unit} trước`;
        }
    }

    return "vừa xong";
}
