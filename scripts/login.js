$(document).ready(function () {
    $("#submit").click(function () {
        if ($("#username").val() == "admin" && $("#password").val() == "admin" ) {
            
                $("#update").attr("href", "index.html")
            
        }
    })
})