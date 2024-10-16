import { getAllquestionbyid,getAllQuiz } from "../services/api.js";

const app = {
    renderListQuiz: async function(){
        const data = await getAllQuiz();
        // console.log(data);
        const listQuiz = data?.map((item,index)=>{ // lấy ra danh sách câu hỏi
                    return`
                        <a href="#" data-id="${item.id}" class="quiz-items list-group-item list-group-item-action list-group-item-primary">
                    ${item.title} : ${item.description}
                </a>
                    `
        }).join("");
        // console.log(listQuiz);
        const listQuizElement = document.getElementById("list_quiz"); // đổ ra html qua id 
        listQuizElement.innerHTML  = listQuiz;
        this.handleClickQuiz();
        
    },
    handleClickQuiz:  function() {
                const quizItems = document.querySelectorAll(".quiz-items");
                quizItems.forEach((item)=>{
                    item.addEventListener('click',()=>{
                        const title = item.textContent;
                        if(window.confirm(`Xac Nhan Lam Quiz:${title}`)){
                            const id = item.getAttribute("data-id")
                            window.location = `question.html?id=${id}`
                        }
                    })
                })
   
                
    },
    
    start: function(){
        this.renderListQuiz();
        
        
    }
}
app.start();
