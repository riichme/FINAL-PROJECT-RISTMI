// function to sum total price
export function sumPrice(items) {
    return items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
}

// function to format price to rupiah currency
export function formatRupiah(number) {
return new Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number)
  .replace(/[IDR]/gi, '')
  .replace(/(\.+\d{2})/, '')
  .trimStart()
}