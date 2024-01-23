import { DataType } from '../data/data'

export const utils = {
      getRandomId(arr1: number[], arr2: DataType, setFun: Function) {
            if (arr1.length === arr2.length) setFun([])
            const randomId = Math.abs(Math.ceil(Math.random() * arr2.length - 1))

            if (arr1.includes(randomId)) {
                  this.getRandomId(arr1, arr2, setFun)
            } else if (arr1.includes(0)) {
                  this.getRandomId(arr1, arr2, setFun)
            } else {
                  setFun([randomId, ...arr1])
            }
            return randomId
      },
}
