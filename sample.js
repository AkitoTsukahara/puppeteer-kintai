const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,  // ブラウザが動く様子を確認する
        slowMo: 300  // 動作確認しやすいようにpuppeteerの操作を遅延させる
    })
    const page = await browser.newPage()

    //chromeを開く
    await page.goto('https://www.google.com/')
    // 検索窓に「こんにちは」と入力
    await page.type('input[name=q]', 'こんにちは', { delay: 50 }) 
    //検索
    await page.click('input[type="submit"]')
    //スクリーンショット
    await page.screenshot({ path: 'screenshot/sample1.png' })

    await browser.close()
})()