const dateTransform = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const dateObj = new Date(date);
    const monthName = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    const formatDate = monthName + " " + day + ", " + year;
    return formatDate;
  };
  
  export default dateTransform;
  