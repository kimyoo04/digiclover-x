const docukind = {
  mou: function (companyName1, contractorName1, companyName2, contractorName2) {
    return `form.writing(method="post" action="/writing") 
                .title 
                    span ${companyName1} & ${companyName2} MOU협약서
                .describe 
                    span ${companyName1}와(과) ${companyName2} (${companyName1} 책임자; : ${contractorName1}, ${companyName2} 책임자 : ${contractorName2}) 는 다음과 같이 업무 제휴 협약을 체결한다.
                .contractor 
                    span 
                .provision
                    span 제 1조 (목적)
                    input(type="textarea" name="content")
                .provision
                    span 제 2조 (연구 / 기술 협력)
                    input(type="textarea" name="content")
                .provision
                    span 제 3조 (비밀유지)
                    input(type="textarea" name="content")
                .provision
                    span 제 4조 (항의 이행)
                    input(type="textarea" name="content")
    `;
  },
  contract() {},
};

module.exports = docukind;
