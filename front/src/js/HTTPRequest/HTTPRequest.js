export default class HTTPRequest{
    static baseUrl = "http://localhost:3000/api/";

    static getAuthorizationHeader(){
        return { 'Authorization' : 'Bearer: ' + window.localStorage.getItem('accessToken') };
    }

    static getJsonHeader(){
        return { "Accept": "application/json", "Content-Type": "application/json" };
    }

    static async fetch(uri, method, body, headers ){
        return new Promise((resolve, reject) => {
            const requesInit = { 
                method, 
                headers : { ...headers, ...this.getJsonHeader(), ...this.getAuthorizationHeader() },
                body : JSON.stringify(body)
            };
                
            fetch(this.baseUrl + uri, requesInit)
            .then(response => {
                if(!response.ok) throw response;
                return response.json();
            })
            .then(data => resolve(data))
            .catch(e =>  reject(e))
        }) 
    }

    static async get(uri){
        return await this.fetch(uri, 'GET');
    }

    static async post(uri, body){
        return await this.fetch(uri, 'POST', body);
    }

    static async delete(uri){
        return await this.fetch(uri, 'DELETE');
    }

    static async put(uri, body){
        return await this.fetch(uri, 'PUT', body);
    }



}