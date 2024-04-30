const api_url = "https://d35wqxpd6lbf36.cloudfront.net" // TODO: Change this to env variable

export default async function fetch_data() {
    try {
        let response = await fetch(`${api_url}/api/graph`)
        return response.json()
    }catch (e) {
        console.log(`Error fetching data: ${e}`)
    }
}