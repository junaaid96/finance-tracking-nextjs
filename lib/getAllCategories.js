export default async function getAllCategories() {
    const response = await fetch(
        `https://finance-tracking-drf.onrender.com/categories/list/`
    );
    const data = await response.json();
    return data;
}
