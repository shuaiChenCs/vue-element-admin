<template>
    <div class="sp-search">
        <mt-search v-model="value">
            <mt-cell v-for="item in result" :title="item.title" :value="item.value" :key="item.title"></mt-cell>
        </mt-search>
    </div>
</template>
<script>
export default {
    data() {
        return {
        value: "",
        result: [
            { title: "dsadsa", value: 1 },
            { title: "daaasadsa", value: 1 },
            { title: "dd", value: 1 }
        ]
        };
    }
}
</script>
<style lang="less" scoped>

</style>

