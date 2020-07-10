import otherProjectsWebImg1 from "@/assets/img/relate/12-years-education_r1_web.jpg";
import otherProjectsWebImg2 from "@/assets/img/relate/12-years-education_r2_web.jpg";
import otherProjectsWebImg3 from "@/assets/img/relate/12-years-education_r3_web.jpg";
import otherProjectsWebImg4 from "@/assets/img/relate/12-years-education_r4_web.jpg";
import otherProjectsWebImg5 from "@/assets/img/relate/12-years-education_r5_web.jpg";
import otherProjectsWebImg6 from "@/assets/img/relate/12-years-education_r6_web.jpg";
import otherProjectsMobImg1 from "@/assets/img/relate/12-years-education_r1_mob.jpg";
import otherProjectsMobImg2 from "@/assets/img/relate/12-years-education_r2_mob.jpg";
import otherProjectsMobImg3 from "@/assets/img/relate/12-years-education_r3_mob.jpg";
import otherProjectsMobImg4 from "@/assets/img/relate/12-years-education_r4_mob.jpg";
import otherProjectsMobImg5 from "@/assets/img/relate/12-years-education_r5_mob.jpg";
import otherProjectsMobImg6 from "@/assets/img/relate/12-years-education_r6_mob.jpg";

import marketingPeople1 from "@/assets/img/marketing/lan.png";
import marketingPeople2 from "@/assets/img/marketing/fan.png";
import marketingPeople3 from "@/assets/img/marketing/zhuang.png";
import marketingBg1 from "@/assets/img/marketing/banner_bg1.jpg";
import marketingBg2 from "@/assets/img/marketing/banner_bg2.jpg";

const content = {
  otherProjects: [
    {
      title: "無效預算？<br/>揭露108課綱五大亂象",
      img: { web: otherProjectsWebImg1, mob: otherProjectsMobImg1 },
      id: `${otherProjectsWebImg1}${otherProjectsMobImg1}`,
      link: "./problem/",
    },
    {
      title: "【108課綱大調查】<br/>升學主義 教師心中的教改殺手",
      img: { web: otherProjectsWebImg2, mob: otherProjectsMobImg2 },
      id: `${otherProjectsWebImg2}${otherProjectsMobImg2}`,
      link: "./poll/",
      online: "  (7/13上線) ",
    },
    {
      title: "最不快樂的世代<br/>10個關鍵數字 看懂台灣教育",
      img: { web: otherProjectsWebImg3, mob: otherProjectsMobImg3 },
      id: `${otherProjectsWebImg3}${otherProjectsMobImg3}`,
      link: "./data/",
    },
    {
      title: "台灣教改為何總失敗",
      img: { web: otherProjectsWebImg4, mob: otherProjectsMobImg4 },
      id: `${otherProjectsWebImg4}${otherProjectsMobImg4}`,
      link: "./",
    },
    {
      title: "她的家庭<br/>是台灣升學主義縮影",
      img: { web: otherProjectsWebImg5, mob: otherProjectsMobImg5 },
      id: `${otherProjectsWebImg5}${otherProjectsMobImg5}`,
      link: "./story/",
    },
    {
      title: "寫下你的教改心聲",
      img: { web: otherProjectsWebImg6, mob: otherProjectsMobImg6 },
      id: `${otherProjectsWebImg6}${otherProjectsMobImg6}`,
      link: "./collect/",
    },
  ],
  marketing: [
    {
      imgs: {
        people1: marketingPeople1,
        people2: marketingPeople2,
        bg: marketingBg1,
      },
      title1: "108課綱好難懂？",
      title2: "專家讓你問到飽",
      text: "2小時解答你對新課綱的所有困惑",
      date: "08.17",
      guest: "講者 藍偉瑩 ✕ 范信賢",
      link: "https://a.udn.com/forums/forum/34/index.html",
      id: marketingBg1,
    },
    {
      imgs: {
        people1: marketingPeople1,
        people2: marketingPeople3,
        bg: marketingBg2,
      },
      title1: "怎麼做好學習歷程檔案？",
      title2: "生涯探索是第一步",
      text: "學習歷程檔案將是未來升大學關鍵，你搞懂了嗎？",
      date: "08.29",
      guest: "講者 藍偉瑩 ✕ 莊智超",
      link: "https://a.udn.com/forums/forum/35/index.html",
      id: marketingBg2,
    },
  ],
};

export default content;
