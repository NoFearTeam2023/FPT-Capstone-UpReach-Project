import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const useBookingStore = create()(
  persist(
    (set) => ({
      booking:   {
      platform: "",
      jobName:"",
      content: [],
      quantities: "",
      costFrom: "",
      costTo: "",
      linkBook: "",
      clientname: "Le Quang Hieu",
      brandName: "NoFear",
      describes: "",
      startDate: "",
      endDate: "",
      createdDate: "10/07/2023",  
      status: "Pending",
    },

    setBookingInfo: (booking) => {
        set(() => ({
          booking: booking
        }))
      },

    }),
    {
      name: 'booking-draw-storage'
    }
  )
)

export { useBookingStore }