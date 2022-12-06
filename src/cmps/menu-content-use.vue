<template>
    <div>
        <menu-content-modal @close="close" class="menu-position-try">
            <template v-slot:header>
                <h1></h1>
            </template>
            <template v-slot:body>
                <div class="form-body">
                    <h1>body-modal</h1>
                </div>
            </template>
            <template v-slot:footer>
                <button class="btn" @click="close">Cancel</button>
                <button class="btn-primary btn" @click="formSubmit">Save</button>
            </template>
        </menu-content-modal>
    </div>
</template>
  
<script>
import menuContentModal from "../cmps/menu-content-modal.vue";
export default {
    methods: {
        formSubmit() {
            console.log('save')
        },
        close() {
            this.$emit("close");
        },
    },
    components: {
        menuContentModal,
    },
};
</script>
  
<style lang="scss" scoped>

</style>