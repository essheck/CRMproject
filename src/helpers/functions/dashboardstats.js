module.exports = function (customerlist){
    let count = 0 , sales = 0 , est = 0 , salescount = 0 , prospectscount = 0;
    for(i=0 ; i<customerlist.length ; i++){
        if(customerlist[i].sales){
            sales += customerlist[i].sales;
            salescount++;
        } else if(customerlist[i].estimatedsales) {
            est += customerlist[i].estimatedsales;
            prospectscount++;
        } else {

        }
        count++;
    }
    let commission = 0.012*sales;
    return {count: count , sales: sales , est: est ,
            salescnt : salescount , prospectcnt: prospectscount , commission: commission ,
            totalleads: customerlist.length }
}