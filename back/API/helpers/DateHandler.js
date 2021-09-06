
module.exports = class DateHandler {

    /**
     * @name getFormattedDate
     * @description Récupère/Transforme la date au format FR
     * @param {String} date 
     * @returns {String}
     */
    static getFormattedDate(date){
        return date.toLocaleDateString(
            'fr-FR', 
            { year: 'numeric', month: 'numeric', day: 'numeric' }
        );
    }

    /**
     * @name getFormattedHours
     * @description Récupère l'heur formaté au format FR
     * @param {String} date 
     * @returns {String}
     */
    static getFormattedHours(date){
        return new Intl.DateTimeFormat(
            "fr-FR", 
            { hour: "numeric", minute: "numeric"}
        ).format(date);
    }

    /**
     * @name wasToday
     * @description Détermine si la date est d'aujourd'hui
     * @param {String} date 
     * @returns {Boolean}
     */
    static wasToday(date){
        const today = new Date();
        return  date.getDate() == today.getDate() &&
                date.getMonth() == today.getMonth() &&
                date.getFullYear() == today.getFullYear()
    }

    /**
     * @name wasYesterday
     * @description Détermine si la date est d'hier
     * @param {String} date 
     * @returns {Boolean}
     */
    static wasYesterday(date){
        const today       = new Date();
        const yesterday   = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);

        return  date.getDate() == yesterday.getDate() &&
                date.getMonth() == yesterday.getMonth() &&
                date.getFullYear() == yesterday.getFullYear()
    }

    /**
     * @name getDateFromNow
     * @description Récupère/Calcul le temps passé entre le timestamp et aujourd'hui
     * @param {String} timestamp 
     * @returns {String}
     */
    static getDateFromNow(timestamp){
        const date = new Date(this.timestamp * 1000);
        if(this.wasToday(timestamp)) return "Aujourd'hui à " + this.getFormattedHours(timestamp);
        else if(this.wasYesterday(timestamp)) return "Hier à " + this.getFormattedHours(timestamp);
        else return this.getFormattedDate(timestamp);
    }

}