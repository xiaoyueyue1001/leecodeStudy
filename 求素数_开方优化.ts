/**
 * @param a 大于1的正整数
 * 
 * 若a非素数，则必然存在一个约数小于等于a的开方,因为约数成对出现若都大于a都开方必然相乘会大于a
 * 素数有一个特点，总是满足 num = 6x - 1 或 num = 6x + 1，其中 x 为自然数且有 x >= 1，证明如下
 * 6x 肯定不是素数，因为可以被 6 整除；
 * 6x + 1 未知；
 * 6x + 2 肯定不是素数，可以被 2 整除；
 * 6x + 3 肯定不是素数，可以被 3 整除；
 * 6x + 4 肯定不是素数，可以被 2 整除；
 * 6x + 5 未知, 并且 6x + 5 等同于 6x - 1;
 * 所以便利2到a的开方并且满足 6x+1与6x-1格式的值，若存在可以整除的则为合数，否则为素数
 */
const fn: (a: number) => boolean = (a) => {
    if (a < 4) {
        return true
    }
    if (a % 6 === 1 || a % 6 === 5) {
        let flag = true
        for (let i = 2; i <= Math.ceil(Math.sqrt(a)); i++) {
            if (a % i === 0) {
                flag = false
                break;
            }
        }
        return flag
    }
    return false
}

let list: number[] = []
for (let i = 101; i <= 200; i++) {
    if (fn(i)) {
        list.push(i)
    }
}
console.log(list)
export default {}