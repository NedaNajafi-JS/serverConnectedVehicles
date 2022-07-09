const filterClosure = (filters) => {

    return function (element) {
        for (key in filters) {
            if ((element[key] || null) !== filters[key])
                return false;
        }

        return true;
    }
}

module.exports = {
    filterClosure
}