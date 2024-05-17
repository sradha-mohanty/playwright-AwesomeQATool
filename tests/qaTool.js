import logger from '../utils/logger';
import locators from './locators.json';
import testdata from './testdata.json'
const { test, expect } = require("@playwright/test");


export class QATool {
  constructor(page) {
    this.page = page;
  }

  async openURL() {
    await this.page.goto();
    await expect(this.page.getByText('The awesome Q/A tool')).toBeVisible()
  }
  async createQuestion(data) {
    await this.page.locator(locators.QATool.question).fill(data.question);
    await this.page.locator(locators.QATool.answer).fill(data.answer);
  }
  async submitQuestion() {
    expect(this.page.locator(locators.QATool.question)).toBeVisible({
      timeout: 2000,
    }).catch((error) => {
      logger.error(`Create Question is not visible:${error}`);
    })
      .then(() => logger.info("Create Question button is present"));

    expect(this.page.locator(locators.QATool.answer)).toBeVisible();
    await this.page.locator(locators.QATool.submitQAButton).click();
  }
  async checkTextOfQnA() {
    let listItems = await this.page.$$(locators.QATool.listItems);
    let value;
    for (let i = 0; i < listItems.length; i++) {
      let element = listItems[i];
      value = await element.textContent();
      expect(value).toEqual(testdata[i]?.question + testdata[i]?.answer)
    }
  }
  async checkCountOfQnA() {
    let listItems = await this.page.$$(locators.QATool.listItems);
    let listCount;
    for (let i = 0; i < listItems.length; i++) {
      listCount = listItems.length;
    }
    await expect(this.page.locator(locators.QATool.sidebar)).toContainText(`Here you can find ${listCount} questions. Feel free to create your own questions!`);
  }
  async removeQuestion() {
    await this.page.locator(locators.QATool.removeQAButton).click();
    let textMsg = await this.page.locator(locators.QATool.removeQuestionAlert).textContent();
    let sidebarText = await this.page.locator(locators.QATool.sidebar).textContent();
    expect(textMsg).toEqual("No questions yet :-(");
    expect(sidebarText).toEqual("Here you can find no questions. Feel free to create your own questions!");
  }
  async sortQuestions() {
    let questionList = await this.page.$$(locators.QATool.questionList);
    let questionListBeforeSort = [];
    let questionListAfterSort = [];
    for (let i = 0; i < questionList.length; i++) {
      let elementBeforeSort = questionList[i];
      let textBeforeSort = await elementBeforeSort.textContent();
      questionListBeforeSort.push(textBeforeSort);
    }
    questionListBeforeSort.sort();
    await this.page.locator(locators.QATool.sortButton).click();
    for (let i = 0; i < questionList.length; i++) {
      let elementAfterSort = questionList[i];
      let textAfterSort = await elementAfterSort.textContent();
      questionListAfterSort.push(textAfterSort);
    }
    expect(questionListBeforeSort).toEqual(questionListAfterSort);
  }
  async checkContentOfPage() {
    let H1 = await this.page.locator(locators.QATool.headingH1).textContent();
    let H2 = await this.page.locator(locators.QATool.headingH2).textContent();
    let H3 = await this.page.locator(locators.QATool.headingH3).textContent();
    let quesLabel = await this.page.locator(locators.QATool.questionLebel).textContent();
    let ansLabel = await this.page.locator(locators.QATool.answerLabel).textContent();
    expect(H1).toEqual("The awesome Q/A tool");
    expect(H2).toEqual("Created questions");
    expect(H3).toEqual("Create a new question");
    expect(quesLabel).toEqual("Question");
    expect(ansLabel).toEqual("Answer");
    await expect(this.page.locator(locators.QATool.sortButton)).toBeVisible();
    await expect(this.page.locator(locators.QATool.removeQAButton)).toBeVisible();
    await expect(this.page.locator(locators.QATool.submitQAButton)).toBeVisible();
    await expect(this.page.locator(locators.QATool.sortButton)).toHaveCSS('background-color', 'rgb(2, 117, 216)');
    await expect(this.page.locator(locators.QATool.removeQAButton)).toHaveCSS('background-color', 'rgb(217, 83, 79)');
    await expect(this.page.locator(locators.QATool.submitQAButton)).toHaveCSS('background-color', 'rgb(92, 184, 92)');
  }
  async checkToolTip() {
    let toolTipCreatedQuestion = this.page.locator("//div[@class='questions']").locator("//h2[@class='tooltipped-title__title']");
    let toolTipCreateNewQuestion = this.page.locator("//div[@class='question-maker']").locator("//h2[@class='tooltipped-title__title']");
    await toolTipCreatedQuestion.hover();
    let h1 = this.page.locator(locators.QATool.headingH1);
    await h1.hover();
    let toolTipCreatedQuestionLocator = await this.page.locator(locators.ToolTip.toolTipLocator).first().textContent();
    expect(toolTipCreatedQuestionLocator).toEqual("Here you can find the created questions and their answers.");
    await toolTipCreateNewQuestion.hover();
    await h1.hover();
    let toolTipCreateNewQuestionLocator = await this.page.locator("//span[contains(@class,'tooltipped-title__tooltip hidden-xl-down')]").last().textContent();
    expect(toolTipCreateNewQuestionLocator).toEqual("Here you can create new questions and their answers.");

  }
}