import router from "../../router/index.js";
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
        let requesInit = { 
            method, 
            headers : { ...headers, ...this.getAuthorizationHeader() },
            body
        };
        const response = await fetch(this.baseUrl + uri, requesInit);

        if(!response.ok){
            const error = await response.json();
            if(error.message == 'jwt expired'){
                try{ 
                    const response = await this.refreshToken();
                    if(!response.ok) throw { message : 'Jwt refresh expire' }
                    const { accessToken } = await response.json();
                    window.localStorage.setItem('accessToken', accessToken)
                    return await this.fetch(uri, method, headers, body );
                } catch(e){
                    router.push({ name: "Login" })
                    console.log(e)
                }
            }
        } 

        return await response.json();            
    }

    static async refreshToken(){
        return await fetch(this.baseUrl + 'auth/refresh-token', {
            method : 'GET',
            headers : { ...this.getAuthorizationHeader(), ...this.getJsonHeader() }
        });
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