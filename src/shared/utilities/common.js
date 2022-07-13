const filterClosure = (filters) => {

    return element => {
        const result = Object.keys(filters).every(key => {
            if(typeof(filters[key]) === 'object'){
                return Object.keys(filters[key]).map(field => element[key][field] === filters[key][field]).includes(false) ? false : true
            }else{
                return element[key] === filters[key]
            }
        });
        return result;
    }
}

module.exports = {
    filterClosure
}
