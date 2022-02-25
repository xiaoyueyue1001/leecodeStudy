/**
 * 
 * @param a 
 * @param b 
 * 
 * 取2个正整数，若相等则公约数为其本身
 * 若不想等，设 a>b,则存在a = kb +r,其中a,b,k,r均为正整数 且 r<b 且r = a%b
 * 取x为，a,b的公约数，则x > 0
 * r = a - kb  =>  r/x = a/x - kb/x  则r/x也是整数  则x也是r的约数
 * 得出结论a,b的公约数也是r的约数  所以（a,b）的约数也是（b,a%b）的约数
 * 其中a > b   b > a%b  可以通过这个公式不停的减小（a,b）的值 ，指导数字足够小（a%b === 0）便于计算
 */
const fn: (a: number, b: number) => number = (a, b) => {
    let temp = 0;
    while (a % b > 0) {
        temp = a % b;
        a = b;
        b = temp
    }
    return b
}

const a = 123123;
const b = 312312;
console.log(`${a}与${b}的最大公约数为:${fn(a, b)}`)
export default {}