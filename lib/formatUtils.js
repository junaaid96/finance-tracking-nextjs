// formated currency
export function formatCurrency(amount, currencyCode = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
    }).format(amount);
}

//formated date and time
export function formatDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return dateTime.toLocaleString(undefined, options);
}
