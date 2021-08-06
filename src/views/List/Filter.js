import _ from 'lodash';
function filterdata(filtersData) {
    var range = {
        max: 55138.0,
        min: 30062.0,
    };

    var result = filtersData;
    result = _.filter(result, {
        // eslint-disable-next-line no-dupe-keys
        itineraries: [{ segments: [{ carrierCode: 'AI', carrierCode: 'UK' }] }],
    });
    result = result.filter(function (o) {
        return o.price.total <= range.max && o.price.total >= range.min;
    });
    return result;
}
export default filterdata;