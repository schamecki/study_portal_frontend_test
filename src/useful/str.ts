export function formatPhoneNumber(num: string) {
    return num.toString().replace(/(\d{3})(?=\d)/g, '$1-');
}

export function unFormatPhoneNumber(num: string) {
    return num.toString().replace(/-/g, '');
}