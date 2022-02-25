// const obj = {
//     a: 1,
//     b: [1, 2, 3],
//     c: {
//         aa: 1
//     },
// }

// // 浅拷贝（仅第一层的基本数据类型与源对象独立，其他的引用型数据还是指向的同一地址空间）
// const obj_copy = {
//     ...obj
// }
// const obj_copy_deep = JSON.parse(JSON.stringify(obj));

// console.log("-------------浅拷贝------------------")
// obj.a = 2;
// obj.b[1] = 11;
// obj.c.aa = 111;
// console.log("obj          ", obj)
// console.log("obj_copy     ", obj_copy)



// console.log("-------------深拷贝------------------")
// console.log("obj_copy_deep", obj_copy_deep)


console.log("-------------环引用深拷贝1------------------")
let a: any = { b: 2 };
a.c = a;
let a_copy = { ...a }
let a_copy_deep = deppClone(a);
a.b = 22;
console.log("a          ", a)
console.log("a_copy     ", a_copy)
console.log("a_copy_deep", a_copy_deep)


console.log("-------------环引用深拷贝2------------------")
let obj_a: any = {};
let obj_b = { a: obj_a, c: 2 };
obj_a.b = obj_b;
let obj_a_copy = { ...obj_a }
let obj_a_copy_deep = deppClone(obj_a);
obj_b.c = 22;
console.log("obj_a          ", obj_a)
console.log("obj_a_copy     ", obj_a_copy)
console.log("obj_a_copy_deep", obj_a_copy_deep)




function deppClone(originObj: any, map = new WeakMap()) {
    if (!originObj || typeof originObj != 'object') {
        return originObj
    }

    if(originObj instanceof Date) {
        return new Date(originObj)
    }
    if(originObj instanceof RegExp) {
        return new RegExp(originObj)
    }

    // 拷贝之前查询其是否已经被记录了，如有则直接取值，否则拷贝后记录在map（这样可以防止环引用）
    if (map.get(originObj)) {
        return map.get(originObj)
    }
    // 拷贝容器
    let result: any = Array.isArray(originObj) ? [] : {};
    map.set(originObj, result);

    //获取需拷贝对象的所有键名
    let keys = Object.keys(originObj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let temp = originObj[key];
        result[key] = deppClone(temp, map);
    }
    return result
}
