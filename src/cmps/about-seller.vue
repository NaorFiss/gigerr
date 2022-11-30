<template>
    <div>
        <h1>About The Seller</h1>
        <div class="seller-info">
            <img class="user-img" :src="gig.owner.imgUrl">
            <h5>{{ gig.owner.fullname }}</h5>
            <img class="star-img" src="../assets/star.jpg" />
            <img class="star-img" src="../assets/star.jpg" />
            <img class="star-img" src="../assets/star.jpg" />
            <img class="star-img" src="../assets/star.jpg" />
            <img class="star-img" src="../assets/star.jpg" />
            (223)
            <button>Contact Me</button>
        </div>
        <div class="seller-desc">
            <div class="seller-data">
                <div class="from">
                    <h3 class="seller-header">From</h3>
                    <h3>{{ gig.owner.from }}</h3>
                </div>
                <div class="since">
                    <h3 class="seller-header">Member since</h3>
                    <h3>{{ gig.owner.memberSince }}</h3>
                </div>
            </div>
            <p>{{ gig.owner.about }}</p>
        </div>

    </div>
</template>
    
<script>
export default {
    props: {
        gig: Object
    },
}
</script>