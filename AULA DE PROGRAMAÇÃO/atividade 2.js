const numss = [100,50, 3, 1, 101, -2]
console.log(Math.max(...numss))
console.log(Math.min(...numss))
function max(...numbers) {
    let max = numbers[0] 
    for (let i = 1; 