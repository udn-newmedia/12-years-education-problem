<template>
  <div class="marketing" :style="{ backgroundColor: bg }">
    <div class="marketing-container">
      <div class="marketing-title">活動資訊</div>
      <div class="marketing-text">
        對108課綱、升學制度變革還是有很多疑惑和擔憂？《聯合報》邀請瑩光教育協會理事長藍偉瑩、十二年國教新課綱推動專案辦公室協作委員范信賢、開放個人經驗平台（IOH）創辦人莊智超等多位教育界專家，8月在聯經書房為大家解答。
      </div>
      <div class="marketing-img-wrapper">
        <div
          class="marketing-img"
          v-for="(data, i) in dataArray"
          :key="data.id"
        >
          <div class="marketing-img-date">{{ data.date }}</div>
          <div
            class="marketing-img-container"
            :style="{ backgroundImage: `url(${data.imgs.bg})` }"
          >
            <div
              class="marketing-img-title"
              :style="{ color: i % 2 === 0 && '#fff' }"
            >
              {{ data.title1 }}
            </div>
            <div
              class="marketing-img-title"
              :style="{ color: i % 2 === 0 && '#fff' }"
            >
              {{ data.title2 }}
            </div>
            <p
              class="marketing-img-text"
              :style="{ color: i % 2 === 0 && '#fff' }"
            >
              {{ data.text }}
            </p>
            <div class="d-flex">
              <div class="marketing-img-guest">
                <div class="marketing-img-people">
                  <img :src="data.imgs.people1" alt />
                  <img :src="data.imgs.people2" alt />
                </div>
                <div
                  class="marketing-img-guest-text"
                  :style="{ color: i % 2 === 0 ? '#fff' : '#cf5454' }"
                >
                  {{ data.guest }}
                </div>
              </div>
              <div class="marketing-img-button">
                <a
                  class="marketing-img-signup"
                  target="_blank"
                  :href="data.link"
                  @click="signup(i + 1)"
                  :style="[
                    { color: i % 2 === 0 ? '#cf5454' : '#fff' },
                    { backgroundColor: i % 2 === 0 ? '#fff' : '#cf5454' },
                  ]"
                >
                  <span>報名</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendGaMethods } from "@/mixins/masterBuilder.js";
import content from "./data/content";

export default {
  name: "Marketing",
  props: {
    bg: {
      type: String,
      default: "#fff",
    },
  },
  mixins: [sendGaMethods],
  data() {
    return {
      dataArray: content.marketing,
    };
  },
  methods: {
    signup(index) {
      // do something
      const url = window.location.href;
      let aim = "";
      if (url.indexOf("/story") !== -1) {
        aim = "story";
      } else if (url.indexOf("/poll") !== -1) {
        aim = "poll";
      } else {
        aim = "timeline";
      }

      this.sendGA({
        category: "activity",
        action: "click",
        label: `${aim}報名${index}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.marketing {
  text-align: left;
  padding-bottom: 64px;
  @media screen and (min-width: 768px) {
    padding-bottom: 101px;
  }
  .marketing-container {
    width: 738px;
    margin: auto;
    .marketing-title {
      font-family: source-han-serif-tc, sans-serif;
      font-size: 40px;
      font-weight: bold;
      line-height: 1.6;
      text-align: left;
      color: #000000;
      padding-top: 100px;
      margin: 0 9px;
    }
    .marketing-text {
      font-size: 16px;
      line-height: 1.5;
      text-align: left;
      color: #979797;
      margin: 0 9px;
      // margin-left: 21.9%;
      // width: 33.67%;
    }
    .marketing-img-wrapper {
      margin-top: 7.36vh;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .marketing-img {
        // flex: 0 0 27.42vw;
        // max-width: 27.42vw;
        // height: 41.52vh;
        // margin: 35px 1.4vw 0;
        margin-left: 9px;
        margin-right: 9px;
        .marketing-img-date {
          font-family: TitlingGothicFBComp-Standard;
          font-size: 44px;
          line-height: 0.55;
          text-align: left;
          color: #cf5454;
          margin-bottom: 10px;
        }
        .marketing-img-container {
          width: 351px;
          height: 294px;
          border-radius: 6px;
          padding: 40px 16px 16px 24px;
          .marketing-img-title {
            font-size: 28px;
            font-weight: bold;
            line-height: 1.29;
          }
          .marketing-img-text {
            font-size: 16px;
            line-height: 1.5;
            margin-top: 8px;
            height: 51px;
          }
          .marketing-img-guest {
            display: inline-block;
            width: 210px;
            .marketing-img-people {
              img {
                width: 64px;
                height: 64px;
                margin-right: 14px;
                margin-bottom: 4px;
              }
            }
            .marketing-img-guest-text {
              font-size: 16px;
              font-weight: bold;
              line-height: 2.25;
            }
          }
          .marketing-img-button {
            display: inline-block;
            width: 101px;
            height: 105px;
            .marketing-img-signup {
              display: inline-block;
              margin-top: 41px;
              width: 100%;
              height: 50px;
              font-size: 16px;
              line-height: 1.25;
              border-radius: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              &:hover {
                text-decoration: none;
              }
            }
          }
        }
        // .marketing-img-container {
        //   z-index: 1;
        //   border-radius: 6px;
        //   padding-top: 40px;
        //   padding-bottom: 40px;
        //   display: flex;
        //   flex-wrap: wrap;
        //   @media screen and (min-width: 961px) and (max-width: 1377px) {
        //     height: 100%;
        //   }
        //   @media screen and (max-width: 768px) {
        //     padding-top: 30px;
        //     padding-bottom: 30px;
        //   }
        //   .marketing-img-title {
        //     font-size: 28px;
        //     font-weight: bold;
        //     line-height: 1.29;
        //     padding-left: 6.8%;
        //     padding-right: 6.8%;
        //     max-width: 100%;
        //     flex: 0 0 100%;
        //   }
        //   .marketing-img-text {
        //     font-size: 16px;
        //     line-height: 1.5;
        //     text-align: left;
        //     margin-top: 8px;
        //     padding-left: 6.8%;
        //     max-width: 100%;
        //     flex: 0 0 100%;
        //   }

        //   .marketing-img-guest {
        //     max-width: 50%;
        //     flex: 0 0 50%;

        //     .marketing-img-people {
        //       width: 100%;
        //       display: flex;
        //       padding-left: 13.6%;
        //       img {
        //         max-width: 50%;
        //         flex: 0 0 50%;
        //         padding: 0 7.5px;
        //       }
        //     }
        //     .marketing-img-guest-text {
        //       text-align: center;
        //       font-size: 16px;
        //       font-weight: bold;
        //       line-height: 2.25;
        //       @media screen and (max-width: 375px) {
        //         font-size: 12px;
        //       }
        //     }
        //   }
        //   .marketing-img-button {
        //     max-width: 50%;
        //     flex: 0 0 50%;
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     .marketing-img-signup {
        //       width: 101px;
        //       height: 50px;
        //       font-size: 16px;
        //       line-height: 1.25;
        //       border-radius: 8px;
        //       display: flex;
        //       justify-content: center;
        //       align-items: center;
        //       &:hover {
        //         text-decoration: none;
        //       }
        //     }
        //   }
        // }
      }
    }
    @media screen and (max-width: 768px) {
      width: 351px;
      .marketing-title {
        margin: 0;
      }
      .marketing-text {
        margin: 0;
      }
      .marketing-img-wrapper {
        margin-top: 0;
        .marketing-img {
          margin-left: 0px;
          margin-right: 0px;
          margin-top: 64px;
        }
      }
    }
    @media screen and (max-width: 351px) {
      width: 291px;
      .marketing-img-wrapper {
        .marketing-img {
          .marketing-img-container {
            .marketing-img-title {
              font-size: 22px;
            }
            width: 291px;
          }
        }
      }
    }
  }
}

// @media screen and (max-width: 960px) {
//   .marketing {
//     // height: 120vh;
//     .marketing-container {
//       .marketing-title {
//         margin-left: 12.5%;
//       }
//       .marketing-text {
//         margin-left: 12.5%;
//         width: 40%;
//       }
//       .marketing-img-wrapper {
//         justify-content: flex-end;
//         margin-right: 19.27vw;
//         .marketing-img {
//           flex: 0 0 45.7vw;
//           max-width: 45.7vw;
//         }
//       }
//     }
//   }
// }
// @media screen and (max-width: 760px) {
//   .marketing {
//     .marketing-title {
//       text-align: center;
//       margin-left: 0;
//     }
//     .marketing-text {
//       margin-left: 25%;
//       width: 50%;
//     }
//     .marketing-img-wrapper {
//       margin-right: 0;
//       justify-content: center;
//       .marketing-img-blueline {
//         display: none;
//       }
//       .marketing-img {
//         flex: 0 0 84.78vw;
//         max-width: 84.78vw;
//         .marketing-img-text {
//           text-align: center;
//           margin-bottom: 8px;
//           margin-left: 0;
//         }
//       }
//     }
//   }
// }
// @media screen and (max-width: 520px) {
//   .marketing {
//     .marketing-title {
//       font-size: 35px;
//     }
//     .marketing-text {
//       margin-left: 10%;
//       margin-right: 10%;
//       width: 80%;
//     }
//   }
// }
</style>
