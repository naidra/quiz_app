import axios from "axios"

export default class Questions {
    getQuestionCategories = () => axios.get(process.env.QUESTIONS_CATEGORIES)

    getQuestions = (categoryId, difficulty) => axios.get(`${process.env.QUESTIONS_ENDPOINT}${categoryId}&difficulty=${difficulty}`)
}