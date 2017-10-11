<script>
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "./videoList.txt",
        dataType: "text",
        success: function(data) {alert(data)}
     });
})
</script>