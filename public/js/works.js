$(function() {
    // get data
    $.ajax({
        type: "get",
        dataType: "JSON",
        url: "./public/data/works.json",
        success: function(response) {
            var i,
                url,
                len = response.length;

            for (i = 0; i < len; i++) {
                url = response[i].project + "/" + response[i].page[0].name;
                $(".list li").eq(i).find("a").attr("href", url);
            }

            ws.newFrame(response);
        },
        error: function(){
            alert("Oh, something wrong, please try again later...");
        }
    });
});

var ws = {
    /**
     * set iframe height
     * @param  {string} id: iframe id
     */
    setFrameH: function() {
        var h = $("#frameBar").outerHeight() + 4;

        $("#frame").height($(window).height() - h);
    },

    /**
     * create new iframe and bar
     * @param  {array} data
     */
    newFrame: function(data) {
        var html = "",
            optList = "",
            url,
            $listLi = $(".list li");

        $(".list a").click(function(e) {
            e.preventDefault();
        });

        $listLi.click(function() {
            var $this = $(this),
                idx = parseInt($listLi.index($this)),
                i,
                len = data[idx].page.length;

            // clean html
            html = "";
            // clean optList
            optList = "";
            url = $("a", this).attr("href");
            frameUrl = $("#frame").attr("src");
            title = $("h3", this).text();

            // generate select option list
            for (i = 0; i < len; i++) {
                optList += "<option value='" + data[idx].project + "/" + data[idx].page[i].name + "'>" + data[idx].page[i].title + "</option>";
            }

            // generate frameBar and iframe
            if ($("#frame").length === 0) {
                // if no iframe, create new one
                html = "<div id='frameBar' class='frameBar clearfix'>";
                html += "<div id='pageList' class='pageList fr'>想看哪个页面就看哪个： <select>" + optList + "</select></div><h2>" + title + "</h2><a class='btn fl' id='back' href=''>Back to List</a>";
                html += "</div>";
                html += "<iframe id='frame' src='" + url + "' style='width:100%' frameborder='0'></iframe>";

                $("body").append(html);
            } else {
                // if have iframe, just update it
                $("#pageList select").html(optList);
                $("#frame").attr("src", url);
            }

            $("#main").hide();
            $("#frame, #frameBar").show();
            // set iframe height 
            ws.setFrameH();
        });

        // hide frameBar and iframe
        $(document).on("click", "#back", function(e) {
            $("#frame, #frameBar").hide();
            $("#main").show();
            // clean iframe
            $("#frame").attr("src", "");
            e.preventDefault();
        });

        // get value by select changed
        $(document).on("change", "#pageList select", function() {
            var slctedVal = $(this).val();

            $("#frame").attr("src", slctedVal);
            // set iframe height 
            ws.setFrameH();
        });

    }
}
