import { getAllquestionbyid, getQuizbyID } from "../services/api.js"
const btnSubmit = document.getElementById('btn_submit')
var isSubmit = false;
var renderQuestion = [];
var listAnswerSubmit = [];

const app = {
    getQuizandQuest: async function () {
        const searchPram = new URLSearchParams(window.location.search);
        if (searchPram.has('id')) {
            const id = searchPram.get('id');
            const dataquiz = await getQuizbyID(id); // lấy bộ quiz theo id
            document.getElementById("quiz_heading").innerHTML = dataquiz.title;
            document.getElementById("quiz_description").innerHTML = dataquiz.description;

            const dataquest = await getAllquestionbyid(id); // lấy ra câu hỏi theo id
            this.renderQuestion(dataquest);
        }
    },
    renderQuestion: function (list) {
        list = this.ramdom(list);
        const listQuest = list?.map((items, index) => {
            const listAnswers = this.renderAnswers(items.answers, items.type, items.id);
            return `
               <div class="question_item border border-2 rounded p-4 mb-2">
                   <h4 class="question_number">Câu Hỏi ${index + 1}</h4>
                   <h5 class="question_title">${items.questionTiltle}</h5>
                   <div class="answer_items mt-3">${listAnswers}</div>
               </div>
           `;
        }).join('');
        document.getElementById("question_container").innerHTML = listQuest;
    },
    renderAnswers: function (answers, type, idQuestion) {
        return answers?.map((items, index) => {
            return `
                 <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" 
                        type="${type == 1 ? 'radio' : 'checkbox'}" 
                        name="question_${idQuestion}" 
                        id="answer_${idQuestion}_${items.id}"
                        data-idquestion="${idQuestion}"
                        data-idanswer="${items.id}" >
                    <label class="form-check-label" for="answer_${idQuestion}_${items.id}" >
                        ${items.answerTitle}
                    </label>
                </div>
                `;
        }).join("");
    },
    ramdom: function (array) {
        return array.sort(() => Math.random() - Math.random());
    },
    submitAnswers: function () {
        btnSubmit.addEventListener('click', () => {
            if (confirm("Bạn có chắc chắn nộp bài?")) {
                isSubmit = true;
                this.disableSubmit();
            }
        });
    },
    disableSubmit: function () {
        btnSubmit.disabled = true; // Disable nút submit
        const inputAll = document.querySelectorAll("input");
        inputAll.forEach((item) => {
            item.disabled = true; // Disable tất cả các ô input khi đã nộp bài
        });
        this.checkAnswers(renderQuestion); // Kiểm tra đáp án sau khi nộp bài
    },
    checkAnswers: function (renderQuestion) {
        const checkResult = [];
        const listStatus = [];
        let countRight = 0;

        listAnswerSubmit.forEach((ansUser) => {
            const findQuestion = renderQuestion.find((ques) => ques.id == ansUser.idQuestion);
            const isCheck = this.checkEqual(ansUser.idAnswers, findQuestion.correctAnser);

            if (isCheck) {
                countRight++;
            }
            listStatus.push({
                idQuestion: findQuestion.id,
                status: isCheck
            });
        });

        this.renderStatus(listStatus);
        alert(`Bạn trả lời đúng ${countRight}/${renderQuestion.length}`);
    },
    renderStatus: function (listStatus) {
        listStatus.forEach((item) => {
            const title = document.getElementById(item.idQuestion);
            title.innerHTML = `${title.textContent} ${item.status ? `<span class="badge text-bg-success">Đúng</span>` : `<span class="badge text-bg-danger">Sai</span>`}`;
        });
    },
    start: function () {
        this.getQuizandQuest();
        this.submitAnswers();
    }
}
app.start();
