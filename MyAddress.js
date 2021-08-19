const Web3 = require('web3')

const provider = require('./config.js')['config']['provider']

const web3 = new Web3(provider)
const keystore = require('./config.js')['config']['keystore']
const password = require('./config.js')['config']['password']
const NewAccount = web3.eth.accounts.decrypt(keystore, password)
exports.NewAccount = NewAccount