export function formatDate(unixTimestamp, short) {
    // Define an array of month names in Russian
    const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]

    // Create a Date object from the Unix timestamp (multiply by 1000 to convert to milliseconds)
    const date = new Date(unixTimestamp * 1000)

    // Extract the day, month, and year
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    // Format the date using the extracted values and monthNames
    const formattedDate = `${day} ${monthNames[month]} ${year}`

    if (short) {
        return `${day} ${monthNames[month]} ${year}`
    }

    return formattedDate
}
