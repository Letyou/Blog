let timer = null;
let timeout = null;
let firstTimer = null;
Component({
  properties: {
    bubbleList: {
      type: Array,
      value: [],
      observer(newVal) {
        if (newVal && newVal.length) {
          const { bubbleList } = this.data;
          if (bubbleList[0].type === 0) {
            this.setData({ delay: 5500 });
          }
          this.setData({
            currentObj: bubbleList[0]
          });
          this.handleAnimation(this.data.delay);
        }
      }
    }
  },

  data: {
    currentIndex: 0,
    showBubble: true,
    currentObj: null,
    animationData: null,
    opacity: null,
    delay: null,
    switchTimer: null
  },
  methods: {
    // 执行动画效果和定时切换数据
    handleAnimation(delay) {
      timeout = setTimeout(() => {
        timeout = null;
        this.handleAnimationFading();
        this.handleTiming();
      }, delay);
    },
    // 定时切换数据
    handleTiming() {
      const { switchTimer } = this.data;
      this.setData({ switchTimer: Math.floor(Math.random() * 3000 + 2000) });
      timer = setTimeout(() => {
        const { bubbleList } = this.data;
        const currentIndex = this.data.currentIndex + 1;
        this.setData({
          currentIndex
        });
        if (currentIndex === bubbleList.length) {
          this.setData({
            showBubble: false
          });
          clearTimeout(timer);
          clearTimeout(timeout);
        } else {
          if (this.data.delay === 5500) {
            firstTimer = setTimeout(() => {
              this.setData({
                opacity: 1,
                currentObj: bubbleList[currentIndex]
              });
              if (this.data.currentObj.type == 2) {
                this.setData({
                  delay: 4000
                });
              } else {
                this.setData({
                  delay: 3000
                });
              }
              this.handleAnimation(this.data.delay);
            }, 5000);
          } else {
            clearTimeout(firstTimer);
            this.setData({
              opacity: 1,
              currentObj: bubbleList[currentIndex]
            });
            if (this.data.currentObj.type == 2) {
              this.setData({
                delay: 4000
              });
            } else {
              this.setData({
                delay: 3000
              });
            }
            this.handleAnimation(this.data.delay);
          }
        }
      }, switchTimer);
    },
    // 处理动画效果
    handleAnimationFading() {
      const fading = wx.createAnimation({
        duration: 650,
        timingFunction: "ease"
      });
      fading
        .opacity(1)
        .opacity(0.5)
        .opacity(0)
        .step();
      this.setData({ animationData: fading.export() });
    }
  }
});
