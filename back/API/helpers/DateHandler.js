
module.exports = class DateHandler {


    static getFormattedDate(date){
        return date.toLocaleDateString(
            'fr-FR', 
            { year: 'numeric', month: 'numeric', day: 'numeric' }
        );
    }

    static getFormattedHours(date){
        return new Intl.DateTimeFormat(
            "fr-FR", 
            { hour: "numeric", minute: "numeric"}
        ).format(date);
    }

    static wasToday(date){
        const today = new Date();
        return  date.getDate() == today.getDate() &&
                date.getMonth() == today.getMonth() &&
                date.getFullYear() == today.getFullYear()
    }

    static wasYesterday(date){
        const today       = new Date();
        const yesterday   = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);

        return  date.getDate() == yesterday.getDate() &&
                date.getMonth() == yesterday.getMonth() &&
                date.getFullYear() == yesterday.getFullYear()
    }

    static getDateFromNow(timestamp){
        const date = new Date(this.timestamp * 1000);
        if(this.wasToday(timestamp)) return "Aujourd'hui à " + this.getFormattedHours(timestamp);
        else if(this.wasYesterday(timestamp)) return "Hier à " + this.getFormattedHours(timestamp);
        else return this.getFormattedDate(timestamp);
    }

}