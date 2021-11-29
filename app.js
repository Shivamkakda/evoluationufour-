const express = require("express");
const mongoose = require('mongoose');

const app = express()

app.use(express.json());

const connect =() =>{
    return mongoose.connect("mongodb://localhost:27017/naukri")
}

const companySchema = new mongoose.Schema({
    company_name :{type : String , required : true},
    number_jobs : { type: Number , required : true}
},{
    versionKey : false,
    timestamps : true
});

const company = mongoose.model("company",companySchema)

const jobShema = new mongoose.Schema({
    title : {type: String , required : true},
    location :{type: String , required : true},
    skills : {type: String , required : true},
    type :{type: String , required : true},
    join : {type: String , required : true},
    ratings : {type: Number , required : true},
    company_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "company",
        required : true
    }
},{
    versionKey : false,
    timestamps:true
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


app.get("/job/: skills", async(req, res) =>{
    const NewDa = await job.findById(req.params.skills).lean().exec()
    return res.send({NewDa});
})


app.get("/job/: join", async(req, res) =>{
    const NewDa = await job.findById(req.params.join,{$eq :2}).lean().exec()
    return res.send({NewDa});
})



app.get("/job/: type", async(req, res) =>{
    const NewDa = await job.findById(req.params.type).lean().exec()
    return res.send({NewDa});
})


app.get("/job/: ratings", async(req, res) =>{

    let sorts = req.params.ratings
    const NewData = await job.find().sort({sorts : 1}).lean().exec()
    return res.send({NewData});
})


app.get("/company", async(req, res) =>{
    const NewDa = await job.find().lean().exec()
    return res.send({NewDa});
});


app.get("/company/: number_jobs", async(req, res) =>{

    let out = req.params.number_jobs;
    const NewDa = await job.find().sort({out : -1}).lean().exec()
    let arr = NewDa[0]
    return res.send(arr);
})


app.listen(2313, async() =>{
    await connect();
    console.log("start")
})