const number: (value: any) => string = (value: any): string => {
    const num = +value;
    if (num) {
        if (num >= 100000000) {
            return Math.round((num / 100000000) * 10) / 10 + "亿";
        } else if (num >= 10000000) {
            return Math.round((num / 10000000) * 10) / 10 + "千万";
        } else if (num >= 10000) {
            return Math.round((num / 10000) * 10) / 10 + "w";
        }
        return num + '';
    }
    return value;
};

export {
    number
};
