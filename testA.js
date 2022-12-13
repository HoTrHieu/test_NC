const getUrlParams = function(path, pattern) {
    const arrPath = path.split('/');
    const arrPattern = pattern.split('/');
    const result = {};
    
    for(let i = 0; i < arrPattern.length; i++) {
        if(arrPattern[i].includes(':')) {
            const key = arrPattern[i].replace(':', '');
            result[key] = arrPath[i];
        } else if(arrPattern[i] !== arrPath[i]) break;   
    }

    return result;
}


// for 1 level
// const objectDiff = function(source, target) {
//     const result = {};
    
//     const arrKeySource = Object.keys(source);
//     const arrKeyTarget = Object.keys(target);
//     const arraykey = [...new Set([...arrKeySource, ...arrKeyTarget])];
    
//     for(let i = 0; i < arraykey.length; i++) {
//         if(source[arraykey[i]] === target[arraykey[i]]) continue;

//         result[arraykey[i]] = {
//             old: source[arraykey[i]],
//             new: target[arraykey[i]],
//         }
//     }
    
        

//     return result;
// }

// for multiple level
const objectDiff = function(source = {}, target = {}) {
    const result = {};
    
    const arrKeySource = Object.keys(source);
    const arrKeyTarget = Object.keys(target);
    const arraykey = [...new Set([...arrKeySource, ...arrKeyTarget])];
    
    for(let i = 0; i < arraykey.length; i++) {
        if(typeof(source[arraykey[i]]) === 'object' || typeof(target[arraykey[i]]) === 'object') {
            const deepDiff = objectDiff(source[arraykey[i]], target[arraykey[i]]);
            if(Object.keys(deepDiff).length !== 0) {
                result[arraykey[i]] = deepDiff;
            }
            continue;
        }
        
        
        if(source[arraykey[i]] === target[arraykey[i]]) continue;

        result[arraykey[i]] = {
            old: source[arraykey[i]],
            new: target[arraykey[i]],
        }
    }
    
    return result;
}

objectDiff({id: '1', count: 0} , {id: '1', name: 'khan', count: 1})
objectDiff({id: '1', count: 0} , {id: '1', name: 'khan', count: 1, check: {a: 1, b: 2}})
objectDiff({id: '1', count: 0, check: {a: 1, b: 2, c: { d: 3, e: 4}}} , {id: '1', name: 'khan', count: 1, check: {a: 1, b: 2}})
objectDiff({id: '1', count: 0, check: {a: 1, b: 2, c: { d: 3, e: 4}}} , {id: '1', name: 'khan', count: 1, check: {a: 1, b: 2, c: { d: 3}}})