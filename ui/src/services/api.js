const api_url = "https://eu-central-1-dev-graph-ui-lb-718648556.eu-central-1.elb.amazonaws.com:5000" // TODO: Change this to env variable

export default async function fetch_data() {
    try {
        let response = await fetch(`${api_url}/api/graph`)
        return response.json()
    }catch (e) {
        console.log(`Error fetching data: ${e}`)
    }
}