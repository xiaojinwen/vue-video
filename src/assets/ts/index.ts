export const deepClone = (obj: any): any => {
    if (!isObject(obj)) {
        return obj;
    }
    // const type: string = Object.prototype.toString.call(obj);
    const deepCloneObj: any = Array.isArray(obj) ? [] : {};
    Reflect.ownKeys(obj).forEach((key: any) => {
        deepCloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
    });
    return deepCloneObj;
};

export const isObject = (obj: any): boolean => {
    return obj !== null && typeof obj === "object";
};
