function checkCashRegister(price, cash, cid) {
    // 计算应找金额
    var change = cash * 100 - price * 100;
    // 面值数组
    var denoNum = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
    // 面值名称数组，遍历的过程中添加
    var denoStr = [];
    // 零钱柜中可用找零总额
    var total = 0;
    // 零钱柜中面值名称与可用额度的 map
    var counterMap = {};
    // 结果数组
    var output = [];
    // 遍历 cid，更新上面定义的数组，对象
    // 这里完成了三件事将Cid 的每个数组的第一个元素添加岛denoStr 生成面值与可用额度的对应关系Map 已经计算出可用的总额
    for (var i = 0; i < cid.length; i++) {
        var temp = cid[i][1] * 100;
        denoStr.push(cid[i][0]);
        counterMap[cid[i][0]] = Math.round(temp);
        total += Math.round(temp);
    }
    // 边界条件
    if (change > total) {
        return 'Insufficient Funds';
    }
    if (change === total) {
        return 'Closed';
    }
    for (var i = denoNum.length - 1; i >= 0; i--) {
        // 找出需要试的金额，条件为比 change 小
        // 注意这里是从右开始遍历
        if (denoNum[i] <= change) {
            // 计算当前面值需要的总额
            var currentTotal = change - change % denoNum[i];
            if (counterMap[denoStr[i]] < currentTotal && counterMap[denoStr[i]] > 0) {
                // 处理柜台中当前面值的总额不为 0，但不够的情况
                output.push([denoStr[i], counterMap[denoStr[i]] / 100]);
                change -= counterMap[denoStr[i]];
            } else if (counterMap[denoStr[i]] >= currentTotal) {
                // 处理柜台中当前面值的总额够用的情况
                output.push([denoStr[i], currentTotal / 100]);
                change -= currentTotal;
            }
        }
        // 只要 change 为 0，就可以返回结果数组了
        if (change === 0) {
            return output;
        }
    }
    // 执行到这里表示无法凑出应找金额
    return "Insufficient Funds";
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
