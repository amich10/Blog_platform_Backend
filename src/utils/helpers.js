export const randomStringGenerator = (length =100) =>{
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let lenOfChars = chars.length

    let randomChars = ''

    for(let i=0; i < length; i++){
        let randomNum = Math.floor(Math.random()* lenOfChars)
        randomChars += chars[randomNum]
    }
    return randomChars
}
