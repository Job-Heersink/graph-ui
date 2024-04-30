const api_url = process.env.VUE_APP_API_URL || "http://localhost:5000"

export default async function fetch_data() {
    try {
        let response = await fetch(`${api_url}/api/graph`)
        return response.json()
    }catch (e) {
        console.log(`Error fetching data: ${e}`)
    }
}