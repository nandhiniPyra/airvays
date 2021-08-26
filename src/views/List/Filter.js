import _ from 'lodash';
function filterdata(filtersData, request) {
    var range = {
        max: 55138.0,
        min: 30062.0,
    };

    var result = filtersData;

    let response = [];
    request.carrier.map((code) => {
        response.push(
            ..._.filter(result, {
                // eslint-disable-next-line no-dupe-keys
                itineraries: [{ segments: [{ carrierCode: code.carrierCode }] }],
            }))

    })
    result = result.filter(function (o) {
        return o.price.total <= range.max && o.price.total >= range.min;
    });
    return response;
}
export default filterdata;