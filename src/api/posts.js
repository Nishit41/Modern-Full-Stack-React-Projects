export const getPosts = async (queryParams) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts?` +   new URLSearchParams(queryParams),
    )
    return await response.json()
}