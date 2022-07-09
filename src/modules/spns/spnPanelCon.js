const mongoose = require('mongoose');
const spnModel = require('./spn');
const { validationResult } = require('express-validator');
const path = require('path');


exports.indexSpn = (req, res, next) => {
    res.sendFile(path.dirname(require.main.filename) + '/src/modules/spns/statics/indexSpn.html');
}

exports.createPanel = (req, res, next) => {
    // let url = ''
    // if(req.params.id){
    //     url = `/statics/createSpn.html?${req.params.id}`
    // }else{
    //     url = '/statics/createSpn.html';
    // }
    res.sendFile(path.dirname(require.main.filename) + '/src/modules/spns/statics/createSpn.html');
}

exports.fillData = async (req, res, next) => {

    let page = req.body.page || 0;
    let limit = req.body.limit || 10;
    let starteIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let data = await spnModel.find();

    //data = data.slice(starteIndex, endIndex);

    return res.status(200).json(data);
}

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({
                status: 'fail',
                message: 'خطای سرور',
                messageEN: 'Server error',
                err: errors
            });

        }

        let data = req.body;

        // if(req.body.id){

        // }else{
        //await spnModel.create(data);
        if (req.body.id) {
            await spnModel
                .findOneAndUpdate({
                    _id: req.body.id
                }, {
                    EV: data.EV,
                    spn: data.spn,
                    source: data.source,
                    topic: data.topic,
                    name: data.name,
                    description: data.description,
                    dimenssion: data.dimenssion,
                    json_key: data.json_key
                }, {
                    new: true,
                    upsert: true
                })
                .exec();
        } else {
            await spnModel.create(data);
        }


        // await Promise.all(req.body.EV.map(async (ev_) => {

        //     let data = req.body;
        //     data.EV = ev_;
        //     await spnModel.create(data);
        // }));
        //}



        const all_spns = await spnModel.find();

        return res.status(200).json({
            status: 'Success',
            data: {
                spns: all_spns
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 'fail',
            message: 'خطای سرور',
            messageEN: 'Server error'
        })
    }
}

exports.delete = async (req, res, next) => {

    await spnModel
        .findOneAndDelete({
            _id: req.params.id
        })
        .exec();

    return res.status(200).send();
}

exports.get = async (req, res, next) => {

    const spn = await spnModel
        .findOne({
            _id: req.params.id
        })
        .exec();

    return res.status(200).json({ data: spn });
}

const asyncFnSeries = async (fns = []) => {
    let result = Promise.resolve();
    // for(fn of fns){
    //     result = await fn(result);
    //     console.log(result);
    // }

    // result = null;
    fns.map(async (fn) => {
        result = result.then(r => fn(r))
        console.log(result)
    });

    return result;
}

// asyncFnSeries([
//     async () => 1,
//     async (n) => n + 1,
//     async (char) => char + 'neda'
// ]);