const increment = number => {
    let i = number.length - 1
    while (number[i] + 1 == 10) {
        number[i] = 0
        i -= 1
    }
    number[i] += 1
    if (i == -1)
        number.splice(0, 0, 1)

    return number
}