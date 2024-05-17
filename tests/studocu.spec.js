const { test, expect } = require('@playwright/test');
import { QATool } from './qaTool';
import testdata from '../tests/testdata.json';
 
    test.describe("Automation for QATool",(page)=>{
        
            test('Submit Questions and Answers',async({page})=>{
               const obj=new QATool(page);
               await obj.openURL();
               for(let data of testdata){
               await obj.createQuestion(data);
               await obj.submitQuestion();
               await obj.checkTextOfQnA(data);
               await obj.checkCountOfQnA();
               }  
            });
            test('Delete Questions and Answers',async({page})=>{
               const obj=new QATool(page);
               await obj.openURL();
               for(let data of testdata){
               await obj.createQuestion(data);
               await obj.submitQuestion();
               }
               await obj.removeQuestion();
            });
            test('Sort Questions and Answers',async({page})=>{
                const obj=new QATool(page);
                await obj.openURL();
                for(let data of testdata){
                await obj.createQuestion(data);
                await obj.submitQuestion();
                }
                await obj.sortQuestions();
             });
             test('Check the Content of the Page',async({page})=>{
                const obj=new QATool(page);
                await obj.openURL();
                await page.waitForTimeout(1000);
                await obj.checkContentOfPage();
             });
             test('Check the Tootltip in the Page',async({page})=>{
               const obj=new QATool(page);
               await obj.openURL();
               await page.waitForTimeout(1000);
               await obj.checkToolTip();
            });
});