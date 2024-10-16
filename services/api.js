export const getAllQuiz = async() =>{
    try {
        const res = await fetch('http://localhost:3000/quizs'); // goi data cua quiz 
        const data = await res.json();
        return data;
    }catch(error){
        alert("looi");
    }
}
export const getAllquestionbyid = async(quizId) =>{
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${quizId}`); // goi data cua cau hoi
        const data = await res.json();
        return data;
    }catch(error){
        alert("looi");
    }
}
export const getQuizbyID = async(id) =>{
    try {
        const res = await fetch(`http://localhost:3000/quizs/${id}`); // goi data cua cau hoi
        const data = await res.json();
        return data;
    }catch(error){
        alert("looi");
    }
}
