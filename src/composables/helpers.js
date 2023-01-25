function toTitleCase(title){
    return title.replaceAll('-', ' ')
}

function toKebabCase(title) {
    return title.replaceAll(' ', '-')
}

function toDateTime(secs) {
    let t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    const months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Obtober",
      "November",
      "December",
    ];
    const day = t.getDate();
    const month = months[t.getMonth()];
    const year = t.getFullYear();
    return month + " " + day + ", " + year;
}

export {toTitleCase, toKebabCase, toDateTime}