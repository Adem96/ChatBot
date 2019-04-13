var Faq = require("../models/faq.js");
var subject = require("../models/subject")
var Calendar = require("../models/AnnualCalendar")



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

    this.getAllNotes = () =>{
        return new Promise(function(resolve,reject){
            subject.find((err,subs)=>{
                if(err) reject(err)
                else resolve(subs)
            })
        })
    }

    this.getCalendar = () =>{
        return new Promise(function(resolve,reject){
            Calendar.find((err,cal)=>{
                if(err) reject(err)
                else resolve(cal)
            })
        })
    }




}
module.exports = faqs;
