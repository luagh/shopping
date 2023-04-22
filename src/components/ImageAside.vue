<template>
    <el-aside width="200px" class="image-aside">
        <div class="top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">fengye</div>
    </el-aside>
</template>
<script setup>
</script>
<style>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;

}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>