export const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export const getDay = (): string => {
    let day = new Date();
    let hr = day.getHours();
    let name = ''
    if (hr >= 0 && hr < 12) {
        name = "Good morning";
    } else if (hr == 12) {
        name = "Good afternoon";
    } else if (hr >= 12 && hr <= 17) {
        name = "Good afternoon";
    } else {
        name = "Good evening";
    }
    return name
}