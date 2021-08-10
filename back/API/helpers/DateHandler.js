
module.exports = class DateHandler {

    timestamp;
    date;
    
    constructor(timestamp){
        this.timestamp = timestamp;
        this.date = new Date(this.timestamp * 1000);

    }

    getFormattedDate(){
        return this.date.toLocaleDateString(
            'fr-FR', 
            { year: 'numeric', month: 'numeric', day: 'numeric' }
        );
    }

    getFormattedHours(){
        const options = {hour: "numeric", minute: "numeric"};
        return new Intl.DateTimeFormat("fr-FR", options).format(this.date);
    }

    wasToday(){
        const today = new Date();
        return  this.date.getDate() == today.getDate() &&
                this.date.getMonth() == today.getMonth() &&
                this.date.getFullYear() == today.getFullYear()
    }
    wasYesterday(){
        const today       = new Date();
        const yesterday   = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

        return  this.date.getDate() == yesterday.getDate() &&
                this.date.getMonth() == yesterday.getMonth() &&
                this.date.getFullYear() == yesterday.getFullYear()
    }




    getDateFromNow(){

        if(this.wasToday()) return "Aujourd'hui à " + this.getFormattedHours();
        else if(this.wasYesterday()) return "Hier à " + this.getFormattedHours();
        else return this.getFormattedDate();
    }

}