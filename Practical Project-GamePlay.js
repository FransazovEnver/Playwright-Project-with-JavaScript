//Method we use in tests
const {test, describe, beforeAll, beforeEach, afterAll, afterEach, expect} = require('@playwright/test'); 

//Methods who open browser "Chrome"
const {chromium} = require('playwright');     

//Mein URL to "GamePlay"
const host = 'http://localhost:3000/';

//Variables we need in tests
let browser;
let context;
let page;

//Page Object Model (POM) in tests we need
let user = {                              //User credentials to LogIn 
    email:"",                             //The User and email we fill with "random" credentials
    password: "123456",
    confirmPassword:"123456"
}

//Login in the user game options
let game = {                                      
    title: "",
    category:"",
    maxLevel:"99",
    imageUrl:"ROBLOX.jpg",
    summary:"The latest Roblox version",
    id:""
}

//Tests
describe("e2e tests", () =>{                     //describe method group all test in module
    beforeAll(async () =>{                       //BeforeAll method keep inside async func.
        browser = await chromium.launch();      //BeforeAll run all you need before tests
    });                                          //chromium launch the brower

    afterAll(async () =>{
        await browser.close();                  //afterAll method who run ones after all
    });                                         //close the browser 

    beforeEach(async () => {
        context = await browser.newContext();   //for every test open new tab in browser
        page = await browser.newPage();
    });

    afterEach(async () =>{                     //for every open tab(test) clear and close the tab
        await page.close();
        await context.close();
    });

    ////////////////////////////////////Tests///////////////////////////////

    describe("Authentication Tests", () => {
        test("Register with valid data", async () =>{
            //Arrange
            await page.goto(host);                          //Open the page and
            await page.click("//a[text()='Register']");     //click the button 
            await page.waitForSelector("//form");           //and wait for form

            let random = Math.floor(Math.random() * 1000);     //generate a random email
            user.email = `test_${random}@abv.bg`;

            //Act
            await page.fill("//input[@name='email']", user.email)           //fill the form and
            await page.fill("//input[@name='password']", user.password)     //click the register button
            await page.fill("//input[@name='confirm-password']", user.confirmPassword)

            await page.click("//input[@type='submit']");

            //Assert
            await expect(page.locator("//a[text()='Logout']")).toBeVisible();  //click 
            expect(page.url()).toBe(host)                                      //the button
                                                                              //logout and go main page
        })

    });

    describe("Navigation Bar Tests", () => {
        
    });

    describe("CRUD Operations Tests", () => {
        
    });

    describe("Home Page Tests", () => {
        
    });

   



})




