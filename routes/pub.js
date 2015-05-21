var express = require('express');
var router = express.Router();
var NounProject = require('the-noun-project');
var Moniker = require('moniker');
var Utils = require('../lib/utils');
var HTTP = require("q-io/http");


var ICONS_COUNT = 2;
var nounProject = new NounProject({
    key: '994336390f554f37a9864e1a3c8c150b',
    secret: '1419090eafed449abd79bda474cfca79'
});

/* pub page */
router.get('/', function(req, res) {
    var colors = generateColorPalette();
    res.render('pub', {
        helpers: {
            randomColor: function() {
                return "#" + colors[Utils.randomInt(0, colors.length)];
            }

        }
    });
});

router.get('/getLogo', function(req, res) {
    console.log('getLogo');
    var nounGen = Moniker.generator([Moniker.noun]);
    var noun1 = nounGen.choose().toProperCase();
    var noun2 = nounGen.choose().toProperCase();
    var iconCount = ICONS_COUNT;
    if (req.query.count) {
        iconCount = req.query.count;
    }
    if (req.query.noun1) {
        noun1 = req.query.noun1;
    }
    if (req.query.noun2) {
        noun2 = req.query.noun2;
    }


    nounProject.getIconsByTerm(noun1, {
        limit: iconCount
    }, function(err1, data1) {
        if (err1) {
            Utils.renderError(err1, res);
            console.log('error at level 1');
            Utils.renderError(err1, res);
        } else {
            nounProject.getIconsByTerm(noun2, {
                limit: iconCount
            }, function(err2, data2) {
                if (err2) {
                    console.log('error at level 2');
                    Utils.renderError(err2, res);
                } else {
                    console.log('getLogo success');
                    var colors = generateColorPalette();
                    res.send({
                        noun1: noun1,
                        noun2: noun2,
                        icons1: data1.icons,
                        icons2: data2.icons,
                        colors: colors,
                        swap: false
                    });
                }
            });
        }
    });

});


function generateColorPalette() {
    var ColorScheme = require('color-scheme');
    var Utils = require('../lib/utils');

    var scheme = new ColorScheme();
    var randomHue = Utils.randomInt(0, 360);

    scheme.from_hue(randomHue)
    .scheme('contrast')
    .variation('pastel');
    return scheme.colors();
}

module.exports = router;