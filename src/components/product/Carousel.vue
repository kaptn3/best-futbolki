<template>
  <div class="carousel">
    <transition-group
      :name="transitionName"
      class="slides-group"
      tag="div"
      :style="{ 'height': height }"
    >
      <div
        v-if="show"
        :key="current"
        class="slide"
      >
        <img
          :src="slides[current].big"
          alt=""
        >
      </div>
    </transition-group>
    <button
      class="carousel__nav-btn carousel__btn-prev"
      @click="slide(-1)"
    />
    <button
      class="carousel__nav-btn carousel__btn-next"
      @click="slide(1)"
    />
    <div class="carousel__dots">
      <button
        v-for="n in slides.length"
        :key="n"
        :class="{ 'carousel__dot_active': current === (n - 1) }"
        @click="changeSlide(n - 1)"
        class="carousel__dot"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Carousel',
    props: {
      slides: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        current: 0,
        show: false,
        direction: 1,
        transitionName: 'fade',
        height: 0,
        int: 0
      };
    },
    methods: {
      slide(dir) {
        this.direction = dir;
        if (dir === 1) {
          this.transitionName = 'slide-next';
        } else {
          this.transitionName = 'slide-prev';
        }
        const len = this.slides.length;
        // eslint-disable-next-line
        this.current = (this.current + dir % len + len) % len;
      },
      changeSlide(slide) {
        if (this.current < slide) {
          this.transitionName = 'slide-next';
        } else {
          this.transitionName = 'slide-prev';
        }
        this.current = slide;
      },
      slideHeight() {
        if (document.querySelector('.slide')) {
          return `${document.querySelector('.slide > img').offsetHeight}px`;
        }
        return '0px';
      }
    },
    mounted() {
      this.show = true;
      this.height = this.slideHeight();
      // set first height for slider wrapper
      this.int = setInterval(() => {
        if (this.height !== '0px') {
          clearInterval(this.int);
        } else {
          this.height = this.slideHeight();
        }
      }, 5);
      window.addEventListener('resize', () => { this.height = this.slideHeight(); });
    },
    beforeDestroy() {
      window.removeEventListener('resize', () => { this.height = this.slideHeight(); });
    }
  };
</script>

<style lang="scss" scoped>
  /* FADE IN */
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-enter {
    opacity: 0;
  }

  /* GO TO NEXT SLIDE */
  .slide-next-enter-active,
  .slide-next-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .slide-next-enter {
    transform: translate(100%);
  }
  .slide-next-leave-to {
    transform: translate(-100%);
  }

  /* GO TO PREVIOUS SLIDE */
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .slide-prev-enter {
    transform: translate(-100%);
  }
  .slide-prev-leave-to {
    transform: translate(100%);
  }

  img {
    width: 100%;
  }

  .slides-group {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .slide {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel {
    position: relative;

    &__nav-btn {
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      height: 30px;
      width: 30px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: block;
    }

    &__btn-next {
      right: 0;
      background-image: url(/img/icons/next.svg);
    }

    &__btn-prev {
      left: 0;
      background-image: url(/img/icons/back.svg);
    }

    &__dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__dot {
      width: 10px;
      height: 10px;
      border: 2px solid #828282;
      border-radius: 100%;

      &:not(:last-child) {
        margin-right: 10px;
      }

      &_active {
        background-color: #828282;
      }
    }
  }
</style>
