'use strict';

exports.yell = function(msg) {
    return msg.toUpperCase();
};

exports.printObject = function(context, options) {
    var ret = "PrintObjectFn:" + context.length;
    if (context.length) {
        for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + "<pre>" + JSON.stringify(context[i], null, 2) + "</pre>";
        }
    } else {
        ret = "<pre>" + JSON.stringify(context, null, 2) + "</pre>";
    }
    return ret;
};

exports.getIt = function(obj, index, term) {
    console.log('getIt: ' + JSON.stringify(obj[index], null, 2));
    var ret = obj[index][term];


    return ret;
}

String.prototype.toProperCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}