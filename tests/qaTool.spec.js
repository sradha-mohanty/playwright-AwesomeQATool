const { test, expect } = require('@playwright/test');
import { QATool } from './qaTool';
import testdata from './testdata.json';
import logger from "../utils/logger.js";
 
    test.describe("Automation for QATool",(page)=>{
      test.beforeEach(async ({ page }) => {
         await page.goto('/');
       });
            test('Submit Questions and Answers',async({page})=>{
               expect(page.url()).toBe('http://localhost:8000/');
               const obj=new QATool(page);
               const qnaList = testdata.slice(1, testdata.length);
               for(let data of qnaList){
               await obj.createQuestion(data);
               await obj.submitQuestion();
               await obj.checkTextOfQnA();
               await obj.checkCountOfQnA();
               }  
               logger.info("Question and Answers submitted successfully");
            });
            test('Delete Questions and Answers',async({page})=>{
               const obj=new QATool(page);
               for(let data of testdata){
               await obj.createQuestion(data);
               await obj.submitQuestion();
               }
               await obj.removeQuestion();
               logger.info("Question and Answers removed successfully");
            });
            test('Sort Questions and Answers',async({page})=>{
                const obj=new QATool(page);
                for(let data of testdata){
                await obj.createQuestion(data);
                await obj.submitQuestion();
                }
                await obj.sortQuestions();
                logger.info("Question and Answers are sorted successfully");
             });
             test('Check the Content of the Page',async({page})=>{
                const obj=new QATool(page);
                await page.waitForTimeout(1000);
                await obj.checkContentOfPage();
                logger.info("Content of the page are validated");
             });
             test('Check the Tootltip in the Page',async({page})=>{
               const obj=new QATool(page);
               await page.waitForTimeout(1000);
               await obj.checkToolTip();
               logger.info("Tooltip of the headings validated successfully");
            });
});