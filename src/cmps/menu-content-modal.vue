<template>
    <transition name="fade">
        <div class="modal">
            <div class="menu-content-modal-body">
                <div class="modal__header">
                    <slot name="header" />
                </div>
                <div class="modal__body">
                    <slot name="body" />
                </div>
                <div class="modal__footer">
                    <div class="tags-buttons-container flex space-between">
                        <button @click="closeModal" class="clear-btn">Cancel</button>
                        <button class="btn-primary btn apply-btn" @click="search">Apply</button>
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
  
<script>
export default {
    name: "Modal",
    data() {
        return {
            show: false,
        };
    },
    methods: {
        closeModal() {
            document.querySelector("body").classList.remove("overflow-hidden");
            this.$emit("close");
        },
        search() {
            this.$emit('search')
        }
    },
    created() {
        document.querySelector("body").classList.add("overflow-hidden");
    },
};
</script>