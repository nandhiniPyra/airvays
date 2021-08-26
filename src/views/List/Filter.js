import _ from 'lodash';
function filterdata(filtersData, request) {
    var range = {
        max: 55138.0,
        min: 30062.0,
    };

    var result = filtersData;
    let carriercode = {}
    var response = []
    console.log(carriercode, "carriercode")
   response = request.map((code) => {
       return _.filter(result, {
            // eslint-disable-next-line no-dupe-keys
            itineraries: [{ segments: [{ carrierCode: code.carrierCode }] }],
        })
    })
    console.log(response, '(((((((((((((((((((((((')
    // result = result.filter(function (o) {
    //     return o.price.total <= range.max && o.price.total >= range.min;
    // });
    return result;
}
export default filterdata;