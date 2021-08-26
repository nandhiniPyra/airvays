import _ from 'lodash';
function filterdata(filtersData, request) {
    if(request.range){
        var range = request.range
    }
   
    var result = filtersData;
    let response = [];
    if(request.carrier){
        request.carrier.map((code) => {
            response.push(
                ..._.filter(result, {
                    // eslint-disable-next-line no-dupe-keys
                    itineraries: [{ segments: [{ carrierCode: code.carrierCode }] }],
                }))
    
        })
    }

    if(request.range){
        response =        response.length>0?
        response.filter(function (o) {
            return o.price.base <= range.max && o.price.base >= range.min;
        }):  result.filter(function (o) {
            return o.price.base <= range.max && o.price.base >= range.min;
        })
    }  

 
    return response;
}
export default filterdata;