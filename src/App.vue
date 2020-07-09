<template lang="pug">
div#app(
  :class="{'app-in-first-view': $store.state.isInFirstView, 'app-in-collector': $store.state.isEnterCollector}"
)
  PageIndicator
  HeaderType(page-title="揭露課綱五大亂象")
    a(
      class="active"
      :href="null"
      target="_blank"
      rel="noopener"
    ) 揭露課綱五大亂象
    a(
      :class="{'header-menu-link--disabled': !isAfterOnlineDate}"
      :href="isAfterOnlineDate ? '../poll/' : '#'"
      target="_blank"
      rel="noopener"
      @click="sendGA({category: 'menu', action: 'click', label: '108課綱上路周年大調查'})"
    ) <span v-if="isAfterOnlineDate">108</span>課綱上路周年大調查<span  v-if="!isAfterOnlineDate"class="menu-item__online-date">（07/13上線）</span>
    a(
      href="../data/"
      target="_blank"
      rel="noopener"
      @click="sendGA({category: 'menu', action: 'click', label: '台灣教育關鍵數字'})"
    ) 台灣教育關鍵數字
    a(
      href="../"
      target="_blank"
      rel="noopener"
      @click="sendGA({category: 'menu', action: 'click', label: '台灣教改為何總失敗'})"
    ) 台灣教改為何總失敗
    a(
      href="../story/"
      target="_blank"
      rel="noopener"
      @click="sendGA({category: 'menu', action: 'click', label: '一個家庭看台灣升學主義'})"
    ) 一個家庭看台灣升學主義
    a(
      href="../collect/"
      target="_blank"
      rel="noopener"
      @click="sendGA({category: 'menu', action: 'click', label: '寫下你的教改心聲'})"
    ) 寫下你的教改心聲
    a(
      href="https://udn.com/search/word/2/108課綱"
      target="_blank"
      rel="noopener"
      aria-label="outlink"
      name="outlink"
      @click="sendGA({category: 'menu', action: 'click', label: '更多課綱相關報導'})"
    ) 更多課綱相關報導
  Cover
    h2(slot="prembleTitle") 新課綱上路一年<br>理想與現實的差距<br>有多大？
    p(slot="prembleText") 一張張美好明亮的圖卡，<br>是台灣教育對孩子的期待，<br>現況與理想之間，<br>還有多大的差距？
    h1(slot="gate") 無效預算？<br>揭露108課綱<br>五大亂象
  main
    Abstract
      article.article
        Budget
          p 影響全台240萬學生的108課綱（十二年國教課程綱要）2019年正式實施，是台灣近20年最大一波教育改革，政府砸入大筆經費推動—教育預算年年增，是僅次社會保險、國防的第三大支出；2020年12年國教「專屬」預算高達341億，超越外交部、文化部等部會整年度預算。
          div.article-narrow
            ColumnOne(
              :srcMob="require('~/img/chart/data_m.svg')"
              :srcPad="require('~/img/chart/data_m.svg')"
              :srcPc="require('~/img/chart/data.svg')"
            )
        ChaosList
          p 但新課綱的推動，並沒有因為高額預算就一帆風順。被教育界喻為20年大躍進的這場新教改，《聯合報》追蹤調查，教學現場出現五大亂象，讓課綱精神變了調：
          table
            tbody
              tr
                td.td--red
                  p 亂象一
                td
                  p 明星高中帶頭亂
              tr
                td.td--red
                  p 亂象二
                td
                  p 補教搶賺焦慮財
              tr
                td.td--red
                  p 亂象三
                td
                  p 教學被升學和進度綁架
              tr
                td.td--red
                  p 亂象四
                td
                  p 教師抗拒改變躲課綱
              tr
                td.td--red
                  p 亂象五
                td
                  p 偏鄉小校開課難
    ArticleCastAnchor(title="明星高中帶頭亂")
    Chapter(:id="1")
      ChapterBanner(
        index="1"
        title="掛羊頭賣狗肉^_^明星高中帶頭亂"
        question="彈性課程、多元選修"
        ideal="國、高中開設多元課程，讓學生探索興趣"
        truth="學校掛羊頭賣狗肉，課程變學科加課，喪失多元精神"
        problem="亂象一"
        cover="cover1.jpg"
      )
      article.article
        p 教育部統計，<strong>大學休退學人數每年超過9萬人，許多人的理由都是「志趣不合」</strong>，對自己辛苦考上的大學科系毫無興趣。為解決學生的「無動力」，新課綱重大變革之一，是在高中增加多元選修，讓學生享用「課程自助餐」。但上路不到一年，就傳出許多學校「掛羊頭賣狗肉」，<strong>以選修之名行補課、加課之實</strong>，抹殺制度美意。
        br
        h2 計畫亂寫被退<br>課程換湯不換藥
        p 據《聯合報》調查，許多高中將課程計畫送到教育主管機關備查時，都被眼尖的委員發現<strong>將選修課大量配給特定主科教師</strong>，雖有漂亮的課名包裝，但明顯是讓主科老師拿選修來加課；還有學校拿多元選修來開設英語檢定課程，或有<strong>學校開了一堆加強學生學科的「補強性選修」</strong>，都被委員一一寫上建議退回重改。
        p 有審查委員透露，這些亂寫計畫的學校，許多都是明星高中，被點名的包括新竹高中、台南一中等校。該委員直言：「明星高中學生程度有那麼差，需要這麼多補強課程？」有學校來來回回送件5次，才完成備查。
        p 該委員也說，過去教育部對於課程計畫審得很鬆，學校才敢亂寫「闖關」，但新課綱上路後，教育部明顯「玩真的」，找了許多經驗豐富的高中校長、教務主任來審，這些老鳥一看就知道學校在玩什麼花招，學校很難僥倖過關。
        p 國中端的問題則在彈性課程。有國中校長透露，雖然課綱裡規定國中要發展特色彈性課程，但他估計有3分之1學校「沒在動」，<strong>用教科書商提供的彈性課程教材編一編就送計畫</strong>，或者是課程計畫書一門開「國際教育」、一門開「自然探索」，課名看似符合新課綱精神，但<strong>若授課教師未與學科教師交叉配課，「就很明顯是學科加課」</strong>。
        br
        h2 學校：和審查委員期待有落差
        p 新竹高中校長李明昭表示，其實很多學校都面臨類似狀況，因為108學年教育部並未要求學校在多元課程上需開設一定的課數，隔年卻忽然要求，因此學校緊急邀集老師設計出多元選修課程，並補回教育部獲通過。
        p 台南一中校長廖財固則說，108年各高中在普通班的課程計畫幾乎都被退，只有4所學校通過；主要是剛實施，學校想法和委員所期待的有落差，因此才會有這麼多學校被退。
        p 國教署副署長戴淑芬表示，課程計畫雖是「備查」，但新課綱上路，教育部和審查委員期待各校能以現有師資來落實課綱精神，才會加上建議，請學校重新審視，希望透過不斷對話，來引導學校更加理解新課綱。
      NextBanner(
        index="1"
        cost="11~15億"
        description="教育部107年到109年每年平均花11億到15億，辦理高中職優質化輔助方案、多元選修、彈性學習之高中特色課程及高職務實致用特色課程"
        next="亂象二 |  補教搶賺焦慮財"
      )
    ArticleCastAnchor(title="補教搶賺焦慮財")
    Chapter(:id="2")
      ChapterBanner(
        index="2"
        title="新名詞讓家長慌^_^補教趁勢賺課綱財"
        question="核心素養、高中學習歷程檔案"
        ideal="不要「標準化」的工廠學生"
        truth="補教換新名詞開班，用「公式」幫孩子鋪路"
        problem="亂象二"
        cover="cover2.jpg"
      )
      article.article
        p 創下超高收視率的韓劇《SKY castle 天空之城》中，高社經地位的父母為了孩子升學，找來專職「學習顧問」，不僅量身規劃課程，還貼心安排學生參加各種志工活動、社團、競賽，打造完美成績與豐富的申請資料。類似的場景，也正在台灣上演。
        br
        h2 財源1：<br>學習歷程輔導班 天空之城台灣版？
        p 隨108課綱上路的「<a href="http://12basic.edu.tw/edu-3.php" target="_blank" rel="noopener" aria-label="高中學習歷程檔案" title="高中學習歷程檔案">高中學習歷程檔案</a>」，內容包含學生高中3年的修課紀錄、課堂學習成果、多元表現等，每學期或每學年上傳，111學年起最多<strong>將佔大學申請入學比重50%以上</strong>，目的是真實呈現學生學習軌跡、個人特質，翻轉「成績定生死」的升學思維。
        p 教育部、大學招生委員會聯合會雖曾多次舉辦說明會，但面對未知卻影響重大的學習歷程，家長和學生仍舊相當憂慮。教育部高中優質化計畫曾對高中生做調查，「學習歷程檔案」是令學生最煩惱的一個項目。
        p 黃姓家長孩子今年高一，是第一屆新課綱學生，他常督促孩子準備學習檔案，又是蒐集資料、又是拍照存證，做很多但充滿無奈：「到底有沒有效？沒有人知道，只能悶著頭做」。
        p 有補教業者看準家長焦慮、學生迷惘，開出學習歷程輔導班，<strong>主打一對一輔導、量身規畫課外競賽與活動，還建置300個職人老師的資料庫</strong>，要幫學生打造出最適合目標科系的學習歷程檔案。課程採「包套制」，報名時間不限，但補習班保證安排學生完成3項多元表現成果，一套價位雖高達4萬，仍吸引學生蜂擁而至，有學生國三一畢業就來報名，許多來自明星私校。
        ColumnOne(
          :srcMob="require('~/img/pic/mob/pic2.jpg')"
          :srcPad="require('~/img/pic/mob/pic2.jpg')"
          :srcPc="require('~/img/pic/pc/pic2.jpg')"
        ) 補教業者針對學生、家長需求，開出學習歷程輔導課，安排專責學習顧問指導學生累積學習歷程。圖／取自補習班網路簡章
        p 舉例而言，甄戰學習顧問中心的學習歷程輔導班內設有30多個顧問老師，一對一輔導學生參加合適的社團、營隊、檢定；套裝課程也規畫學生完成3項門檻較高的任務，比如參與奧林匹亞科學競賽、取得專利等，目標高一到高二上每學期各完成一項，高三專心拼考試。
        br
        h2 財源2：<br>新名詞「素養」 小學開始補
        p 周六上午10點，地點是台中西屯區百大佳華補習班。8個小學三、四年級學生排列成ㄇ字形，在老師的帶領下讀三國演義、山海經、魯賓遜漂流記等中外經典，提早養成108課綱強調的閱讀素養。
        p 108課綱強調「核心素養」<ArticleDictionary title="素養">「素養」強調以生活化情境，來培養學生運用知識、跨科整合、動手實作等能力。相較過去死背知識，更重視學生能否運用所學，解決生活中遇到的各種難題。</ArticleDictionary>，升高中的國中會考、升大學的學測，考題都強調朝「素養導向命題」邁進，抽象的新名詞讓許多家長困惑又緊張。補教業者則瞄準家長需求，紛紛開設核心素養相關課程，「閱讀素養」課程最多，吸引大批家長報名。
        p 按百大佳華補習班課程簡章，素養班從小三開到國二，教學內容從文學故事進階到國學常識。國語文補教經驗12年、擔任這堂國小素養班老師的林聿安說，多數仍認為閱讀不用補，不過升學考題在改變，就連數學考題都仰賴閱讀，看不懂就無法作答。<strong>該班已成功開班兩年，她預期這股需求會逐漸提升</strong>。
        p 全國家長團體聯盟理事長彭淑燕分析，「素養」這個名詞太新，家長難免擔心學校沒準備好，或是各校對素養的解讀有差異，乾脆把小孩送往以素養為名的補習班；全國教師工會總聯合會理事長張旭政說，<strong>多數人對素養的理解就是考題變長</strong>，顯示素養的核心概念仍待溝通。
        p 不少學校教師和家長團體也擔憂，「什麼都補」將惡化學生教育資源、城鄉差距，核心素養、學習歷程的初衷也恐變調，但一名補教業者坦言，<strong>補教像教改的一面鏡，隨時因應「需求」調整服務。如今各種補教新商機，都在反映家長、學生對108課綱的焦慮</strong>。
      NextBanner(
        index="2"
        cost="3億"
        description="教育部107年到109年每年平均花3億，推動擴大優先免試、多元入學、適性入學宣導、學生學習表現及成效蒐集"
        next="亂象三 |  教師被升學綁架"
      )
    ArticleCastAnchor(title="教師被升學綁架")
    Chapter(:id="3")
      ChapterBanner(
        index="3"
        title="升學和進度綁架^_^「素養」難落實"
        question="素養導向教學"
        ideal="學生不只學死背的知識，還學到應對未來挑戰的能力與態度"
        truth="教師受限升學與課本進度、教學能力，很難落實"
        problem="亂象三" cover="cover3.jpg"
      )
      article.article
        p 新課綱希望教師改變過去填塞課本的教學方式，落實「素養導向教學」，但國、高中教師直言，素養強調以生活化情境引導學生思考、討論、實作，也鼓勵教師跨領域合作，立意雖好卻很花時間，學科時數已經縮減，課程進度、升學考試壓力都還在，「怎麼可能這樣教？」
        br
        h2 家長拿著課本問<br>誰敢不教完？
        p 高雄市鼓山高中校長莊福泰指出，新課綱在高中階段加入多元選修、校訂必修，讓學校設計特色課程，這塊因為沒有考試壓力，要落實素養導向教學相對容易，「但學科很難」，教師過去都沒有相關經驗，會擔心：「<strong>素養導向教學，學生能考好嗎？</strong>」沒有人敢輕易放手嘗試，且課程上不完，家長、學生都會來問。
        p 不只高中有考大學的升學包袱，國中有會考在前，壓力也很大。嘉義市民生國中校長陳明君舉例，自然領域橫跨生物、地球科學、理化，社會科有地理、歷史、公民，這些課程橫跨多元專業，在大校可透過教師互助備課，協助任課老師教完，但小校教師有限，特別是<strong>八、九年級課程，真的必須趕進度，教師和學生壓力都很大</strong>。
        p 「素養對教師而言太陌生了，教師不一定有意願，一支粉筆一樣可以教，會考也可以考很好。」高雄市田寮國中校長蔡嘉興直言，國中會考和升學綁在一起，就會影響國中的教學態度，學校在少子化浪潮下都有極大的招生壓力，明星國中承受不起升學率降低，小校更禁不起學生流失。
        ColumnOne(
          :srcMob="require('~/img/pic/mob/pic3.jpg')"
          :srcPad="require('~/img/pic/mob/pic3.jpg')"
          :srcPc="require('~/img/pic/mob/pic3.jpg')"
        ) 新課綱學科時數縮減，許多教師都擔心教學進度來不及、影響學生升學考試，不敢放手調整教法，學校也有升學率壓力。記者余承翰／攝影
        br
        h2 想靠考題引導<br>卻讓現場更混亂
        p 蔡嘉興認為，要改變教學現場，需要靠考試題型引導，但以會考而言，近年出題雖已看出題幹增長、考題生活化等趨勢，但紙筆測驗能考的還是很有限，仍以知識為主，考不出素養強調的能力與態度，各校段考、小考，更不可能出這樣的題型。
        p 考題改變反而讓學校教師更焦慮。嘉義市民生國中校長陳明君指出，國中生擔心的是會考，教學現場老師除了希望會考能有好成績，也希望學生掌握基礎知識，但現在新課綱的考題，卻讓部分教師憂心，<strong>無法確認學生是專業基礎能力不好，還是閱讀能力不好</strong>。
        p 舉例而言，數學科若單獨出計算題，學生或許能解題，但現在考試題目長篇大論，學生對題目理解能力不足，考試成績不好，可能不是數學力差，而是閱讀理解能力不佳，讓各專業課程老師很難透過成績，辨識學生對基礎課程的學習力。
      NextBanner(
        index="3"
        cost="9.6~13億"
        description="教育部107年到109年每年平均花9.6億到13億，強化國中小課程與教學，如精進教學計畫、推動國中教學正常化等"
        next="亂象四 |  學生上課碰運氣"
      )
    ArticleCastAnchor(title="學生上課碰運氣")
    Chapter(:id="4")
      ChapterBanner(
        index="4"
        title="一樣教師兩樣情^_^學生賭運氣"
        question="教師心態與素質"
        ideal="教師跟上改革趨勢，調整心態與教法"
        truth="教師態度兩極，有教師甚至躲避新課綱"
        problem="亂象四"
        cover="cover4.jpg"
      )
      article.article
        p 新課綱的理念與精神能否落實，現場教師是關鍵。但課綱上路以來，各校都發現教師心態兩極，有些教師很有熱忱，積極設計、共備課程，但也有教師仍持觀望態度，不願調整教法，甚至以過去教改經驗「看衰」新課綱，還有教師以將退休為理由，拒絕帶第一批新課綱學生。
        p 教師心態、教法、能力參差不齊，讓學生的教育品質像賭博。
        br
        h2 抗拒改變的教師：<br>觀望大於行動 能拖就拖
        p 台中一中在課綱上路後觀察到一個現象：年輕老師很有熱忱，新課綱需要老師們跨科共備課程，這群老師早在1、2年前就開始準備；年紀稍長、教學資歷深的老師則稱自己將退休，「無法適應108課綱變革」，不想參與分組討論、共同備課，要求教未適用新課綱的高二、高三學生。
        p 台中一中不是個案，各級學校都觀察到類似情況。北一女中教務主任吳銘祥指出，<strong>很多教師覺得新課綱是「洪水猛獸」</strong>，若找教師來上高一課程，有教師會說：「不要啦！我再兩年就要退休了」，也有教師乾脆提早辦退休；師大附中教師洪逸文也發現，<strong>有些教師在「賭」，賭新課綱會倒、不會成功</strong>，「但如果沒倒呢？是誰倒楣？」
        p 國中、國小也一樣。台東縣龍田國小主任何宗儒坦言，很多老師的心態都是觀望、以不變應萬變，得先帶起一些人，其他人才會願意試試看。
        p 「老師能不能發現，學生已經不一樣了？」宜蘭縣利澤國中教務主任游思芳教學26年，她發現教室風景慢慢在改變。學生google得到的知識，比老師給的資料還多，課堂再也無法吸引學生專注。對她而言，新課綱是「讓孩子不要從課堂逃走的機會」，但她也坦言，多數老師心態仍是觀望、甚至抗拒。
        br
        h2 有心改變的教師：<br>人、時間都不夠 熱情恐燒完
        p 有心想改變的教師，遇到的問題是時間、人力都不足。長久下來，各校都擔心教師的熱情與能量，會逐漸被沉重的教學壓力澆熄。
        ColumnOne(
          :srcMob="require('~/img/pic/mob/pic4.jpg')"
          :srcPad="require('~/img/pic/mob/pic4.jpg')"
          :srcPc="require('~/img/pic/pc/pic4.jpg')"
        ) 現場教師態度兩極，有些教師還在觀望，也有不少教師已開始調整教學方法，但許多學校都擔心若無員額配套，課程負擔恐磨損教師熱情。圖為利澤國中「植物與人生」課程。記者余承翰／攝影
        p 「老師們這麼認真研發課程，有熱情但負擔沉重！」新課綱要求選修開課量應達學生修習學分數的1.2到1.5倍，台中女中教務主任王裕德舉例，學校學校員額被控管，以一人每周教學16節來算，等於少了100多節課的人力，<strong>目前校內自然教師超鐘點最多，每名幾乎每週20多節課，教師負荷沉重，也壓縮排課的靈活度</strong>。
        p 「教師員額沒增加，很難完全落實108課綱的理念。」王裕德舉例，自然科包括生物、地科、物理、化學，被列為考科與必修的高二「探究實作」理想上要有2名老師協同上課，但員額不足很難做到，多數學校乾脆自行變通「自然科老師一人上一節課」，完全失去108課綱設計的原意。
        p <strong>教師員額不足也發生在「非考科」的加深加廣課程</strong>，例如藝術、音樂、電腦、科技老師，多數學校僅1、2名額，國教署規定非考科至少也要開一門課列入選修，老師們叫苦連天，希望找校外兼課老師「支援」，偏偏這一類的老師又難找。
        p 對師資少的小校來說，開課更加辛苦。高雄市田寮國中所在的田寮區，是全台高齡化程度排名第三的鄉鎮區，人口外流嚴重，全校目前只有63個學生、15名教師，10幾名教師要開的課跟大校一樣多，大校動輒50、60名教師，小校幾個人得扛起所有學科課程、兼任行政職務、設計每學期要開3門的彈性課程，校長蔡嘉興直呼：「統一的開課量，老師真的會累死」。
      NextBanner(
        index="4"
        cost="2億"
        description="教育部107年到109年每年平均花2億，協助國中小教師專業成長、補助高中專任教師赴公民營機構研習"
        next="亂象五 |  偏鄉孩子的困境"
      )
    ArticleCastAnchor(title="偏鄉孩子的困境")
    Chapter(:id="5")
      ChapterBanner(
        index="5"
        title="沒有大學幫開課^_^偏鄉、小校怎麼辦？"
        question="多元選修課、素養導向"
        ideal="用多元課程、生活化命題和教學，打開學生更多可能性"
        truth="拉大城鄉間的資源差距"
        problem="亂象五"
        cover="cover5.jpg"
      )
      article.article
        p 108課綱上路後，一則<a href="https://udn.com/news/story/6885/4081579" target="_blank" rel="noopener" aria-label="大學策略聯盟開課" title="大學策略聯盟開課">5所明星高中與8所頂尖大學策略聯盟開課</a>的新聞，引發教學現場不安。明星高中如北一女、建中，和頂尖大學如台大、政大等校合作，大學教授幫高中生開課，不僅讓很多學校擔憂輸在起跑點，也打擊認真備課的高中教師；偏鄉與社區高中更焦慮，擔憂偏鄉學生原本就缺乏資源與文化刺激，這種「強強合作」的方式，更加拉大教育差距。
        br
        h2 明星高中找大學幫忙<br>各校壓力大
        p 不只台北有高中、大學聯盟，台中名校、台中一中目前也與7所大學、科博館合作，這學期開了6門多元選修課程，109學年度第一學期還會再多3門課，等於有9堂課與大學端合作。
        p 台中一中教務主任彭佳偉指出，看到媒體報導「建中、北一女等5校聯盟與大學合開微課程」，<strong>校內老師掀起一股「台北市明星高中可以，中一中為何做不到」聲浪</strong>，開始召集自然科教師並與大學端接洽，包括交大材料工程、逢甲工學院、長庚、中山醫大等校。
        p 中一中認為，與大學合作的好處是透過大學教授現身說法，讓學生實際了解「這個系在學什麼」，有微型課程讓學生試探，也加上職涯探索，例如與長庚醫合作的「醫學職涯探索」，目的是讓學生知道，自己適不適合讀醫學系。
        p 不過同在台中的台中女中，看法則不一樣。中女中高一目前有20多門多元選修，傾向校內老師自己開課，鮮少與大學合作。教務主任王裕德表示，中女中各科老師共識度高，認為和大學合作上課「較不穩定」，這學期能合作不保證下學期大學端的老師還能繼續開課，「中女中老師自己研發、自己扛！」
        p 「大學直接到高中來開課這種情形，應該要減少。」高雄市鼓山高中校長莊福泰認為，<strong>大學直接開課會造成其他學校很大壓力</strong>，大學可以協助高中，但不是直接開課，各校還是要依照學校屬性，設計適合孩子的課程。
        br
        h2 課綱強調生活情境<br>偏鄉孩子更加弱勢
        p 明星高中可以找大學開課，屏東縣與台東縣等縣市，偏鄉學校連找老師開課都有困難，愈偏鄉難度愈高。屏縣某高中就坦言開設多元選修課程「有困難」，因為學校實在太遠了，校內師資不足、外聘老師來的意願很低，光這一點，就讓城鄉差距愈拉愈大。
        ColumnOne(
          :srcMob="require('~/img/pic/mob/pic5.jpg')"
          :srcPad="require('~/img/pic/mob/pic5.jpg')"
          :srcPc="require('~/img/pic/pc/pic5.jpg')"
        ) 偏鄉學生文化刺激少、家長較難提供孩子學習環境，生活情境相對都市學生單薄，第一線教師擔心，新課綱強調素養、生活化情境的教學方向雖好，但要思考如何避免拉大城鄉間差距。記者劉學聖／攝影
        p 此外，新課綱強調生活情境融入課堂，也鼓勵家長在生活中多與孩子交流，但對很多偏鄉學生而言相對困難。台東縣龍田國小校長吳耀仁直言：「<strong>新課綱是台北看天下發展出來的課綱，對偏鄉學生是不公平的</strong>」。
        p 吳耀仁指出，新課綱強調生活情境融入的素養教學，但<strong>偏鄉學生文化刺激、科技知識都不足，接觸到的時事脈動也少，更別說新課綱強調的國際觀</strong>；大城市的學生有很多活動可以參加、很多博物館可以參觀，台東雖有雖有好山好水，刺激還是差很多，且需要老師結合環境特點、開發教材，但教師要找到進修和教材資源遠不如大城市容易。
        p 要期待家長提供生活情境就更困難了。以龍田國小為例，學生家長多半靠務農、打零工維生，整日忙碌，能提供給孩子的教育資源和陪伴時間很少，無法仰賴家庭提供學習環境。
        p 閱讀能力和識字率也是問題。台東大學教授陳淑麗曾做過研究，花東地區的學生識字能力從小一就開始落後全國，小四後更有擴大趨勢，且低識字量的學生落後更嚴重，<strong>小五至國一低識字組學生，只有一般學生小二的程度</strong>。吳耀仁擔憂，新課綱的素養導向命題題幹長、敘述複雜，著重學生的閱讀理解能力，偏鄉孩子很吃虧，只會拉大城鄉差距。
      NextBanner(
        index="5"
        cost="16億"
        description="教育部107年到109年每年平均花16億，發展偏鄉教育相關計畫及推動教育優先區"
      )
      HaveQuestion
  Marketing
  PageFooter
    OtherProjects
    Editor
      div
        p 製作人
        p 洪欣慈
      div
        p 採訪團隊
        p 林秀姿、洪欣慈、<br>潘乃欣、喻文玟、<br>鄭惠仁、羅紹平、<br>翁禎霞、卜敏正、<br>徐如宜、李京昇、<br>王駿杰、陳夢茹、<br>魏翊庭
      div
        p 影像
        p 劉學聖、余承翰、<br>聯合報系資料庫
      div
        p 視覺設計
        p 張心慈
      div
        p 網頁製作
        p 楊若榆
      div
        p 插畫
        p Huyu、董十行
      div
        p 監製
        p 蕭衡倩
      div
        p 製作單位
        p 聯合報新媒體中心、<br>視覺設計中心、<br>數據中心
      div
        p 
        p 2020.07.09
    FooterShare
    FbComment
    FooterLogo
    PageBackTop
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';
import isAfterOnlineDate from '@/mixins/handleOnlineDate.js';
import InApp from 'detect-inapp';

/* Header */
import HeaderType from '@/components/_common/header/HeaderType.vue';
/* Header */

/* Footer */
import PageFooter from '@/components/_common/footer/PageFooter.vue';
import Editor from '@/components/_common/footer/Editor.vue';
import FbComment from '@/components/_common/footer/FbComment.vue';
import FooterLogo from '@/components/_common/footer/FooterLogo.vue';
import FooterShare from '@/components/_common/footer/FooterShare.vue';
import PageBackTop from '@/components/_common/layout/PageBackTop.vue';
/* Footer */

import ArticleCastAnchor from '@/components/_common/layout/ArticleCastAnchor.vue';
import ArticleDictionary from '@/components/_common/layout/ArticleDictionary.vue';
import Abstract from '@/components/abstract/Abstract.vue';
import Budget from '@/components/abstract/Budget.vue';
import ChaosList from '@/components/abstract/ChaosList.vue';
import Chapter from '@/components/chapter/Chapter.vue';
import ChapterBanner from '@/components/chapter/ChapterBanner.vue';
import ColumnOne from '@/components/_common/layout/ColumnOne.vue';
import Cover from '@/components/Cover.vue';
import HaveQuestion from '@/components/chapter/HaveQuestion.vue';
import NextBanner from '@/components/chapter/NextBanner.vue';
import Marketing from '@/components/banner/Marketing.vue';
import OtherProjects from '@/components/banner/OtherProjects.vue';
import PageIndicator from '@/components/_common/layout/PageIndicator.vue';


export default {
  name: 'App',
  mixins: [sendGaMethods, isAfterOnlineDate],
  components: {
    ArticleCastAnchor,
    ArticleDictionary,
    Abstract,
    Budget,
    ChaosList,
    Chapter,
    ChapterBanner,
    ColumnOne,
    Cover,
    Editor,
    FbComment,
    FooterLogo,
    FooterShare,
    HaveQuestion,
    HeaderType,
    NextBanner,
    Marketing,
    OtherProjects,
    PageFooter,
    PageBackTop,
    PageIndicator,
  },
  methods: {
    addChapterObserver() {
      const vm = this;
      function onEnterChapterBanner(cb) {
        if (!vm.$store.state.isEnterMainContent) return;
        if (!vm.$store.state.isEnterChaosContent)  vm.$store.dispatch('updatedIsEnterChaosContent', true);

        const index = cb[0].target.dataset.cbIndex;
        const active = vm.$store.state.chapterBannerActiveList[index];        
        if (active) return;

        vm.$store.dispatch('updatedChapterBannerActiveList', index);
      }

      const watcher = new IntersectionObserver(onEnterChapterBanner);
      const lazyChapterBanners = document.querySelectorAll('article.chapter-banner-container');
      const lazyChapterBannersGroup = Object.values(lazyChapterBanners);

      lazyChapterBannersGroup.forEach(cb => {
        watcher.observe(cb);
      });
    },
    addNextChapterObserver() {
      const vm = this;

      function onEnterNextChapterObserver(nb) {
        if (!vm.$store.state.isEnterMainContent) return;

        const index = nb[0].target.dataset.nbIndex;
        const active = vm.$store.state.nextChapterBannerActiveList[index];
        if (active) return;

        vm.$store.dispatch('updatedNextChapterBannerActiveList', index)
      }

      const watcher = new IntersectionObserver(onEnterNextChapterObserver);
      const lazyNextBanners = document.querySelectorAll('article.next-banner-container');
      const lazyNextBannersGroup = Object.values(lazyNextBanners);

      lazyNextBannersGroup.forEach(nb => {
        watcher.observe(nb);
      });
    },
  },
  mounted() {
    this.addChapterObserver();
    this.addNextChapterObserver();
  },
  created() {
    // 處理inapp browser window.innerWidth問題
    (function() {
      const inapp = new InApp(navigator.userAgent || navigator.vendor || window.opera);
      let currentWidth = window.innerWidth;
      let executeCount = 0;
      if (inapp.isInApp) {
        const inappWidthListener = setInterval(() => {
          executeCount++;
          if (window.innerWidth !== currentWidth) {
            window.location.reload();
            currentWidth = window.innerWidth;
          }
          if (executeCount > 10) {
            clearInterval(inappWidthListener);
          }
        }, 100);
      }
    })();
  },
}
</script>

<style lang="scss">
@import '~/style/menu_item_disabled.scss';

#app {
  &.app-in-first-view {
    overflow: hidden;
    max-height: 200vh;
  }
  &.app-in-collector {
    overflow: hidden;
    max-height: 100vh;
  }
  h2 {
    font-family: source-han-serif-tc;
  }
  .article-narrow {
    padding: 0 12.5%;
    @include pc {
      padding: 0 17.5%;
    }
  }
}
main {
  background-color: #f2f2f2;
}
</style>
