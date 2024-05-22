export default async function getUser(id) {
    const response = await fetch(
        `https://finance-tracking-drf.onrender.com/users/profile/${id}/`
    );
    const data = await response.json();
    return data;
}
