/**
 * use express module
 * require contact schema
 * require email page
 */
const responseModel = require('./responseModel');
const ticketModel = require('./ticketModel');
const express = require('express');
const router = express();
//const { validate } = require('./../../shared/middlewares/validation');
//const { validationResult } = require('express-validator');
// const validateComplaintInput = require("../../validation/complaint");
 //const validateComplaintResponseInput = require('../../validation/complaint_response');
 //const userAdmin = require('../../models/userAdmin');
 //const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require("passport");
 
 /**
  * Save complaint form information
  */
router.post('/insert',async (req,res)=>{
    /* const {
         errors,
         isValid
     } = validateComplaintInput(req.body);
     if (!isValid) {
         // Return any errors with 400 status
         return res.status(400).json(errors);
     }*/
     //const aaa = validate('ticket');
     //console.log(aaa.length)
    // validate('ticket');
    /* (() => {

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json(new ParameterError(errors));
        }
    })();*/

    let ticketNumber = Math.floor(100000 + Math.random() * 900000);
    const info = {};
    info.ticketNumber = ticketNumber;
    info.group = req.body.group;
    info.ticketTitle = req.body.ticketTitle; 
    info.Priority = req.body.Priority;
    //info.updateDate = Date.now(); //req.body.updateDate;
    info.type = req.body.type;
    info.creator = req.body.creator;
    info.description = req.body.description;
    info.user_id = req.body.user_id;

    new ticketModel(info).save()
    .then(user => { 
        return res.status(200).json({result: user});
        //res.status(200).json({result: "ذخیره با موفقیت انجام شد", resultEN: "Success"})
    })
    .catch(err => res.json(err));
})

 
 /**
  * get complaint information
  */
router.post('/get'/*, passport.authenticate("jwt", {
     session: false
    })*/,async (req,res)=>{
    let tickets = await ticketModel.find({
        type : req.body.type
    })
    .sort({_id:-1})
    .lean()
    .exec();
    if (tickets){
 
         let page=req.body.page;
         let limit=req.body.limit;
         let starteIndex=(page-1)*limit;
         let endIndex=page*limit;
         let length = tickets.length;
         if(page!=0) {
             
            tickets = tickets.slice(starteIndex,endIndex);
         }
         let Unread = await ticketModel.find({
            type : req.body.type,
             unread:true
         })
         .exec();
         return res.status(200).json({result: tickets,total: length,unread:Unread.length});
        /* Promise.all(tickets.map(async(comp) => {
                 
             const Response = await responseModel.find({
                ticket_id: comp._id
             })
             .lean()
             .exec();
             if(Response.length!=0) {
                 comp.response = Response;
             }
             else {
                 comp.response=[];
             }
         }))
         .then(async() => {
             let Unread = await ticketModel.find({
                type : req.body.type,
                 unread:true
             })
             .exec();
             return res.status(200).json({result: tickets,total: length,unread:Unread.length});
        });*/
    }
 });
 
router.post('/Response'/*, passport.authenticate("jwt", {
        session: false
    })*/,async (req,res)=>{
    /* const {
         errors,
         isValid
     } = validateComplaintResponseInput(req.body);
     if (!isValid) {
         // Return any errors with 400 status
         return res.status(400).json(errors);
     }*/
 
    const info = {};
    info.ticketNumber = req.body.ticketNumber;
    info.description = req.body.description;
    info.ticket_id = req.body.ticket_id;
    info.creator = req.body.creator;

    if(req.body.id!=undefined && req.body.id!=0) {
        responseModel.findOneAndUpdate({
             _id: req.body.id
         }, {
             $set: {
                ticketNumber : req.body.ticketNumber,
                 description : req.body.description,
                 ticket_id : req.body.ticket_id,
                 creator : req.body.creator
             }
         }, {    
         new: true
         })
         .then(async (Response) =>{
             let tickets = await ticketModel.find()
             .sort({_id:-1})
             .lean()
             .exec();
             if (tickets){
 
                 let page=req.body.page;
                 let limit=req.body.limit;
                 let starteIndex=(page-1)*limit;
                 let endIndex=page*limit;
                 let length = tickets.length;
                 if(page!=undefined && page!=0) {
                     
                    tickets = tickets.slice(starteIndex,endIndex);
                 }
                 Promise.all(tickets.map(async(comp) => {
                         
                     const Response = await responseModel.find({
                        ticket_id: comp._id
                     })
                     .lean()
                     .exec();
                     if(Response.length!=0) {
                         comp.response = Response;
                     }
                     else {
                         comp.response=[];
                     }
                 }))
                 .then(async() => {
                     let Unread = await ticketModel.find({
                         unread:true
                     })
                     .exec();
                     return res.status(200).json({result: tickets,total: length,unread:Unread.length});
                 });
             }
         })
         .catch(err => console.log(err));
    }
    else {
        new responseModel(info).save()
        .then( async (user) => { 
            let tickets = await ticketModel.findOneAndUpdate({
                _id: req.body.ticket_id
            }, {
                    responsed:true,
                    unread:false,
                    updateDate: Date.now()
                
            }, {
                new: true
            })
            .lean()
            .exec();
            if(tickets) {
                let Ticket = await ticketModel.findOne({
                    _id : req.body.ticket_id
                })
                .sort({_id:-1})
                .lean()
                .exec();
                let obj_ticket={};
                let obj={};
                if (Ticket){
                     obj.type=Ticket.type;
                     obj.status=Ticket.status;
                     obj.ticketNumber=Ticket.ticketNumber;
                     obj.createDate=Ticket.createDate;
                     obj.ticketTitle=Ticket.ticketTitle;
                     obj.group=Ticket.group;
                     obj.priority=Ticket.priority;
                     obj.updateDate=Ticket.updateDate;
                     obj.unread=Ticket.unread;
                     obj.responsed=Ticket.responsed;
                     obj.user_id=Ticket.user_id;
                    
                     obj_ticket.ticket_id=Ticket._id;
                     obj_ticket.ticketNumber=Ticket.ticketNumber;
                     obj_ticket.createDate=Ticket.createDate;
                     obj_ticket.description=Ticket.description;
                     obj_ticket.creator=Ticket.creator;
             
                     let Conversation=[];
                     Conversation.push(obj_ticket);
                     const Response = await responseModel.find({
                         ticket_id: Ticket._id
                     })
                     .lean()
                     .exec();
                     Promise.all(Response.map(async(comp) => {
                         Conversation.push(comp)
                     }))
                     .then(async() => {
                         obj.conversation=Conversation;
                         return res.status(200).json({result: obj});
                     });
                }
            }
        })
        .catch(err => res.json(err));
    } 
 });
 
  /**
  * get complaint information
  */
router.post('/getOne'/*, passport.authenticate("jwt", {
    session: false
   })*/,async (req,res)=>{
   let tickets = await ticketModel.findOne({
       _id : req.body.id
   })
   .sort({_id:-1})
   .lean()
   .exec();
   let obj_ticket={};
   let obj={};
   if (tickets){
        obj.type=tickets.type;
        obj.status=tickets.status;
        obj.ticketNumber=tickets.ticketNumber;
        obj.ticket_id=tickets._id;
        obj.createDate=tickets.createDate;
        obj.ticketTitle=tickets.ticketTitle;
        obj.group=tickets.group;
        obj.priority=tickets.priority;
        obj.updateDate=tickets.updateDate;
        obj.unread=tickets.unread;
        obj.responsed=tickets.responsed;
        obj.user_id=tickets.user_id;
       
        obj_ticket.ticket_id=tickets._id;
        obj_ticket.ticketNumber=tickets.ticketNumber;
        obj_ticket.createDate=tickets.createDate;
        obj_ticket.description=tickets.description;
        obj_ticket.creator=tickets.creator;

        let Conversation=[];
        Conversation.push(obj_ticket);
        const Response = await responseModel.find({
            ticket_id: tickets._id
        })
        .lean()
        .exec();
        Promise.all(Response.map(async(comp) => {
            Conversation.push(comp)
        }))
        .then(async() => {
            obj.conversation=Conversation;
            return res.status(200).json({result: obj});
        });
            /*if(Response.length!=0) {
                tickets.conversation = Response;
            }
            else {
                tickets.conversation=[];
            }*/
       /* }))
        .then(async() => {*/
            
       //});
   }
});
router.post('/read', async(req, res) => {
 
    await ticketModel
    .findOneAndUpdate(
        {
            _id: req.body.id
        },
        {
            unread:false
        }, 
        {
            new: true
        }
    )
    .exec();
 
    let resp = await ticketModel.find({})
    .sort({_id:-1})
    .lean()
    .exec();
 
    if (resp) {
        let page=req.body.page;
        let limit=req.body.limit;
        let starteIndex=(page-1)*limit;
        let endIndex=page*limit;
        let length = resp.length;
        if(page!=undefined && page!=0) {
            
            resp = resp.slice(starteIndex,endIndex);
        }
        Promise.all(resp.map(async(comp) => {
                 
            const Response = await responseModel.find({
            ticket_id: comp._id
            })
            .lean()
            .exec();
            if(Response.length!=0) {
                comp.response = Response;
            }
            else {
                comp.response=[];
            }
        }))
        .then(async() => {
            let Unread = await ticketModel.find({
                unread:true
            })
            .exec();
            return res.status(200).json({result: resp,total: length,unread:Unread.length});
        });
    };
});

module.exports = router;
 