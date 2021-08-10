const ONE_DAY = 24 * 60 * 60 *1000; 

module.exports = class DateHandler {

    timestamp;
    date;
    currentDate = Date.now();

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

    isSmallerThanDays(days){
        return this.getDateGap() < ONE_DAY*days;
    }

    getDateGap(){
        return this.currentDate - this.timestamp*1000;
    }


    getDateFromNow(){
        if(!this.isSmallerThanDays(2)) return this.getFormattedDate();

        if(this.isSmallerThanDays(1)) return "Aujourd'hui à " + this.getFormattedHours();

        if(this.isSmallerThanDays(2)) return "Hier à " + this.getFormattedHours();
    }

}