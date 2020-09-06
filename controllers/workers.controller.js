

const workersService = require('../services/workers.service')

module.exports = {
    query,
    insertMany,
    updateOne,
    removeOne,
    getAmountPerMonth,
    getAmountPerCategory
}


async function query(req, res) {
    const filterBy = {
        userId: req.headers.auth,
        ...req.query
    }
    logger.info('run query transaction '+ JSON.stringify(req.headers.auth))
    try {
        const transactions = await workersService.query(filterBy)
        res.status(200).send(transactions)
    } catch (err) {
        logger.error('ERROR: cannot find Transactions ' + err)
        res.status(500).send(err);
    }
}
async function getAmountPerMonth(req, res){
    const filterBy = {
        userId: req.headers.auth,
        ...req.query
    }
    logger.info('run PerMonth '+ JSON.stringify(req.headers.auth))
    try {
        
        const amountMonth = await workersService.getAmountPerMonth(filterBy)
        logger.info('run PerMonth '+ JSON.stringify(amountMonth))
        res.status(200).send(amountMonth)
    } catch (err) {
        logger.error('ERROR: cannot find Transactions ' + err)
        res.status(500).send(err);
    }

}
async function getAmountPerCategory(req, res){
    const filterBy = {
        userId: req.headers.auth,
        ...req.query
    }
    logger.info('run PerCategory '+ JSON.stringify(req.headers.auth))
    try {
        
        const amountMonth = await workersService.getAmountPerCategory(filterBy)
        logger.info('run PerCategory '+ JSON.stringify(amountMonth))
        res.status(200).send(amountMonth)
    } catch (err) {
        logger.error('ERROR: cannot find Transactions ' + err)
        res.status(500).send(err);
    }

}

async function insertMany(req, res) {
    const transactions = req.body
    logger.info('run insertMany transaction')
    try {
        const insertedTransactions = await workersService.insertMany(transactions)
        res.status(200).send({ msg: `insert ${insertedTransactions.length} transactions` })
    } catch (error) {
        logger.error('error in insertMany transactions', error);
        res.status(500).send(error);
    }
}

async function updateOne(req, res) {
    const transaction =req.body
    try {
        const updated = await workersService.updateOne(transaction)
        res.status(200).send(updated)
    } catch (err) {
        logger.error('ERROR: cannot update Transaction ' + err)
        res.status(500).send(err);
    }
    
}

async function removeOne(req , res) {
    try {
        const removed = await workersService.removeOne()
        res.status(200).send(removed)
    } catch (error) {
        logger.error('ERROR: cannot remove Transaction ' + err)
        res.status(500).send(err);
    }
    
}