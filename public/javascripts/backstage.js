$(document).ready(function(){
    aClick();
    //listAdd();
    // delClick();
    // updClick();
});

function aClick(){
    $(".nav li").each(function(index){
        $(this).click(function(){
            var con = $("div.content");
            $(".active").removeClass("active");
            $(this).addClass("active");
            if(index==0){
                con.addClass("con_out");
                con.eq(0).removeClass("con_out");
            }else if(index==1){
                con.addClass("con_out");
                con.eq(1).removeClass("con_out");
            }
        })
    })
}

// function listAdd(){
//     var newsId = $("#newsId");
//     var newsTitle = $("#newsTitle").val();
//     var newsContent = $("#newsContent").val();
//     var tbody = $("#tbody");
//     $("#submit").click(function(){
//         console.log(newsId);
//         //var tr = $("<tr>").appendTo(tbody);
//         //$("<td>").text(newsId).appendTo(tr);
//         //$("<td>").text(newsTitle).appendTo(tr);
//         //$("<td>").text(newsContent).appendTo(tr);
//         //var td = $("<td>").appendTo(tr);
//         //$("<a>").addClass("delete").text("删除").appendTo(tr);
//         //$("<a>").addClass("update").text("修改").appendTo(tr);
//     })
// }

// function delClick(){
//     var del = $(".delete");
//     del.each(function(index){
//         $(this).click(function(){
//             var index1 = 1;     //delete
//             var newsId = $(".newsid").eq(index).text();
//             $.ajax({
//                 url:"mysql.php",
//                 type:"POST",
//                 data:{index: index1,newsId: newsId},
//                 dataType:"json",
//                 success:function(data){
//                     $(".delete").eq(index).parent().parent();
//                 },
//                 error:function(){
//                     console.log("请求失败");
//                 }
//             });
//         })
//     })
// }


// function updClick(){
//     var upd = $(".update");
//     upd.each(function(index){
//         $(this).click(function(){
//             var newsId = $(".newsId").eq(index).text();
//             var newsId2 = $("#_newsId");
//             var con = $("div.content");
//             con.addClass("con_out");
//             con.eq(2).removeClass("con_out");
//             newsId2.val(newsId);
//         })
//     })
// }



