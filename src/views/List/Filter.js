import _ from 'lodash';
function filterdata(filtersData, request) {
    if (request.range) {
        var range = request.range
    }

    var result = filtersData;
    let response = [];
    if (request.carrier) {
        request.carrier.map((code, i) => {

            return response.push(
                ..._.filter(result, {
                    // eslint-disable-next-line no-dupe-keys
                    itineraries: [{ segments: [{ carrierCode: code.carrierCode }] }],
                }))

        })
    }

    if (request.range) {
        response = response.length > 0 ?
            response.filter(function (o) {
                return o.price.base <= range.max && o.price.base >= range.min;
            }) : result.filter(function (o) {
                return o.price.base <= range.max && o.price.base >= range.min;
            })
    }

    if (request.Oneway) {
        response = result.filter(function (o) {
            return o.onewaytime <= request.Oneway && o.onewaytime >= 0;
        })
    }
    if (request.stops) {
        response = result.filter(function (o) {
            return o.itineraries[0].segments.length - 1 === request.stops
        })
    }

    return _.uniqBy(response, 'id');
    ;
}
export default filterdata;