import { ref, nextTick, computed } from "vue";
import { createGoodsSkusCard } from "~/api/goods.js"


//当前商品ID
export const goodsId = ref(0)

//规格选项列表
export const sku_card_list = ref([])

//初始化规格选项列表
export function initSkuCardList(d) {
    sku_card_list.value = d.goodsSkusCard.map(item => {
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v => {
            v.text = v.value || "属性值"
            return v
        })
        return item
    })
}
//添加规格选项  
export const btnLoading = ref(false)
export function addSkuCardEvent() {
    createGoodsSkusCard({
        goods_id: goodsId.value, //商品id
        name: "规格选项",     //规格名称
        order: 50, //排序
        type: 0,  //规格类型

    }).then(res => {
        sku_card_list.value.push({
            ...res,
            text: res.name,
            loading: false,
            goodsSkusCardValue: []
        })

    }).finally(() => {
        btnLoading.value = false

    })
}

//初始化规格值
export function initSkuCardItem(id) {
    const item = sku_card_list.value.find(o => o.id = id)
    return {
        item
    }
}