const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayLoad = {userEmail:"darahitjain1192@gmail.com",userPassword:"Darshit@11"};
const orderPayLoad = { orders: [{country: "India",productOrderedId: "6262e95ae26b7e1a10e89bf0" } ]}
const fakePayLoadOrders = {data:[],message:"No Orders"};

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("button[routerlink*='myorders']").click();
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62a9c222e26b7e1a10edd215",
//Need to Provide ORDER ID of other user then Authorized user then it will give message as "You are not authorized to access this"
route=> route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6218dad22c81249b296508b9'})
)
await page.locator("button:has-text('View')").first().click();

//await page.pause();
});


