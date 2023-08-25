import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const useUserStore = create()(
  persist(
    (set) => ({
      user: {},

      setUserInfo: (user, _idMonogDB) => {
        set(() => ({
          user: user,
          _idMonogDB: _idMonogDB
        }))
      },
    }),
    {
      name: 'user-draw-storage'
    }
  )
)

export { useUserStore }