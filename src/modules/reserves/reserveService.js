const { reserveDAL } = require('./reserveDAL');
const agencyService = require('./../agencies/agencyService');
const { filterFunction } = require('./../../shared/utilities/common');

async function reserveExistance({ year, month, day, timeSection }) {
    const numberOfExistingReserves = await reserveDAL['FIND_BY_DATE'](year, month, day, timeSection);
    return numberOfExistingReserves.length > 9 ? true : false
}

async function reserve(newReserve, user) {
    const reserveExistanceResult = await reserveExistance(newReserve.reservedDate);
    newReserve.profilePhone = user.phone;
    newReserve.doReserveDate = new Date();
    return reserveExistanceResult === true ? (() => { throw 'Bad request' })() : (reserveDAL['INSERT'] ? reserveDAL['INSERT'](newReserve) : {});
}

/**
 * 
 * @param {Array} distributedData an array of objects tha in needed to be categorized based on key1, key2
 * @param {any} key1 
 * @param {any} key2 
 */
async function groupingBasedOnTwoKeys(distributedData, key1, key2) {
    let groupedAgencies = [];
    await Promise.all(distributedData.map(distributedObject => {
        if (key1 === 'date') {
            distributedObject[[key1]] = [[distributedObject.year], [distributedObject.month], [distributedObject.day]].join("");
        }

        let groupedAgency = groupedAgencies.find(groupedAgency_ => groupedAgency_[[key1]] === distributedObject[[key1]])
            || (() => {
                let obj = {
                    [key1]: distributedObject[[key1]],
                    [key2]: []
                }

                groupedAgencies.push(obj);
                return obj;
            })();
        groupedAgency[[key2]].push(distributedObject[[key2]]);
    }));

    return groupedAgencies;
}

const groupByAgencyUniqueId = async (distributedAgencies) => {
    let groupedAgencies = await groupingBasedOnTwoKeys(distributedAgencies, 'agencyUniqueId', 'reservedDate');
    await Promise.all(groupedAgencies.map(async (groupedAgency) => {
        groupedAgency['reservedDate'] = await groupingBasedOnTwoKeys(groupedAgency['reservedDate'], 'date', 'timeSection');
    }));
    return groupedAgencies;
}

//returns 3 nearest agencies which have free timespans in the provided date
async function freeTimesGet({ year, month, day, lat, lon }) {

    const distributedAgencies = await reserveDAL['GET_ALL_BY_DATE'](year, month, day);
    let groupedAgencies = await groupByAgencyUniqueId(distributedAgencies);

    let agencies = await agencyService.getAll();
    Promise.all(agencies.map(async (agency) => {
        agency['workHours'] = agency['workHours'] || [8, 9, 10, 11, 12, 13, 14, 15, 16];
        let groupedAgency = groupedAgencies.find(ag => ag.agencyUniqueId === agency.uniqueId);
        if (groupedAgency) {
            await Promise.all(groupedAgency['reservedDate'].map(reservedDate => {
                const findIndex = value => agency['workHours'].indexOf(value);
                const removeHour = timeSection => agency['workHours'].splice(findIndex(timeSection), 1);
                reservedDate['timeSection'].map(removeHour);
            }));
        }

    }));
    const coordinates = [{ lat, lon }, ...(agencies.map(agency => agency.address.coordinate))]

    let destinations = await agencyService.getRoutingData(coordinates);
    destinations = destinations.map(destination => { return { distance: destination.distance, agency: null } })

    for (let i = 1; i < destinations.length; i++) {
        destinations[i].agency = agencies[i - 1]
    }

    const sortedDestinations = destinations
        .splice(1, destinations.length - 1)
        .sort((destination1, destination2) => destination1.distance - destination2.distance);
    return sortedDestinations;

}

//The user has selected his considered agency from the map
async function freeTimesGetByAgencyId({ agencyUniqueId, year, month, day }) {
    const agencyAllReservesByDate = await reserveDAL['GET_ALL_BY_DATE_AGENCY'](agencyUniqueId, year, month, day);
    const agency = await agencyService.getByUniqueId(agencyUniqueId);
    agency['workHours'] = agency['workHours'] || [8, 9, 10, 11, 12, 13, 14, 15, 16];
    const findIndex = value => agency['workHours'].indexOf(value);
    const removeHour = timeSection => agency['workHours'].splice(findIndex(timeSection), 1);
    await Promise.all(agencyAllReservesByDate.map(reserved => removeHour(reserved.reservedDate.timeSection)));
    return agency;
}


//Reserve history, given a user's phone number
async function getUserReserves({ userPhone, filters }) {
    const userReserves = reserveDAL['FIND_BY_PHONE'] ? (await reserveDAL['FIND_BY_PHONE'](userPhone)) : null;
    const customizedFilter = filterFunction(filters);
    return userReserves.filter(customizedFilter);
}

module.exports = {
    reserve,
    freeTimesGet,
    freeTimesGetByAgencyId,
    getUserReserves
}
