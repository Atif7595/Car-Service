$(document).ready(function() {
    //Add Subject
    $("#addSubject").submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        const subjectCreateRoute = window.location.origin + '/add-subject';

        $.ajax({
            type: "POST",
            url: subjectCreateRoute,
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

    //Edit subject
    $('.editSubject').click(function() {
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        $("#subjectId").val(id);
        $("#subjectName").val(name);
    })
    $("#editSubject").submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        const subjectEditRoute = window.location.origin + '/edit-subject';


        $.ajax({
            type: "POST",
            url: subjectEditRoute,
            data: formData,
            success: function(response) {
                if (response.success == true) {
                    location.reload();
                } else
                    alert(response.message);
            }
        });

    })

    //delete Subject
    $('.deleteSubject').click(function() {
        var id = $(this).attr('data-id');
        $("#subjectIdDelete").val(id);
    });

    $("#deleteSubjectId").submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        const subjectDeleteRoute = window.location.origin + '/delete-subject';
        $.ajax({
            type: "POST",
            url: subjectDeleteRoute,
            data: formData,
            success: function(response) {
                if (response.success == true) {
                    location.reload();
                } else {
                    alert(response.message);
                }

            }
        });

    })


});
