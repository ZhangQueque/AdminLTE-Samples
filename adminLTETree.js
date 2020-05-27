var htmlStr = "";

var htmlStr2 = '<li class="header">LABELS</li>'
    + '<li> <a href="#"><i class="fa fa-circle-o text-red"></i> <span>关于我们</span></a></li>'
    + '<li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>立即联系</span></a></li>'
    + '<li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>BossTeam</span></a></li>';

//初始化用户信息
$(function () {
    var token = $.cookie("token");
 
    $.ajax({
        url: baseUrl +'/api/employees',
        type: 'get',
        headers: { "Authorization": "Bearer " + token},
        success: function (res) {
             $("#UserImgHeaderNav1").attr("src", res.headImage);
            $("#UserImgHeaderNav2").attr("src", res.headImage);
            $("#UserNameHeaderNav1").text(res.name);
            $("#UserNameHeaderNav2").text(res.name);
            $("#UserImgSidebar").attr("src", res.headImage);
            $("#UserNameSidebar").text(res.name);
          

            Tree(0, res.permissions); //传入父ID，和权限集合
            $("#Menu").append(htmlStr);
            $("#Menu").append(htmlStr2);
        },

    }).fail(function () {
        layer.msg("身份认证已过期！", { icon: 2 }, function () {
            location.href = "/Home/Login";
        });
    })
})

function Tree(pid, arr) {
    var childdata = GetData(pid, arr);
    for (var i = 0; i < childdata.length; i++) {
        
        var classValue = $("#Active").text() == childdata[i].name ? "active" : "";
         
        if (childdata[i].pid == 0) {
            if (childdata.length > 0) {


                var list = GetData(childdata[i].id, arr);
                if (list.length == 0) {
                    htmlStr += '<li class="treeview ' + classValue+'">'
                        + '<a href="' + childdata[i].url + '?active=' + childdata[i].activeName+'">'
                        + '<i class="' + childdata[i].icon+'"></i> <span>' + childdata[i].name + '</span>'
                        + ' </a>'
                    Tree(childdata[i].id, arr);
                    + ' </li>'
                }
                else {

                    htmlStr += '<li class="treeview  ' + classValue +'">'
                        + ' <a href="#?active=' + childdata[i].activeName +'">'
                        + '<i class="' + childdata[i].icon +'"></i><span>' + childdata[i].name + '</span>'
                        + ' <i class="fa fa-angle-left pull-right"></i>'
                        + ' </a>'
                        + '<ul class="treeview-menu">'
                    Tree(childdata[i].id, arr);
                    + '</ul>'
                        + ' </li>'
                }

            }
            $("#Menu").append(htmlStr);
            htmlStr = "";
            continue;
        }


        if (childdata.length > 0) {


            var list = GetData(childdata[i].id, arr);
            if (list.length == 0) {
                htmlStr += '<li class="treeview   ' + classValue +'">'
                    + '<a href="' + childdata[i].url + '?active=' + childdata[i].activeName +'">'
                    + '<i class="' + childdata[i].icon +'"></i> <span>' + childdata[i].name + '</span>'
                    + ' </a>'
                Tree(childdata[i].id, arr);
                + ' </li>'
            }
            else {

                htmlStr += '<li class="treeview    ' + classValue +'">'
                    + ' <a href="#?active=' + childdata[i].activeName +'">'
                    + '<i class="' + childdata[i].icon +'"></i><span>' + childdata[i].name + '</span>'
                    + ' <i class="fa fa-angle-left pull-right"></i>'
                    + ' </a>'
                    + '<ul class="treeview-menu">'

                Tree(childdata[i].id, arr);

                + '</ul>'
                    + ' </li>'

            }

        }
    }
}

function GetData(pid, arr) {
    var arry = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].pid == pid) {
            arry.push(arr[i]);
        }
    }
    return arry;
}

$(document).on("click", ".sidebar-menu li a", function (e) {
    var firstParent = $(this).parent("li");
    var firstChildUl = $(this).next("ul");
    if (firstParent.hasClass("menu-open")) {
        firstParent.removeClass("menu-open");
        firstChildUl.hide();
    } else {
        firstParent.addClass("menu-open");
        firstChildUl.show();
    }
});