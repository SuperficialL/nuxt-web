/*
 * @Author: SuperficialL
 * @Date: 2020-07-03 22:29:55
 * @LastEditTime: 2020-07-04 10:34:50
 * @Description: vue轮播图配置
 */
import Vue from 'vue'
import { Swiper, Pagination, Mousewheel, Autoplay } from 'swiper/js/swiper.esm'
import exporter from 'vue-awesome-swiper/dist/exporter'

Swiper.use([Pagination, Mousewheel, Autoplay])
Vue.use(exporter(Swiper))
