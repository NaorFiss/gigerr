<template>
    <section class="flex">
        <li >
            <!-- <p>{{gig.imgUrl}}</p>
        <img src="'{{ gig.imgUrl }}'" alt="" /> -->
        <p>{{  gig.title  }}</p>
        <!-- <button @click="removeGig(gig._id)">x</button> -->
        <!-- <button @click="updateGig(gig)">Update</button> -->
        <p>⭐ {{gig.rate}}</p>
        <hr />
        <div class="flex space">
          <p>🤍</p>
          <div>  
            <p>STARTING AT</p>
            <p>${{gig.price.basic?.toLocaleString()}}</p>
          </div>
        </div>
        <!-- <button @click="addGigMsg(gig._id)">Add gig msg</button>
        <button @click="printGigToConsole(gig)">Print msgs to console</button> -->
      </li>
    </section>
</template>

<script>

export default {
    name: 'gig-preview',
    props: {
        gig: Object,
    },
}
</script>