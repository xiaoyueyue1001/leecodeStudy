/**
 * 
 * @param a 子串1
 * @param b 子串2
 * 
 * 将2个子串做矩阵的2边
 * 判断各坐标的x,y轴对应的数据是否相等，相等取1，否则为0
 * 坐上到右下斜线连续的1为共同子串，坐标x,y为其在a,b的坐标信息
 * 可以优化坐标值若为1则加上左上角1位的坐标值，则矩阵的值由是否相等变成共同字串长度
 * 最矩阵最大值和其坐标信息获取最长共同子串
 */
const fn: (a: string, b: string) => string = (a, b) => {
    // a对应y轴  b对应x轴
    let array: any[][] = new Array(b.length).fill(undefined).map(item => new Array(a.length).fill(0));
    let max = 0;
    let maxP = {
        x: 0,
        y: 0
    }
    array.forEach((row, x) => {
        row.forEach((index, y) => {
            if (x * y > 0) {
                array[x][y] = a[y] === b[x] ? (array[x - 1][y - 1] + 1) : 0
            } else {
                array[x][y] = a[y] === b[x] ? 1 : 0
            }
            // 记录最大坐标
            if (array[x][y] > max) {
                max = array[x][y];
                maxP.x = x;
                maxP.y = y;
            }
        })
    })
    if (max > 0) {
        return a.slice(maxP.y - max + 1, maxP.y + 1)
    } else {
        return ""
    }
}

const a = "bhbiafjkdgjkasgdknqkjbaila";
const b = "dgsajkdgjkasgdkabgduyiofqe";
console.log(`${a}与${b}的最长公共子串为:${fn(a, b)}`)
export default {}