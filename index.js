// Command => node --require dotenv/config index.js

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,  // ブラウザが動く様子を確認する
    //slowMo: 300,  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });
  const page = await browser.newPage();

  //chromeを開く
  await page.goto('https://attendance.moneyforward.com/employee_session/new');
  // 検索窓に「こんにちは」と入力
  await page.type('#employee_session_form_office_account_name', process.env.ID,
      { delay: 50 });
  await page.type('#employee_session_form_account_name_or_email',
      process.env.MAIL, { delay: 50 });
  await page.type('#employee_session_form_password', process.env.PASSWORD,
      { delay: 50 });
  //ログイン
  await page.click('input[type="submit"]');

  // 3秒読み込みをまつ
  await page.waitForTimeout(3000);

  //スクリーンショット
  //await page.screenshot({ path: 'screenshot/sample1.png' });

  //「出勤」
  await clockIn(page);

  //「退勤」
  //await clockOut(page);

  await browser.close();
})();

const clockIn = async (page) => {
  await page.click('.attendance-card-time-stamp-clock-in');
};

const clockOut = async (page) => {
  await page.click('.attendance-card-time-stamp-clock-out');
};
