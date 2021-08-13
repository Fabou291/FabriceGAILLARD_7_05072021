export default class HTTPRequest{
    static baseUrl = "http://localhost:3000/api/";

    static getAuthorizationHeader(){
        return { 'Authorization' : 'Bearer: ' + window.localStorage.getItem('accessToken') };
    }

    static async get(uri, authentication = true, headers = {}){
        if(authentication) headers = { ...headers, ...this.getAuthorizationHeader() }
        return await fetch(this.baseUrl + uri, {
            method: "GET",
            headers: { ...headers }
        });
    }

    static async post(uri, body = {}, authentication = true, headers = {}){
        if(authentication) headers = { ...headers, ...this.getAuthorizationHeader() }

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