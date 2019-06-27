const moment = require("moment")


export default function formatDate(date) {
    date = moment(date)
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 3600);

    if(interval >= 48){
        return moment(date).format("LLL")
    }
    if(interval >= 24){
        return "yesterday at " + moment(date).format("hh:mm a") 
    }
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }