//Add Exam ajax
$("#addExam").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    const url = window.location.origin + '/add-exam'
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        success: function(response) {
            if (response.success == true) {
                location.reload();
            } else {
                alert(response.message);
            }
        }
    });

});
//Edit Exam
$(".editExamButton").click(function() {
    var id = $(this).attr('data-id');
    const url = window.location.origin + '/get-exam-data/' + id;
    $.ajax({
        type: "GET",
        url: url,
        data: id,
        success: function(response) {
            if (response.success == true) {
                $("#idEdit").val(response.data.id);
                $("#examNameEdit").val(response.data.name);
                $("#dateEdit").val(response.data.date);
                $("#examSubjectEdit").val(response.data.subject.id);
                $("#timeEdit").val(response.data.time);
                $("#attemptEdit").val(response.data.attempt);
            } else {
                alert(response.message)
            }

        }
    });
});
$("#editExam").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    const url = window.location.origin + '/edit-exam';
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        success: function(response) {
            if (response.success == true) {
                location.reload();
            } else {
                alert(response.message);
            }
        }
    });
});
//Delete Exam
$(".deleteExam").click(function() {
    var id = $(this).attr('data-id');
    $("#examIdDelete").val(id);
});

$("#deleteExamId").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    const url = window.location.origin + '/delete-exam';
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        success: function(response) {
            if (response.success == true) {
                location.reload();
            } else {
                alert(response.message);
            }

        }
    });

});
