var pfe = require("../models/stagePFE.js");


function pfes() {


    this.getPFE = msg => {
        return new Promise(function (resolve, reject) {
            pfe.find({Skills: msg}, (err, pfee) => {
                if (err) reject(err);
                else resolve(pfee);
            });
        });
    };
}
module.exports = pfes;
