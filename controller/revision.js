var revision = require("../models/revision.js");


function revisions() {


    this.getRevisions = msg => {
        return new Promise(function (resolve, reject) {
            revision.find({matiere: msg}, (err, revision) => {
                if (err) reject(err);
                else resolve(revision);
            });
        });
    };
}
module.exports = revisions;
