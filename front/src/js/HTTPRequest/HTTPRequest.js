export default class HTTPRequest{
    static baseUrl = "http://localhost:3000/api/";

    static getAuthorizationHeader(){
        return { 'Authorization' : 'Bearer: ' + window.localStorage.getItem('accessToken') };
    }

    static getJsonHeader(){
        return { "Accept": "application/json", "Content-Type": "application/json" };
    }

    static getFormDataHeader(){
        return { 'Content-Type': 'multipart/form-data' };
    }

    static async fetch(uri, method, headers, body ){
        return new Promise((resolve, reject) => {
            let requesInit = { 
                method, 
                headers : { ...headers, ...this.getAuthorizationHeader() },
                body
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

    static convertToFormData(body){
        const formData  = new FormData();
        for (const key in body) {
            formData.append(key, body[key])
        }
        return formData;
    }

    static async get(uri){
        return await this.fetch(uri, 'GET', this.getJsonHeader());
    }

    static async post(uri, body, formData = false){
        const headers = formData ? {} : this.getJsonHeader(); 
        body = formData ? body : JSON.stringify(body) ;
        return await this.fetch(uri, 'POST', headers, body);
    }

    static async delete(uri){
        return await this.fetch(uri, 'DELETE', this.getJsonHeader());
    }

    static async put(uri, body, formData = false){
        const headers = formData ? {} : this.getJsonHeader(); 
        body = formData ? body : JSON.stringify(body) ;
        
        return await this.fetch(uri, 'PUT', headers, body);
    }



}