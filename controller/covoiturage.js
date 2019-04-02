var Covoiturage = require("../models/covoiturage.js");


function covoiturages() {


    this.getCovoiturage = msg => {
        return new Promise(function (resolve, reject) {
            Specialite.findOne({depart: msg}, (err, covoiturage) => {
                if (err) reject(err);
                else resolve(covoiturage);
            });
        });
    };
}
module.exports = covoiturages;
