let moment = require('moment');


// const date = new Date();
// console.log('date', date);
// console.log('month', date.getMonth());

// const date = moment();
// console.log(date.format('MMM Do,YYYY'));


// 10:35 am
//unpadded, padded
const createdAt = 123;
const date = moment(createdAt);
console.log(date);
