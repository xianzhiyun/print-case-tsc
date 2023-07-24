//string to utf8
function strToUtf8Bytes(text) {
    const code = encodeURIComponent(text)
    const bytes = []
    for (let i = 0;i < code.length;i++) {
        const c = code.charAt(i)
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2)
            const hexval = parseInt(hex, 16)
            bytes.push(hexval)
            i += 2
        } else {
            bytes.push(c.charCodeAt(0))
        }
    }
    return bytes
}

console.log(strToUtf8Bytes('达摩克利斯之剑'))
