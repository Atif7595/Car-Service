$(document).ready(function () {

    // Function to handle AJAX requests
    const baseUrl= window.location.origin;
    function handleAjaxRequest(url,type,data, succesCallBack){
        $.ajax({
            url: baseUrl+url,
            data:data,
            type:type,
            success:function(response){
                if(response.success == true){
                    location.reload();
                }
                else{
                    alert(response.message);
                }
                if(succesCallBack){
                    succesCallBack(response);
                }
            }

        });

    }

    //Create Student

    $("#addstudent").submit(function(e){
        $(".AddButton").prop('disable', true);

        e.preventDefault();
        handleAjaxRequest('/student-store','POST',$(this).serialize());
    })

    //Edit Student
    $(document).on("click", ".editstudent",function(){
            $("#studentEditId").val($(this).attr('data-id'));
            $("#editName").val($(this).attr('data-name'));
            $("#editEmail").val($(this).attr('data-email'));
       });

       $("#editstudent").submit(function(e){
        $(".updateButton").prop('disable', true);
        e.preventDefault();
        handleAjaxRequest('/student-update',"POST",$(this).serialize());

       });
       $(document).on("click", ".deleteStudent",function(){
        $("#studentIdDelete").val($(this).attr('data-id'));
       } );
       $("#deletestudentId").submit(function(e){

        e.preventDefault();
        handleAjaxRequest('/student-delete',"POST",$(this).serialize());
       });
});
