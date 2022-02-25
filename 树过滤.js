function fliterTree(option) {
    let tree = option.tree || {};
    let keyword = option.keyword || "";
    let searchKey = option.searchKey || "";
    let childrenKey = option.childrenKey || "list";

    if (tree[searchKey].includes(keyword)) {
        // 节点包含搜索的结果 阻止向下递归查询
        return option.tree
    } else {
        // 节点不包含搜索结果则向下继续递归查询
        if (tree[childrenKey].length === 0) {
            // 无子节点表示当前节点为叶子节点
            // 可以递归到叶子节点并且不包含搜索内容的节点则过滤掉
            tree.filter = true
        } else {
            // 有子节点继续向下递归查询
            tree[childrenKey].forEach(node => {
                node[childrenKey] = node[childrenKey] || []
                filterTreeRecursion({
                    ...option,
                    tree: node
                })
            })
            // 向上回退时过滤掉需要过滤掉子叶子节点，假如子节点全部被过滤则成为新掉子节点，需要在判断是否含有搜索元素
            tree[childrenKey] = tree[childrenKey].filter(item => !item.filter)
            if (tree[childrenKey].length === 0) {
                tree.filter = true
            }
        }


    }
    return option.tree
}

let tree = {
    id: 1,
    label: "a",
    list: [
        {
            id: 11,
            label: "b",
            list: [
                {
                    id: 11,
                    label: "c",
                    list: [
                        {
                            id: 11,
                            label: "d"
                        }
                    ]
                }
            ]
        },
        {
            id: 11,
            label: "x",
            list: [
                {
                    id: 11,
                    label: "y",
                    list: [
                        {
                            id: 11,
                            label: "z",
                            list: []
                        },
                        {
                            id: 11,
                            label: "m"
                        }
                    ]
                }
            ]
        },
    ]
}


let resTree = fliterTree({
    tree: tree,
    keyword: "x",
    searchKey: "label",
    childrenKey: "list"
});
console.log(resTree)