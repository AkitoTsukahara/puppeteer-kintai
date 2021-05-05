'use strict'
const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
  
  console.log(event);
  
  const stamp = event.stamp;
  const id = event.id;
  const mail = event.mail;
  const password = event.password;
  
  const browser = await puppeteer.launch({
    //headless: true,  // ブラウザが動く様子を確認する
    //slowMo: 300,  // 動作確認しやすいようにpuppeteerの操作を遅延させる
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  //chromeを開く
  await page.goto('https://attendance.moneyforward.com/employee_session/new');
  // ログイン情報を入力
  await page.type('#employee_session_form_office_account_name', id, { delay: 50 });
  await page.type('#employee_session_form_account_name_or_email', mail, { delay: 50 });
  await page.type('#employee_session_form_password', password, { delay: 50 });
  //ログイン
  await page.click('input[type="submit"]');

  // 3秒読み込みをまつ
  await page.waitForTimeout(3000);

  //スクリーンショット
  //await page.screenshot({ path: 'screenshot/sample1.png' });

  if (stamp === 'SK') {
      //「出勤」
      await clockIn(page);
  } else {
      //「退勤」
      await clockOut(page);
  }
  
  await browser.close();
  return context.succeed('OK');
};

const clockIn = async (page) => {
  await page.click('.attendance-card-time-stamp-clock-in');
};

const clockOut = async (page) => {
  await page.click('.attendance-card-time-stamp-clock-out');
};