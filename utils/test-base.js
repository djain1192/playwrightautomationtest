const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
testDataForOrder :    {
    username : "darahitjain1192@gmail.com",
    password : "Darshit@11",
    productName:"zara coat 3"
    }

}

)



