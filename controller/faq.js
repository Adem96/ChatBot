var Faq = require("../models/faq.js");

function faqs() {


    this.getFaq = msg => {
        return new Promise(function(resolve, reject) {
            Faq.findOne({ titre: msg }, (err, faq) => {
                if (err) reject(err);
                else resolve(faq);
            });
        });
    };
    this.getAllFaq = () =>{
        return new Promise(function(resolve,reject){
            Faq.find((err,faqs)=>{
                if(err) reject(err)
                else resolve(faqs)
            })
        })
    }

}
module.exports = faqs;
