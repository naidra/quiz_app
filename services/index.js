import axios from "axios"

export default class Questions {
    // process.env variables didn't work in now when deployed
    getQuestionCategories = () => axios.get("https://opentdb.com/api_category.php") // process.env.QUESTIONS_CATEGORIES)

    getQuestions = (categoryId, difficulty) => axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`)
}