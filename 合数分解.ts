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
const isPrime: (a: number) => boolean = (a) => {
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

const getPrimeList: (a: number) => number[] = (a) => {
    let list: number[] = [];
    for (let i = 2; i <= a; i++) {
        if (isPrime(i)) {
            list.push(i);
        }
    }
    return list
}

const fn: (a: number) => number[] = (a) => {
    if (isPrime(a)) {
        return [1, a]
    } else {
        let list: number[] = getPrimeList(Math.ceil(Math.sqrt(a)));
        let resList: number[] = [];
        while (true) {
            let res: number = fnItemn(a, list);
            if (res === 1) {
                resList.push(a);
                break;
            } else {
                resList.push(res);
                a = a / res;
                list = list.filter(item => item <= Math.ceil(Math.sqrt(a)));
            }
        }
        return resList
    }
}

/** 
 * 
*/
const fnItemn: (a: number, list: number[]) => number = (a, list) => {
    let res: number = 1;
    list.some(item => {
        if (a % item === 0) {
            res = item;
            return true;
        }
    })
    return res;
}

const a = 3083;
let date = new Date().getTime();
const list = fn(a);
let time = new Date().getTime() - date;
console.log(`${a}分解质因式为${list}`)
console.log(`各因子乘积为${list.reduce((a, b) => a * b, 1)},与原值计算结果为:${a === list.reduce((a, b) => a * b, 1)}`)
console.log(`计算总用时${time}ms`)

export default {}