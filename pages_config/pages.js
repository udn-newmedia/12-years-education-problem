const contentGenerator = require('./utils/contentGenerator.js');

/* seo內容文件 */
const monitorCode = contentGenerator('../contents/monitor.html');
const headerContent = contentGenerator('../contents/header.html');
const mainContent = contentGenerator('../contents/main.html');
const footerContent = contentGenerator('../contents/footer.html');

/* 正式路徑 */
// const pathRoot = process.env.NODE_ENV === 'production' ? 'https://udn.com/newmedia/2020/12-years-education/problem/' : './';
// const mainPage = 'https://udn.com/newmedia/2020/12-years-education/';

/* 測試路徑 */
const pathRoot = process.env.NODE_ENV === 'production' ? 'http://nmdap.udn.com.tw/newmedia/2020/12-years-education/problem/' : './';
const mainPage = 'http://nmdap.udn.com.tw/newmedia/2020/12-years-education/';

/* 作者 */
const author = '洪欣慈、張心慈、楊若榆、林秀姿、潘乃欣、喻文玟、鄭惠仁、羅紹平、翁禎霞、卜敏正、徐如宜、李京昇、王駿杰、陳夢茹、魏翊庭、章凱閎';

module.exports = {
  publicPath: pathRoot,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '無效預算？揭露108課綱五大亂象 | 專題 | 聯合報',
      description: '108課綱上路將滿1年，政府砸入大量預算，推動這波被教育界喻為「20年大躍進」的新教改，但《聯合報》追蹤調查，教學現場已出現五大亂象，讓課綱精神變了調。',
      keywords: '108課綱,12年國教,教育部,教改,素養,學習歷程檔案',
      author: author,
      datePublished: '2020-06-08T07:00:00+08:00',
      dateModified: '2020-06-08T07:00:00+08:00',
      MONITOR: monitorCode,
      CONTENT: headerContent + mainContent + footerContent,
      pageUrl: pathRoot,
      mainPage,
      theme: '#ffffff'
    },
  }
}