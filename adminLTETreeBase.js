var htmlStr = "";

var htmlStr2 = '<li class="header">LABELS</li>'
    + '<li> <a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>'
    + '<li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>'
    + '<li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>';
$(function () {
    $.ajax({
        url: '/Home/GetTree',
        type: 'get',
        success: function (res) {
            console.log(res)
            Tree(0, res);
            //$("#Menu").append(htmlStr);
            $("#Menu").append(htmlStr2);
        },

    })
})

function Tree(pid, arr) {
    var childdata = GetData(pid, arr);
    console.log(childdata)
    for (var i = 0; i < childdata.length; i++) {

        if (childdata[i].pid == 0) {
            if (childdata.length > 0) {


                var list = GetData(childdata[i].id, arr);
                if (list.length == 0) {
                    htmlStr += '<li class="treeview">'
                        + '<a href="/home/index">'
                        + '<i class="fa fa-circle-o"></i> <span>' + childdata[i].name + '</span>'
                        + ' </a>'
                    Tree(childdata[i].id, arr);
                    + ' </li>'
                }
                else {

                    htmlStr += '<li class="treeview">'
                        + ' <a href="#">'
                        + '<i class="fa fa-circle-o"></i><span>' + childdata[i].name + '</span>'
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
                htmlStr += '<li class="treeview">'
                    + '<a href="/home/index">'
                    + '<i class="fa fa-circle-o"></i> <span>' + childdata[i].name + '</span>'
                    + ' </a>'
                Tree(childdata[i].id, arr);
                + ' </li>'
            }
            else {

                htmlStr += '<li class="treeview">'
                    + ' <a href="#">'
                    + '<i class="fa fa-circle-o"></i><span>' + childdata[i].name + '</span>'
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