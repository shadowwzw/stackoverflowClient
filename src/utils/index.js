export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const parseSearch = search =>
    search.slice(1).split('&').map(item => item.split('=')).reduce((accum, item) => ({
    ...accum, [item[0]]: item[1]
    }), {})