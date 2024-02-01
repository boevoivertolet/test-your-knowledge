import { FC, memo, useState } from 'react'
import styles from './App.module.css'
import { Greetings } from './Greetings'
import { DataType } from './data/data'
import { utils } from './utils/utils'
export const App: FC<IApp> = memo(({ data }) => {
      const [fade, setFade] = useState(false)
      // const [initialized, setInitialized] = useState(false)
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
            setFade(false)
            getRandomQuest()
      }
      useState(() => {
            setTimeout(() => {
                  setFade(true)
            }, 1000)
      })

      return (
            <div className={styles.app_wrapper}>
                  {viewQuestionId === 0 && (
                        <div
                              className={
                                    fade ? `${styles.greetings_wrapper + ' ' + styles.view}` : styles.greetings_wrapper
                              }
                        >
                              <Greetings viewQuestionId={viewQuestionId} />
                              {viewQuestionId === 0 && (
                                    <button className={styles.btn} disabled={isDisabled} onClick={onClickHandler}>
                                          Начать проверку знаний
                                    </button>
                              )}
                        </div>
                  )}
                  {alreadyArr.length > 0 && (
                        <div className={styles.question_answer_block}>
                              {viewQuestionId !== 0 && (
                                    <div className={styles.question}>{filteredQuestions[0].question}</div>
                              )}

                              {viewAnswer && <div className={styles.answer}>{filteredQuestions[0].answer}</div>}
                        </div>
                  )}
                  {viewQuestionId !== 0 && (
                        <div className={styles.btn_block}>
                              {alreadyArr.length > 0 && (
                                    <button
                                          className={styles.btn}
                                          disabled={viewAnswer}
                                          onClick={() => setViewAnswer(true)}
                                    >
                                          Показать ответ
                                    </button>
                              )}

                              {viewQuestionId !== 0 && (
                                    <button className={styles.btn} disabled={isDisabled} onClick={onClickHandler}>
                                          Следующий вопрос
                                    </button>
                              )}
                        </div>
                  )}
            </div>
      )
})
interface IApp {
      data: DataType
}
