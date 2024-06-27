obj = {}

array1 = [[0, 'casino'], [1, 'they'], [3, 'casino']]

array2 = array1.map((data ,i, array)=> {
    if(data[1]===array[i+1][1]){
        obj[`${data[1]}`] = array[i][0]
    }else{
        obj[`${data[1]}`] = array[i][0]
    }
})