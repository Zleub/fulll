const fizzbuzz = n => {
    // let array = new Array(Number(n)).fill().map((x, i) => i + 1)
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

    // for (let i = 1; i <= n; i++) {
    //     if (i % 3 == 0 && i % 5 == 0)
    //         console.log('FizzBuzz')
    //     else if (i % 3 == 0)
    //         console.log('Fizz')
    //     else if (i % 5 == 0)
    //         console.log('Buzz')
    //     else
    //         console.log(i)
    // }
}

if (!module.parent) {
    // console.log(process.argv[2])
    fizzbuzz(process.argv[2])
}