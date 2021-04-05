const router = require("express").Router();
const WorkshopRegistration = require("../models/workshopRegistration");
const Payment = require("../models/payment");
const EventRegistration = require("../models/eventRegistration");
const SpeakerRegistration = require("../models/speakerRegistration");
const { speakers } = require('../utils/speakers');
const BusinessQuizRegistration = require("../models/businessQuizRegistration");

router.get('/event-registration-list',async(req,res)=>{
    const applicants = await EventRegistration.find();
    res.render('event-registration-list',{
        applicants
    });
})

router.get('/speaker-registration-list',async(req,res)=>{
    let speaker = req.query.speaker;
    const applicants = await SpeakerRegistration.find({speaker : speakers[speaker]});
    res.render('quiz-registration-list',{
        applicants,
        speaker : speakers[speaker]
    })
})

router.get('/business-quiz-registration-list',async(req,res)=>{
    const applicants = await BusinessQuizRegistration.find();
    res.render('speaker-registration-list',{
        applicants
    })
})



router.get('/workshop-registration-list',async(req,res)=>{
    let applicantsData = []
    let applicants = await WorkshopRegistration.find()
    for(let applicant of applicants){
        let populatedData = await applicant.populate('paymentId').execPopulate()
        let paymentId="----", status="----";
        if(populatedData.paymentId){
            paymentId = populatedData.paymentId.data.paymentId
            status = populatedData.paymentId.data.status
        }
        if(populatedData.paymentId && populatedData.paymentId.data.status == 'created')
            continue;
        let data = new Object({
            name: applicant.name,
            email:applicant.email,
            phone:applicant.phone,
            college:applicant.college,
            graduationYear: applicant.graduationYear,
            workshops: applicant.workshops,
            amount : applicant.amount,
            paymentId,
            status
        })
        applicantsData.push(data)
    }
    // console.log(applicantsData);
    res.render('workshop-registration-list',{
        applicants : applicantsData
    });
})

module.exports = router;