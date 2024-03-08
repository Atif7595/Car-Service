$(".addAnswer").click(function() {
    var html = `
<div class="row">
    <input type="hidden" class="isCorrect1" name="isCorrect1" >
    <div class="col mb-1 answers" style="display: flex; align-items: center;">
        <input type="radio" class="isCorrect" name="isCorrect"  />
        <input type="text" id="answer" name="answers[]" class="form-control" placeholder="Enter Answer"  />
        <button class="btn btn-danger removeDiv">Delete</button>
    </div>
</div>`
    if ($(".answers").length > 4) {

        $(".alert").text('You  Can Add 6 Answer');
        setTimeout(function() {
            $(".alert").text("");
        }, 2000);

    } else {
        $(".questionFeild:last").after(html);
    }
});
$("#addQA").submit(function(e) {
    e.preventDefault();
    if ($(".answers").length < 2) {
        $(".alert").text('Please Add Atleast Two Answer');
        setTimeout(function() {
            $(".alert").text("");
        }, 2000);
    } else {
        var checkIsCorrect = false;
        for (let i = 0; i < $(".isCorrect").length; i++) {
            if ($(".isCorrect:eq(" + i + ")").prop('checked') == true) {
                checkIsCorrect = true;
                $(".isCorrect1").val($(".isCorrect:eq(" + i + ")").siblings('input').val());
            }
        }
        if (checkIsCorrect) {

            var formData = $(this).serialize();
            const url = window.location.origin + '/add-question-answer'
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: function(response) {
                    if (response.success == true) {
                        location.reload();
                    } else {
                        alert(response.message);
                    }
                }

            });
        } else {
            $(".alert").text('Please Select Correct Answer');
            setTimeout(function() {
                $(".alert").text('');
            }, 2000);

        }



    }
});



//Answer Get
$(".answerGet").click(function() {
    var Id = $(this).attr('data-id');
    const url = window.location.origin + '/get-answers/' + Id;
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            let html = ''; // Initialize the variable outside the loop
            for (let i = 0; i < response.data.answers.length; i++) {
                let isCorrect = 'NO';
                if (response.data.answers[i].is_correct == 1) {
                    isCorrect = 'YES';
                }
                html += `<tr>
                     <td>` + (i + 1) + `</td>
                     <td>` + response.data.answers[i].name + `</td>
                     <td>` + isCorrect + `</td>
                </tr>
                `
            }
            $(".checkeddddd").html(html);

        }



    });
})

//Update Question Answers

$("#editQA").submit(function(e){
    e.preventDefault();
    if ($(".editAnswerRemove").length < 2) {
        $(".alert").text('Please Add Atleast Two Answer');
        setTimeout(function() {
            $(".alert").text("");
        }, 2000);
    } else {
        var checkIsCorrect = false;
        for (let i = 0; i < $(".isCorrectEdit").length; i++) {
            if ($(".isCorrectEdit:eq(" + i + ")").prop('checked') == true) {
                checkIsCorrect = true;
                $(".isCorrectEdit1").val($(".isCorrectEdit:eq(" + i + ")").siblings('input').val());
            }
        }
        if (checkIsCorrect) {
            var formData= $(this).serialize();
            const url= window.location.origin +'/update-question-answer'
            $.ajax({
                url:url,
                type:"POST",
                data:formData,
                success:function(response){
                   if(response.success== true){
                    location.reload();
                   }
                   else{
                    alert(response.message);
                   }
                }

            });


        }
        else {
            $(".alert").text('Please Select Correct Answer');
            setTimeout(function() {
                $(".alert").text('');
            }, 2000);

        }



    }



});



$(".editAnswerAdd").click(function() {
    var html = `
    <div class="row editAnswerRemove">
                <input type="hidden" class="isCorrectEdit1" name="isCorrectEdit1" >
                <div class="col mb-1 answersEdit" style="display: flex; align-items: center;">
                    <input type="radio" class="isCorrectEdit" name="isCorrectEdit"  />
                    <input type="text" id="answersEdit" name="newAnswer[]" class="form-control" placeholder="Enter Answer"  />
                    <button class="btn btn-danger removeDivEdit">Delete</button>
                </div>
            </div>`
    if ($(".editAnswerRemove").length > 5) {

        $(".alert").text('You  Can Add 6 Answer');
        setTimeout(function() {
            $(".alert").text("");
        }, 2000);

    } else {
        $(".editQafield:last").after(html);
    }
});


$(".editQAButton").click(function() {
        var Id = $(this).attr('data-id');
        const url = window.location.origin + '/get-answers/' + Id;
        $.ajax({
            url: url,
            type: "GET",
            success: function(response) {
                console.log(response);
                if (response.success == true) {
                    $("#questionUpdateName").val(response.data.name);
                    $("#questionID").val(response.data.id);
                    $(".editAnswerRemove").remove();
                    let html = '';
                    for (let i = 0; i < response.data.answers.length; i++) {
                        let isCorrect = (response.data.answers[i].is_correct == 1) ? 'Checked' : '';

                        html += `<div class="row editAnswerRemove">
                <input type="hidden" class="isCorrectEdit1"  name="isCorrectEdit1" >
                <div class="col mb-1 answersEdit" style="display: flex; align-items: center;">
                    <input type="radio" class="isCorrectEdit"  name="isCorrectEdit" `+isCorrect+` />
                    <input type="text" id="answersEdit" name="answersEdit[`+response.data.answers[i].id+`]" value="`+response.data.answers[i].name+`" class="form-control" placeholder="Enter Answer"  />
                    <button class="btn btn-danger removeDivEdit DeleteAnswer" data-id="`+response.data.answers[i].id+`">Delete</button>
                </div>
            </div>`
                    }
                    $(".editQafield:last").after(html);

                } else {
                    alert(response.message);
                }
            }

        });


});
$(document).on("click", ".DeleteAnswer", function() {
    var id=$(this).attr('data-id');
    const url= window.location.origin +'/delete-answer/'+id;
    $.ajax({
        url: url,
        type: "GET",
        success:function(response){
            if(response.success == true){
                alert(response.message);
            }

        }

    });
});

//Delete QA

$(".deleteQA").click(function(){
    var id= $(this).attr('data-id');
    $("#QAdDelete").val(id);
})

$("#deleteQAId").submit(function(e){
    e.preventDefault();
    var formData= $(this).serialize();
    const url= window.location.origin + '/delete-qa'
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success:function(response){
            if(response.success== true){
             location.reload();
            }else{
                alert(response.message);
            }

        }

    });
});

$(document).ready(function() {
    // Your existing code here

//import Qa
$("#importQaForm").submit(function(e){
    e.preventDefault();
    let fileUpload = $("#fileUpload")[0];
    console.log(fileUpload.files[0]);
    let formData = new FormData();
    formData.append("file", fileUpload.files[0]);
    const url= window.location.origin + '/import-qa'
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': csrfToken,
        }
    });
        $.ajax({
            url:url,
            type:"POST",
            data:formData,
            contentType:false,
            processData:false,
            success:function(response){
             if(response.success == true){
                window.location.reload()

              }else{
                alert(response.message);
              }

            }
        });

});
});


$(document).on("click", ".removeDivEdit", function() {
    $(this).closest('.editAnswerRemove').remove();

});
$(document).on("click", ".removeDiv", function() {
    $(this).closest('.answers').remove();

});

