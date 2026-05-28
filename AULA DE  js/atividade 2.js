const numss = [100,50, 3, 1, 101, -2]
console.log(Math.max(...numss))
console.log(Math.min(...numss))
function max(...numbers) {
    let max = numbers[0] 
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i]
        }
    }
    return max
}
function min(...numbers) {
    let min = numbers[0]    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i]
        }
    }
    return min
}
console.log(max(...numss))
console.log(min(...numss))  

