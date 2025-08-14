const URL = require('../models/url');
const shortid = require("shortid");

async function handleGenerateNewShortURL(req,res) {

    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});

    const shortID = shortid();
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,

    });
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.redirect('/');
}


async function handleGetAnalytics(req,res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID, createdBy: req.user._id});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}