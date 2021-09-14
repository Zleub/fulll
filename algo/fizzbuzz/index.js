const fizzbuzz = n => {
    let buffer = ""
    let i = 1

    while (i <= n) {
        let res = ""

        if (i % 3 == 0)
            res += 'Fizz'
        if (i % 5 == 0)
            res += 'Buzz'
        if (res == "")
            res += String(i)
        buffer += res + '\n'
        i += 1
    }

    process.stdout.write(buffer)
}

if (!module.parent) {
    fizzbuzz(process.argv[2])
}