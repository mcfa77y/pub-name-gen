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
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    exports.ensureAuthenticated = function(req, res, next) {
        console.log('UTILs ensureAuthenticated');

        console.log('req: ' + req + ' ' + req.isAuthenticated());
        console.log('res: ' + res);

        console.log('next: ' + JSON.stringifyOnce(next, null, 2));

        if (req.isAuthenticated()) {
            console.log('authenticated');
            next();
        } else {
            console.log('NOT authenticated');
            res.redirect('/login');
        }
    };



    JSON.stringifyOnce = function(obj, replacer, indent) {
        var printedObjects = [];
        var printedObjectKeys = [];

        function printOnceReplacer(key, value) {
            if (printedObjects.length > 2000) { // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
                return 'object too long';
        }
        var printedObjIndex = false;
        printedObjects.forEach(function(obj, index) {
            if (obj === value) {
                printedObjIndex = index;
            }
        });

            if (key === '') { //root element
                printedObjects.push(obj);
                printedObjectKeys.push("root");
                return value;
            } else if (printedObjIndex + "" != "false" && typeof(value) == "object") {
                if (printedObjectKeys[printedObjIndex] == "root") {
                    return "(pointer to root)";
                } else {
                    return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase() : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
                }
            } else {

                var qualifiedKey = key || "(empty key)";
                printedObjects.push(value);
                printedObjectKeys.push(qualifiedKey);
                if (replacer) {
                    return replacer(key, value);
                } else {
                    return value;
                }
            }
        }
        return JSON.stringify(obj, printOnceReplacer, indent);
    };
}());