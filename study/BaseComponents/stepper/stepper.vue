<template>
  <div>
    <ul>
      <li>
        <button @click="subCount()" v-show="show" id="reduce"></button>
      </li>
      <li>
        <span v-show="show">{{count}}</span>
      </li>
      <li>
        <button @click="addCount()" id="add"></button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "counter",
  data() {
    return {
      show: false,
      count: this.number
    };
  },
  props: {
    number: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    partId: {
      type: Number,
      default: 0
    }
  },
  mounted: function() {
    this.show = this.count > 0 ? true : false;
  },
  methods: {
    addCount() {
      this.count++;
      this.show = this.count > 0 ? true : false;
      this.$emit("add", String(this.count), this.index, this.partId);
    },
    subCount() {
      this.count--;
      this.show = this.count > 0 ? true : false;
      this.$emit("sub", String(this.count), this.index, this.partId);
    }
  }
};
</script>
<style lang="scss" scoped>
div {
  background-color: #ffffff;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul {
  display: flex;
  padding-right: 0.3rem;
  li {
    vertical-align: bottom;
    flex: 1;
    span {
      display: block;
      height: 100%;
      margin-top: 0.2rem;
    }
    button {
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: top;
      background-size: 100% 100%;
    }
  }
}
#add {
  background-image: url("../assets/img/btn_add.png");
}
#reduce {
  background-image: url("../assets/img/btn_reduce.png");
}
</style>


