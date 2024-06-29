obj = {}

array1 = [[0, 'casino'], [1, 'they'], [3, 'casino']]

array2 = array1.map((data ,i, array)=> {
    if(data[1]===array[i+1][1]){
        obj[`${data[1]}`] = array[i][0]
    }else{
        obj[`${data[1]}`] = array[i][0]
    }
})

const objt = [
{
    obt1: 'casa',
    price: '1000',
    onShop: 1
},
{
    obt2: 'depa',
    price: '1000',
    onShop: 2
}
]