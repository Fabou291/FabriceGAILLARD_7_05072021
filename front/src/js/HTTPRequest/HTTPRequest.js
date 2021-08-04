export default class HTTPRequest{
    static baseUrl = "http://localhost:3000/api/";


    static async get(uri){
        return await fetch(this.baseUrl + uri);
    }

    static async post(uri, body = {}, headers = {}){
        return await fetch(this.baseUrl + uri, {
            method: "POST",
            headers: { ...headers, "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    }

    static async delete(uri){
        uri
    }

    static async update(uri){
        uri
    }



}