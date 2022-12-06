import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'


  ; (() => {

    setTimeout(() => {
      // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      //   console.log('GOT from socket', review)
      //   store.commit({type: 'addReview', review})
      // })
      // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      //   showSuccessMsg(`New review about me ${review.txt}`)
      // })
    }, 0)

  })()



export const reviewService = {
  add,
  query,
  remove
}



function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.delete('review', reviewId)

}
async function add(review) {
  // const addedReview = await httpService.post(`review`, review)

  review.byUser = userService.getLoggedinUser()
  review.aboutUser = await userService.getById(review.aboutUserId)
  const addedReview = await storageService.post('review', review)

  return addedReview
}

; (async () => {
  await storageService.post('review', {

    "_id": "r1",
    "user_id": 2,
    "username": 'naor',
    "userImgUrl": "./src/imgs/user-img/jewel.jpg",
    "countryFlag": ".src/imgs/flags-img/argentina.jpg",
    "countryName": "Argentina",
    "rate": 5,
    "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
  })
})

