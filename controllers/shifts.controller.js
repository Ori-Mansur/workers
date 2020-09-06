

const shiftsService = require('../services/workers.service')

module.exports = {
    query,
    insert,
    updateOne,
    removeOne
}


async function query(req, res) {
    const filterBy = {
        userId: req.headers.auth,
        ...req.query
    }
    logger.info('run query transaction '+ JSON.stringify(req.headers.auth))
    try {
        const shifts = await shiftsService.query(filterBy)
        res.status(200).send(shifts)
    } catch (err) {
        logger.error('ERROR: cannot find shifts ' + err)
        res.status(500).send(err);
    }
}

async function insert(req, res) {
    const shift = req.body
    logger.info('run insert transaction')
    try {
        const insertedshift = await shiftsService.insert(shift)
        res.status(200).send(insertedshift)
    } catch (error) {
        logger.error('error in insert shift', error);
        res.status(500).send(error);
    }
}

async function updateOne(req, res) {
    const transaction =req.body
    try {
        const updated = await shiftsService.updateOne(transaction)
        res.status(200).send(updated)
    } catch (err) {
        logger.error('ERROR: cannot update Transaction ' + err)
        res.status(500).send(err);
    }
    
}

async function removeOne(req , res) {
    try {
        const removed = await shiftsService.removeOne()
        res.status(200).send(removed)
    } catch (error) {
        logger.error('ERROR: cannot remove Transaction ' + err)
        res.status(500).send(err);
    }
    
}