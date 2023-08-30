export default function currencyFormatter(price) {
    const formatter = new Intl.NumberFormat(undefined,{style:'currency', currency: 'USD'})
    return formatter.format(price)
}