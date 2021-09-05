import router from "@/router/index.js";
export default class HTTPRequest {
    static baseUrl = "http://localhost:3000/api/";

    /**
     * @name getAuthorizationHeader
     * @description Récupère le header d'autorisation à partir du Token.
     * @returns {Object}
     */
    static getAuthorizationHeader() {
        return { Authorization: "Bearer: " + window.localStorage.getItem("accessToken") };
    }

    /**
     * @name getJsonHeader
     * @description Génère un objet d'un ensemble de header pour interpréter une requete en JSON
     * @returns {Object}
     */
    static getJsonHeader() {
        return { Accept: "application/json", "Content-Type": "application/json" };
    }

    /**
     * @name getFormDataHeader
     * @description Génère un objet de header pour interpréter une requete en form-data
     * @returns 
     */
    static getFormDataHeader() {
        return { "Content-Type": "multipart/form-data" };
    }

    /**
     * @name fetch
     * @description Permet de faire une requete auprès de l'API
     * @param {String} uri
     * @param {String} method
     * @param {Object} headers
     * @param {Object} body
     * @returns {Object}
     */
    static async fetch(uri, method, headers, body) {
        const response = await fetch(this.baseUrl + uri, {
            method,
            body,
            headers: { ...headers, ...this.getAuthorizationHeader() },
        });

        if (!response.ok) {
            const error = await response.json();
            if (error.message == "jwt expired") {
                try {
                    const response = await this.refreshToken();
                    if (!response.ok) throw { message: "Jwt refresh expire" };
                    const { accessToken } = await response.json();
                    window.localStorage.setItem("accessToken", accessToken);
                    return await this.fetch(uri, method, headers, body);
                } catch (e) {
                    router.push({ name: "Login" });
                    throw new Error("Invalid Token and Refresh Token");
                }
            } else {
                throw new Error(error.message);
            }
        } else return await response.json();
    }

    /**
     * @name refreshToken
     * @description Appelle la route pour refresh l'access token
     * @returns {Object}
     */
    static async refreshToken() {
        return await fetch(this.baseUrl + "auth/refresh-token", {
            method: "GET",
            headers: { ...this.getAuthorizationHeader(), ...this.getJsonHeader() },
        });
    }

    /**
     * @name convertToFormData
     * @description Convertie un objet destiné à une requete, en form data 
     * @param {Object} body 
     * @returns {Object}
     */
    static convertToFormData(body) {
        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }
        return formData;
    }

    /**
     * @name get
     * @description Requete à l'api avec la méthode GET
     * @param {String} uri 
     * @returns {Object}
     */
    static async get(uri) {
        return await this.fetch(uri, "GET", this.getJsonHeader());
    }
    
    /**
     * @name post
     * @description Requete à l'api avec la méthode POST
     * @param {String} uri 
     * @param {Object} body 
     * @param {Boolean} formData 
     * @returns {Object}
     */
    static async post(uri, body, formData = false) {
        const headers = formData ? {} : this.getJsonHeader();
        body = formData ? body : JSON.stringify(body);
        return await this.fetch(uri, "POST", headers, body);
    }

    /**
     * @name delete
     * @description Requete à l'api avec la méthode DELETE
     * @param {String} uri 
     * @returns {Object}
     */
    static async delete(uri) {
        return await this.fetch(uri, "DELETE", this.getJsonHeader());
    }

    /**
     * @name put
     * @description Requete à l'api avec la méthode PUT
     * @param {String} uri 
     * @param {Object} body 
     * @param {Boolean} formData 
     * @returns {Object}
     */
    static async put(uri, body, formData = false) {
        const headers = formData ? {} : this.getJsonHeader();
        body = formData ? body : JSON.stringify(body);

        return await this.fetch(uri, "PUT", headers, body);
    }
}
