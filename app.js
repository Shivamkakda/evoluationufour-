const express = require("express");
const mongoose = require('mongoose');

const app = express()

app.use(express.json());

const connect =() =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri")
}

const companySchema = new mongoose.Schema({
    company_name :{type : String , required : true},
    number_jobs : { type: Number , required : true}
},{
    versionKey : false,
    timetamps : true
});

const company = mongoose.model("company",companySchema)

const jobShema = new mongoose.Schema({
    title : {type: String , required : true},
    location :{type: String , required : true},
    skill : {type: String , required : true},
    type :{type: String , required : true},
    join : {type: String , required : true},
    rateings : {type: Number , required : true},
    company_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "company",
        required : true
    }
},{
    versionKey : false,
    timetamps:true
})

const job = mongoose.model("job",companySchema);
//

app.post ("/naukri", async (req,res) =>{
    const newdata = await company.create(req.body);
    return res.status(201).send(newdata);
});

app.post ("/naukri", async (req,res) =>{
    const newdata = await job.create(req.body);
    return res.status(201).send(newdata);
});


app.listen(2313, async() =>{
    await connect();
    console.log("start")
})