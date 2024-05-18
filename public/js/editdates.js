/* Function to use lastModified property */
let x = document.lastModified;

function formatDate(dateString) {
    // Split the input string into date and time parts
    const [datePart, timePart] = dateString.split(' ');

    // Parse the date part
    const [month, day, year] = datePart.split('/');

    // Create a date object using the UTC time to avoid time zone issues
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    // Get the month, date, and year values
    const formattedMonth = parsedDate.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const formattedDay = parsedDate.getUTCDate(); // Use getUTCDate to avoid local time zone adjustments
    const formattedYear = parsedDate.getUTCFullYear();

    // Format the date string
    const formattedDate = `${formattedMonth} ${formattedDay}, ${formattedYear}`;

    return formattedDate;
}

// Example usage
const formattedDateString = formatDate(x);
console.log(formattedDateString);
document.getElementById("sudo").innerHTML = "Last Updated: " + formattedDateString;