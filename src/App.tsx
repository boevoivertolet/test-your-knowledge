import React, { FC, memo, useState } from 'react'
import { DataType } from './data/data'
import { utils } from './utils/utils'
import styles from './App.module.css'
import { Greetings } from './Greetings'
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
            <div className={styles.app_wrapper}>
                  {viewQuestionId !== 0 && <div className={styles.question}>{filteredQuestions[0].question}</div>}
                  <div className={styles.greetings_wrapper}>
                        <Greetings viewQuestionId={viewQuestionId} />
                  </div>
                  <div className={styles.answer}>{viewAnswer && filteredQuestions[0].answer}</div>
                  <div>
                        {alreadyArr.length > 0 && (
                              <button className={styles.btn} disabled={isDisabled} onClick={() => setViewAnswer(true)}>
                                    Показать ответ
                              </button>
                        )}

                        {viewQuestionId !== 0 ? (
                              <button className={styles.btn} disabled={isDisabled} onClick={onClickHandler}>
                                    Следующий вопрос
                              </button>
                        ) : (
                              <button className={styles.btn} disabled={isDisabled} onClick={onClickHandler}>
                                    Начать проверку знаний
                              </button>
                        )}
                  </div>
            </div>
      )
})
interface IApp {
      data: DataType
}
