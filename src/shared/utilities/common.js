/**
 * 
 * A module including the functions that are used in different services
 * The main goal of implementing this module, was to adhere the principles of the functional programming:
 *  - Having independant functions that join together to produce final result
 *  - Functions that can be tested independantly.
 *  - Reusable functions
 *  - Functions withut any side effects
 *  - Single responsibility principle
 */


 //A higher order function, through which, an array of objects can be filtered by any fields in the objects
const filterFunction = (filters) => {

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
    filterFunction
}
