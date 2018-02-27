var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
function bubbleSort(arr) {
    console.time('冒泡排序耗时');
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    console.timeEnd('冒泡排序耗时');
    return arr;
}


function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length - 1;
    while (i > 0) {
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j; //记录交换位置
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
        i = pos;
    }
    console.timeEnd('改进后冒泡排序耗时');
    return arr;
}

function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时:');
    var i = arr.length - 1;
    while (i > 0) {
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
        i = pos;
    }
    console.timeEnd('改进后冒泡排序耗时:');
    return arr;
}

function bubbleSort3(arr) {
    var low = 0,
        high = arr.length - 1,
        tmp,
        j,
        tip = '2.改进后冒泡排序耗时';
    console.time(tip);
    while (low < high) {
        for (j = low; j < high; ++j) {
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
        --high;
        for (j = high; j > low; --j) {
            if (arr[j] < arr[j - 1]) {
                tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
            }
        }
        ++low;
    }
    console.timeEnd(tip);
    return arr;
}
// console.log(bubbleSort(arr));
console.log(bubbleSort2(arr));
// console.log(bubbleSort3(arr));


// function selectSort(arr) {
//     var len = arr.length,
//         minIndex, temp,
//         tip = '选择排序耗时';
//     console.time(tip);
//     for (var i = 0; i < len - 1; i++) {
//         minIndex = i;
//         for (var j = i + 1; j < len; j++) {
//             if (arr[j] < arr[minIndex]) {
//                 minIndex = j;
//             }
//         }
//         temp = arr[i];
//         arr[i] = arr[minIndex];
//         arr[minIndex] = temp;
//     }
//     console.timeEnd(tip);
//     return arr;
// }

function selectSort(arr) {
    var len = arr.length, minIndex, temp;
    console.time('选择排序耗时:')
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时:');
    return arr;
}

// console.log(selectSort(arr));

function insertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('插入排序耗时:');
        for (var i = 1; i < array.length; i++) {
            var key = array[i],
                j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        console.timeEnd('插入排序耗时:');
        return array;
    } else {
        return 'array is not an Array';
    }
}

function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('二分插入排序耗时:');
        for (var i = 1; i < array.length; i++) {
            var key = array[i], left = 0, right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时:');
        return array;
    } else {
        return 'array is not an Array';
    }
}
// console.log(insertionSort(arr));
// console.log(binaryInsertionSort(arr));


function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while (gap < len / 5) {
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}

// console.log(shellSort(arr));