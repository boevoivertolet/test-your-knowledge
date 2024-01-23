import React, { FC, memo, useState } from 'react'
import { DataType } from './data/data'

import { utils } from './utils/utils'

export const App: FC<IApp> = memo(({ data }) => {
      const [viewQuestionId, setViewQuestionId] = useState<number>(0)
      const [viewAnswer, setViewAnswer] = useState<boolean>(false)
      const [alreadyArr, setAlreadyArr] = useState<number[]>([])
      const [isDisabled, setIsDisabled] = useState<boolean>(false)
      const filteredQuestions = data.filter((el) => el.id === viewQuestionId)
      const getRandomQuest = () => {
            setTimeout(() => {
                  const randomId = utils.getRandomId(alreadyArr, data, setAlreadyArr)
                  setViewQuestionId(randomId)
                  setViewAnswer(false)
                  setIsDisabled(false)
            }, 1500)
      }
      const onClickHandler = () => {
            setIsDisabled(true)
            getRandomQuest()
      }

      return (
            <div>
                  <div>
                        {viewQuestionId === 0 ? (
                              <h1>Hello, let's try to check your knowledge</h1>
                        ) : (
                              <div>{filteredQuestions[0].question}</div>
                        )}
                        {alreadyArr.length > 0 && (
                              <button disabled={viewAnswer} onClick={() => setViewAnswer(true)}>
                                    Show answer
                              </button>
                        )}
                  </div>
                  {viewQuestionId !== 0 ? (
                        <button disabled={isDisabled} onClick={onClickHandler}>
                              Next question
                        </button>
                  ) : (
                        <button onClick={onClickHandler}>Get Started</button>
                  )}
                  <div>{viewAnswer && filteredQuestions[0].answer}</div>
            </div>
      )
})
interface IApp {
      data: DataType
}
