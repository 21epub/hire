<template>
  <!-- <div @mousedown="userMousedown" :style="style"> -->
  <div>
    <Masker v-if="mask" :mask="mask"></Masker>
    <ItemOverlay v-for="item in itemGroup" :key="item.id" :item="item" />
  </div>
</template>

<script>
import Masker from "./mask.vue";
import ItemOverlay from "./item-overlay.vue";
import { itemGroup } from "../../data";
import Vue from "vue";

export default {
  data() {
    return {
      itemGroup: itemGroup
    };
  },
  components: {
    Masker,
    ItemOverlay
  },
  props: ["mask"],
  created() {
    this.itemGroup.forEach(element => {
      Vue.set(element, "actived", false);
    });
  },
  mounted() {
    window.addEventListener("mousedown", this.userMousedown);
  },
  methods: {
    userMousedown(eventObject, b) {
      this.itemGroup.forEach(element => {
        element.actived = false;
      });

      let divId = "selected-range-";
      let divIdSuffix = 0;
      let evt = window.event || eventObject;
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      let scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft;
      let startX = evt.clientX + scrollLeft;
      let startY = evt.clientY + scrollTop;

      // begin draw SelectedRangeDiv
      let selectedRangeDiv = document.createElement("div");
      selectedRangeDiv.id = divId + divIdSuffix++;
      selectedRangeDiv.className = "selected-range-div";
      selectedRangeDiv.style.marginLeft = startX + "px";
      selectedRangeDiv.style.marginTop = startY + "px";
      document.body.appendChild(selectedRangeDiv);

      let choosing = true;
      let retcLeft = "0px",
        retcTop = "0px",
        retcHeight = "0px",
        retcWidth = "0px";

      let self = this;

      document.addEventListener("mouseup", upHandler);

      document.addEventListener("mousemove", moveHandler);

      function upHandler(eventObject) {
        try {
          document.removeEventListener("mouseup", upHandler);
          document.removeEventListener("mousemove", moveHandler);

          let evt = window.event || eventObject;
          document.body.removeChild(selectedRangeDiv);

          var consoletable = { id: [], value: [] };
          self.itemGroup.forEach(element => {
            if (element.actived) {
              consoletable.id.push(element.id);
              consoletable.value.push(element.value);
            }
          });
          if (consoletable.id.length > 0) {
            console.table(consoletable);
          }
        } catch (e) {
          console.log(e);
        } finally {
          choosing = false;
        }
      } // end up

      function moveHandler(eventObject) {
        if (choosing) {
          let evt = window.event || eventObject;
          let scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          let scrollLeft =
            document.body.scrollLeft || document.documentElement.scrollLeft;
          retcLeft =
            (startX - evt.clientX - scrollLeft > 0
              ? evt.clientX + scrollLeft
              : startX) + "px";
          retcTop =
            (startY - evt.clientY - scrollTop > 0
              ? evt.clientY + scrollTop
              : startY) + "px";
          retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
          retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
          selectedRangeDiv.style.marginLeft = retcLeft;
          selectedRangeDiv.style.marginTop = retcTop;
          selectedRangeDiv.style.width = retcWidth;
          selectedRangeDiv.style.height = retcHeight;

          self.calcSelectedRange(selectedRangeDiv);
        }
      } // end move
    }, // end down
    calcSelectedRange(rangeDiv /* 选中框 */) {
      let selectedRange = this.calcDivPosition(rangeDiv);

      // 计算是否选中，假设 界面上有个 div1 我们的选择框是 divRange，如何判断 divRange 选中了 div1呢？
      // 要判断 divRange的任意一点在 div1内。 那如何判断呢？   要分两步计算：
      // divRange 的水平的至少有一点在 div1 的左右两边，先直接算左右两边的距离是否符合，暂时不考虑垂直距离。
      // 然后再计算 divRange 的垂直的任意一点，必须再div的上下两边。     同时满足左右和上下的计算，则被选中。
      //
      // 如何计算 divRange 的水平方向至少有一点再 div1的两边？  如果divRange左边一定能在div1的右边，并且divRange的右边一定在div1的左边，则条件成立。
      // 上下也是如此
      for (let p in this.itemGroup) {
        let divDom = itemGroup[p];
        let _beginX = divDom.pos[0],
          _beginY = divDom.pos[1];
        let _endX = _beginX + divDom.size[0],
          _endY = _beginY + divDom.size[1];
        if (
          selectedRange.beginX < _endX && // 条件1：range的左边必定小于div的右边
          selectedRange.endX > _beginX && // range的右边必定大于div的左边
          (selectedRange.beginY < _endY && // 条件2：range的上边必定高于div的下边
            selectedRange.endY > _beginY) // range的下边必定地狱div的上边
        ) {
          divDom.actived = true;
        } else {
          divDom.actived = false;
        }
      }
    },
    calcDivPosition(divDom) {
      let _left = divDom.offsetLeft,
        _top = divDom.offsetTop;
      let _width = divDom.offsetWidth,
        _height = divDom.offsetHeight;

      return {
        // 代表选中框的左上角
        beginX: _left,
        beginY: _top,

        // 代表选中框右下角
        endX: _left + _width,
        endY: _top + _height
      };
    }
  }
};
</script> 
<style>
.selected-range-div {
  position: absolute;
  border: 1px dashed blue;
  width: 0px;
  height: 0px;
  left: 0px;
  top: 0px;
  overflow: hidden;
}
</style>
