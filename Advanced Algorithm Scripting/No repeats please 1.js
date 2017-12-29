function permAlone(string) {
    return _perm(string.split('')).filter(function(str) {
        return !/(\w)\1/.test(str);
    }).length;
    function _perm(arr) {
        return arr.length === 0 ? [[]] : _perm(arr.slice(1)).reduce(function(accum, curr) {
            // 插值的实现
            for (var i = 0; i < arr.length; i++) {
                accum.push([curr.slice(0, i), arr[0], curr.slice(i)].join(''));
            }
            return accum;
        }, []);
    }
}
