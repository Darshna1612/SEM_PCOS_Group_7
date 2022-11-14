const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const nodeCmd = require('node-cmd');


var router = express.Router();


router.route('/:format/:type')
.post((req,res,next)=>{

    fs.readFile('../static/document.tex','utf-8',function(err,data){
        if(err)next(err);
        data = data.replace(/<!--courseNO-->/g, req.body.courseNo);
        data = data.replace(/<!--courseName-->/g, req.body.courseName);
        data = data.replace(/<!--courseDate-->/g, req.body.courseDate);
        data = data.replace(/<!--examiners-->/g, req.body.examiners);
        data = data.replace(/<!--fileName-->/g, req.body.fileName);
        let question = '';
        if(req.params.type=='1')question = replaceQuestion(data, req.body.questions)
        if(req.params.type=='2')question = replaceQuestionWithCriteria(data, req.body.questions)
        
        data = data.replace(/<!--Questions-->/g, question);

        let path = '../static/'+req.body.fileName+'.tex';
        fs.writeFile(path,data,function(err){
            
            let command = 'pdflatex --output-directory=../static '+path;
            nodeCmd.get(command,()=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json();
            });
            
        })
    
    })
 
})


var replaceQuestion = function(data, questions){
    let template = `
        \\textbf{Question <!--index-->}

        <!--title-->
        \\begin{enumerate}
            <!--subTemplate-->
        \\end{enumerate}
        ~\\\\
    `
    let subTemplate =`
        \\item[<!--index-->) ]<!--question-->
        \\begin{flushright}
            \\textbf{[<!--mark--> marks]}
        \\end{flushright}
    `
    let index = 1;
    let items =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    let res = '';
    for(let question of questions){
        let temp = template;
        let subRes = '';
        temp = temp.replace(/<!--title-->/g, question.title);
        temp = temp.replace(/<!--index-->/g, index);
        for(let i=0; i<question.subquestion.length; i++){
           let sub = subTemplate;
           sub = sub.replace(/<!--index-->/g,items[i]);
           sub = sub.replace(/<!--question-->/g,question.subquestion[i].question);
           sub = sub.replace(/<!--mark-->/g,question.subquestion[i].grade);
           subRes+=sub;
        }
        temp = temp.replace(/<!--subTemplate-->/g,subRes);
        res+=temp;
        index++;
    }

    return res;
}




var replaceQuestionWithCriteria = function(data, questions){
    let template = `
        \\textbf{Question <!--index-->}

        <!--title-->
        \\begin{enumerate}
            <!--subTemplate-->
        \\end{enumerate}
        ~\\\\
    `
    let subTemplate =`
        \\item[<!--index-->) ]<!--question-->
        \\begin{flushright}
            \\textbf{[<!--mark--> marks]}
        \\end{flushright}

        \\textcolor{red}{\\textbf{Criteria:}}
    `

    let criteriaTemplate = `
        \\setlength{\\parindent}{2em}\\textcolor{red}{<!--index-->. <!--point--> ... ... \\textbf{[<!--mark--> marks]}}
    `
    let index = 1;
    let items =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    let res = '';
    for(let question of questions){
        let temp = template;
        let subRes = '';
        temp = temp.replace(/<!--title-->/g, question.title);
        temp = temp.replace(/<!--index-->/g, index);
        for(let i=0; i<question.subquestion.length; i++){
           let sub = subTemplate;
           sub = sub.replace(/<!--index-->/g,items[i]);
           sub = sub.replace(/<!--question-->/g,question.subquestion[i].question);
           sub = sub.replace(/<!--mark-->/g,question.subquestion[i].grade);
           subRes+=sub;

           
           if(!question.subquestion[i].criteria)continue;

           let criRes = '';
           for(let j=0; j<question.subquestion[i].criteria.length; j++){
                let cri = criteriaTemplate;
                cri = cri.replace(/<!--index-->/g, j+1);
                cri = cri.replace(/<!--point-->/g, question.subquestion[i].criteria[j].point);
                cri = cri.replace(/<!--mark-->/g, question.subquestion[i].criteria[j].mark);
                criRes += cri;
           }
           subRes += criRes;
        }
        temp = temp.replace(/<!--subTemplate-->/g,subRes);
        res+=temp;
        index++;
    }

    return res;
}



module.exports = router;