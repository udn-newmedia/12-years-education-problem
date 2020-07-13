<template>
  <div class="otherprojects-wrapper" :class="`theme-${theme}`">
    <div class="otherprojects-title">108課綱上路周年追蹤報導</div>

    <div class="otherprojects-container" ref="otherprojectsContainer">
      <a
        v-for="(item, i) in dataArray"
        :href="operatedLink(item.link, i)"
        :target="
          i === active || (i === 1 && !isAfterOnlineDate) ? '' : '_blank'
        "
        class="otherprojects-image-wrapper"
        :class="{
          hovered: hovered === i,
          'item-first': i === 0,
        }"
        :style="{
          opacity: i === active && 0.4,
          cursor: (i === active || (i === 1 && !isAfterOnlineDate)) && 'auto',
        }"
        @mouseenter="hoverItem(i)"
        @mouseleave="unHoverItem()"
        @click="goToOther(i)"
        :key="item.id"
        :disabled="true"
      >
        <div class="otherprojects-image">
          <img
            :src="windowSize === 'web' ? item.img.web : item.img.mob"
            alt
            class="otherprojects-image"
          />
        </div>
        <div class="otherprojects-subtitle-wrapper">
          <span class="otherprojects-subtitle">
            <!-- <span class="underline">{{ item.title }}</span> -->
            <span class="underline" v-html="item.title" />
            <br />
            <span class="online" v-if="item.online&& !isAfterOnlineDate">{{ item.online }}</span>
          </span>
        </div>
      </a>
    </div>

    <ul class="otherprojects-pagination">
      <li
        class="otherprojects-pagination-item"
        v-for="(item, i) in dataArray"
        :class="{ active: activePage === i, light: theme !== 'dark' }"
        :key="`pagination${item.id}`"
      />
    </ul>

    <a
      href="https://udn.com/search/word/2/108課綱"
      target="_blank"
      class="otherprojects-link"
    >更多課綱相關報導</a>
  </div>
</template>

<script>
import content from './data/content'
import { sendGaMethods } from '@/mixins/masterBuilder.js'
import isAfterOnlineDate from '@/mixins/handleOnlineDate.js'
export default {
  name: 'OtherProjects',
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
    isNotRoot: { type: Boolean, default: true },
  },
  data() {
    return {
      dataArray: content.otherProjects,
      windowSize: 'web',
      active: null,
      hovered: null,
      activePage: 0,
    }
  },
  mixins: [sendGaMethods, isAfterOnlineDate],
  methods: {
    checkWindowSize() {
      if (window.innerWidth <= 768) {
        this.windowSize = 'mob'
      } else {
        this.windowSize = 'web'
      }
    },
    hoverItem(i) {
      if (this.windowSize === 'web' && i !== this.active) {
        this.hovered = i
      }
    },
    unHoverItem() {
      this.hovered = null
    },
    containerScrollHandler() {
      if (this.windowSize === 'mob') {
        const {
          scrollLeft,
          scrollWidth,
          offsetWidth,
        } = this.$refs.otherprojectsContainer
        for (let i = 0; i < this.dataArray.length; i++) {
          if (
            scrollLeft >
            ((scrollWidth - offsetWidth) * (2 * i - 1)) /
              (2 * (this.dataArray.length - 1))
          ) {
            this.activePage = i
          }
        }
      }
    },
    getActive() {
      const currentURL = window.location.href
      if (currentURL.indexOf('/problem') !== -1) {
        this.active = 0
      } else if (currentURL.indexOf('/poll') !== -1) {
        this.active = 1
      } else if (currentURL.indexOf('/data') !== -1) {
        this.active = 2
      } else if (currentURL.indexOf('/story') !== -1) {
        this.active = 4
      } else if (currentURL.indexOf('/collect') !== -1) {
        this.active = 5
      } else {
        this.active = 3
      }
    },
    goToOther(index) {
      if (index !== this.active) {
        this.sendGA({
          category: 'related',
          action: 'click',
          label: index + 1,
        })
      }
    },
    operatedLink(link, index) {
      if (index === this.active) {
        return 'javascript:void(0);'
      } else {
        if (link.indexOf('http') !== -1) {
          return link
        }
        return this.isNotRoot ? `.${link}` : link
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.checkWindowSize)
    document
      .querySelector('.otherprojects-container')
      .addEventListener('scroll', this.containerScrollHandler)
    this.checkWindowSize()
    this.getActive()
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkWindowSize)
    document
      .querySelector('.otherprojects-container')
      .removeEventListener('scroll', this.containerScrollHandler)
  },
}
</script>
<style lang="scss" scoped>
.otherprojects-wrapper {
  ::-webkit-scrollbar {
    display: none;
  }
  margin-top: 10%;
  padding: 0 15% 100px;
  @media screen and (max-width: 768px) {
    padding: 0 0 100px;
  }
  .otherprojects-title {
    font-family: 'Noto Sans TC', 'Microsoft JhengHei', Roboto, sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 2.56;
    text-align: center;
    padding-top: 16.39vh;
  }
  .otherprojects-container {
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      flex-wrap: nowrap;
      // overflow-y: scroll;
      overflow-y: hidden;
    }
    .otherprojects-image-wrapper {
      text-decoration: none;
      flex: 0 0 33.33%;
      max-width: 33.33%;
      height: 30.14vh;
      margin: 5.56vh 0;
      padding: 0 7.5px;
      @media screen and (max-width: 768px) {
        flex: 0 0 340px;
        max-width: 340px;
        // height: 382.5px;
        height: 400px;
      }
      @media screen and (max-width: 414px) {
        flex: 0 0 280px;
        max-width: 280px;
        // height: 315px;
        height: 350px;
      }
      @media screen and (max-width: 374.99px) {
        flex: 0 0 200px;
        max-width: 200px;
        // height: 225px;
      }
      .otherprojects-image {
        max-width: 100%;
        overflow: hidden;
        img {
          transition: all 0.5s ease-in-out;
          overflow: hidden;
        }
      }
      .otherprojects-subtitle-wrapper {
        display: flex;
        justify-content: flex-start;
        .otherprojects-subtitle {
          font-family: 'Microsoft JhengHei', Roboto, sans-serif;
          font-size: 18px;
          line-height: 1.7;
          justify-self: start;
          color: #eeeeee;
          text-align: left;
          .online {
            color: #00ccb1;
          }
          @media screen and (min-width: 768.1px) {
            .underline {
              width: calc(100%);
              background-image: linear-gradient(
                transparent calc(100% - 2px),
                #00ccb1 2px
              );
              background-repeat: no-repeat;
              background-size: 0% 100%;
              transition: background-size 0.5s;
            }
          }
          @media screen and (max-width: 768px) {
            text-align: left;
          }
        }
      }
      &.hovered {
        .otherprojects-image {
          img {
            transform: scale(1.2);
          }
        }
        .otherprojects-subtitle-wrapper {
          .otherprojects-subtitle {
            @media screen and (min-width: 768.1px) {
              // &::after {
              //   width: 100%;
              // }
              .underline {
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      &.item-first {
        @media screen and (max-width: 768px) {
          // margin-left: 15vw;
        }
        @media screen and (max-width: 768px) {
          margin-left: 214px;
        }
        @media screen and (max-width: 414px) {
          margin-left: 74px;
        }
        @media screen and (max-width: 374.99px) {
          margin-left: 44px;
        }
      }
      // &.item-last {
      //   @media screen and (max-width: 768px) {
      //     margin-right: 15vw;
      //   }
      // }
    }
  }
  .otherprojects-pagination {
    display: none;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      .otherprojects-pagination-item {
        list-style: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-left: 3px;
        margin-right: 3px;
        background-color: #ababab;
        &.active {
          background-color: #ffffff;
          &.light {
            background-color: #00ccb1;
          }
        }
      }
    }
    // @media screen and (max-width: 414px) {
    //   margin-top: 50px;
    // }
  }
  .otherprojects-link {
    margin-top: 11.11vh;
    display: block;
    text-decoration: underline;
    font-size: 18px;
    line-height: 1.7;
    text-align: center;
    color: #00ccb1;
  }
  &.theme-dark {
    background-color: #000000;
    .otherprojects-title {
      color: #eeeeee;
    }
  }
  &.theme-light {
    background-color: #fff;
    text-decoration: none;
    .otherprojects-title {
      color: #000;
    }
    .otherprojects-container {
      .otherprojects-image-wrapper {
        .otherprojects-subtitle-wrapper {
          .otherprojects-subtitle {
            color: #000;
          }
        }
      }
    }
  }
}
</style>