//Method we use in tests
const {test, describe, beforeAll, beforeEach, afterAll, afterEach, expect} = require('@playwright/test'); 

//Methods who open browser "Chrome"
const {chromium} = require('playwright');     

//Mein URL redirect to "GamePlay" and buttons in CLI
const host = 'http://localhost:3000';
const registerButton = "//a[text()='Register']";
const emailFieldRegister = "//input[@name='email']";
const passwordFieldRegister = "//input[@name='password']";
const confirmPasswordFieldRegister = "//input[@name='confirm-password']";
const submitButton = "//input[@type='submit']";
const logoutButton = "//a[text()='Logout']";
const loginButton = "//a[text()='Login']";
const emailLogin = "//input[@name='email']";
const passwordLogin = "//input[@name='password']";
const loginButtonForm = "//input[@type='submit']";

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
            await page.click(registerButton);     //click the button 
            await page.waitForSelector("//form");           //and wait for form

            let random = Math.floor(Math.random() * 1000);     //generate a random email
            user.email = `test_${random}@abv.bg`;

            //Act
            await page.fill(emailFieldRegister, user.email)           //fill the form and
            await page.fill(passwordFieldRegister, user.password)     //click the register button
            await page.fill(confirmPasswordFieldRegister, user.confirmPassword)

            await page.click(submitButton);

            //Assert
            await expect(page.locator(logoutButton)).toBeVisible();  //click 
            expect(page.url()).toBe(host + '/')                                      //the button
                                                                              //logout and go main page
        })

        test("Register with empty fields", async () => {
            //Arrange                                        //this test run reg.form without valid data
            await page.goto(host);                           //and catch the dialog(error message)
            await page.click(registerButton);
            await page.waitForSelector("//form");

            //Act
            page.on('dialog', async dialog =>{
                expect(dialog.massage()).toBe("No empty fields are allowed and confirm password has to match password!");
                                                             //before the dialog form show up adding           
                await dialog.accept();                       //lestener and click the button 
            });

            await page.click(registerButton);

            //Assert
            expect(page.url()).toBe(host + "/register")
        })                                                                   
        
        test("Login with valid credentials", async () =>{
            //Arrange
            await page.goto(host);
            await page.click(loginButton);
            await page.waitForSelector("form");

            //Act
            await page.fill(emailLogin, user.email);
            await page.fill(passwordLogin, user.password);
            await page.click(loginButtonForm);

            //Assert
            await expect(page.locator(logoutButton)).toBeVisible();
            expect(page.url()).toBe(host + "/");
        })

    });

    describe("Navigation Bar Tests", () => {
        
    });

    describe("CRUD Operations Tests", () => {
        
    });

    describe("Home Page Tests", () => {
        
    });

   



})




