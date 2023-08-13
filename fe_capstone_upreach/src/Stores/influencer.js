import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const useInfluStore = create()(
  persist(
    (set) => ({
      influ:   {
          fullName: "Le Quang Hieu",
          type: "Citizen",

          topics: [
              "Baby",
              "Beauty",
              "Business",
              "Travel",
              "Game",
              "Film",
              "Personal perception",
              "Film",
              "Film",
              "Film",
          ],
          address: "Da Nang",
          gender: "Male",
          age: 22,
          relationship: "Married",
          bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
          email: "hieupro123@gmail.com",
          phone: "0398357123",
          facebook:{followers: 1230989, interactions: 2304955},
          instagram:{followers: 123098, interactions: 230495},
          youtube:{followers: 12309899, interactions: 23049559},
          tiktok:{followers: 1230, interactions: 2304},
          date:"7/2023",
          view:1345,
          image:[
          { 
              uid: '-1',
              name: 'image1.png',
              status: 'done',
              url:'https://kenh14cdn.com/thumb_w/600/203336854389633024/2023/3/15/photo1678877198587-16788771988181833109244.jpg'},
          { 
              uid: '-2',
              name: 'image2.png',
              status: 'done',
              url:'https://nld.mediacdn.vn/291774122806476800/2021/4/30/img-3282-16197464144561057923327.jpg'},
          { 
              uid: '-3',
              name: 'image3.png',
              status: 'done',
              url:'https://kenh14cdn.com/203336854389633024/2023/5/9/photo-3-16836084165791093415121.jpeg'}
          ],
    },

    setInfluInfo: (influ) => {
        set(() => ({
            influ: influ
        }))
      },

    }),
    {
      name: 'influencer-storage'
    }
  )
)

export { useInfluStore }