(function() {
    'use strict';
    exports.randomInt = function(min, max) {
        return Math.floor((Math.random() * max) + min);
    };

    exports.renderError = function(err, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    };
}());