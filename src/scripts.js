const ObjectsToCsv = require('objects-to-csv');
const mongoose = require("mongoose");
require("dotenv").config();
const eventRegistration = require('./models/eventRegistration');
const workshopRegistration = require('./models/workshopRegistration');
const Payment = require("./models/payment");
const speakerRegistration = require('./models/speakerRegistration');
const notify = require('./models/notify');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Events CSV Files
const getEventsList = async ()=>{
    // const data = await eventRegistration.find();
    // const data = await speakerRegistration.find({speaker : 'Bhaskar Majumdar'});
    const data = await notify.find();
    let newData = [];
    // data.forEach(doc=>{
    //     if(doc.events.includes('Business Quiz')){
    //         newData.push({
    //             "Name" : doc.leaderName,
    //             "Email" : doc.leaderEmail,
    //             "Phone" : doc.leaderPhone,
    //             "Address" : doc.leaderAddress,
    //             "Team Member 1" : (doc.teamMembers[0] ? doc.teamMembers[0] : ' '),
    //             "Team Member 2" : (doc.teamMembers[1] ? doc.teamMembers[1] : ' '),
    //             "Team Member 3" : (doc.teamMembers[2] ? doc.teamMembers[2] : ' '),
    //             "Team Member 4" : (doc.teamMembers[3] ? doc.teamMembers[3] : ' '),
    //         });
    //     }
    // })
    // let populatedData;
    // for(let doc of data){
    //     populatedData = await doc.populate('paymentId').execPopulate();
    //     if(populatedData.paymentId && populatedData.paymentId.data.status === 'created')
    //         continue;
    //     if(populatedData.workshops.includes('Cyber Security')){
    //                 newData.push({
    //                     Name : populatedData.name,
    //                     Email : populatedData.email,
    //                     Phone : populatedData.phone,
    //                     College : populatedData.college,
    //                     "Graduation Year" : populatedData.graduationYear,
    //                     Amount : populatedData.amount,
    //                 })
    //             }
    // }
    // data.forEach(doc=>{
    //     newData.push({
    //         Name : doc.name,
    //         Email : doc.email,
    //         Phone : doc.phone
    //     })
    // })
    data.forEach(doc=>{
        newData.push({
            Email : doc.email
        })
    })
    // console.log(populatedData);
    // quizData.forEach(doc=>{
    //     newData.push({
    //         "Name" : doc.name,
    //         "Email": doc.email,
    //         "Phone" : doc.phone,
    //         "Address" : doc.address
    //     })
    // })
    new ObjectsToCsv(newData).toDisk('./notify.csv');
    console.log(newData.length);
}

getEventsList();