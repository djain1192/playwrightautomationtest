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


await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/627cfc2ae26b7e1a10ead536",
async route=>
{
  const response =  await page.request.fetch(route.request());
  let body =fakePayLoadOrders;
   route.fulfill(
      {
        response,
        body,

      });
    //intercepting response - APi response->{ playwright fakeresponse}->browser->render data on front end
});

await page.locator("button[routerlink*='myorders']").click();
//await page.pause();
console.log(await page.locator(".mt-4").textContent());

});
