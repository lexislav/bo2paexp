/**
 * Created by hotovec on 22.9.2014.
 */
$(function () {

    var pb = $("#drg-progress-bar");
    var barBg = pb.find(".m-progress-bar--bar-bg");
    var bar = pb.find(".m-progress-bar--bar");

    var dataHolders = pb.find(".data-item");
    var minStamp = 10000000000000000000000000;
    var maxStamp = 0;
    var difStamp = 0;

    var maxWidthOfBar = 5000;
    var dataItems = Array();

    // calculate bounds and offsets
    dataHolders.each(function () {
        var iHolder = $(this);
        var iStamp = iHolder.data("stamp");
        var iCorrection = iHolder.data("correction");

        if (iStamp != null) {
            //console.log("s: " + iStamp);
            minStamp = Math.min(minStamp, iStamp);
            maxStamp = Math.max(maxStamp, iStamp);

            var dataItem = {
                holder: iHolder,
                stamp: iStamp,
                correction: iCorrection,
                offset: 0
            };
            dataItems.push(dataItem);
        }
    });

    // create offsets
    var idx = 0;
    var perc = (maxStamp - minStamp) / 100;
    var ts = (Math.round((new Date()).getTime() / 1000));
    var tsOffset = ((ts - minStamp) / perc) / 100;

    barBg.css("width", maxWidthOfBar);
    bar.css("width", maxWidthOfBar * tsOffset);


    dataItems.forEach(function() {
        var tPerc = ((dataItems[idx].stamp - minStamp) / perc) / 100;
        dataItems[idx].offset = tPerc;
        //console.log(idx + ": " + dataItems[idx].stamp + " %"+dataItems[idx].offset);
        dataItems[idx].holder.css("left", (maxWidthOfBar * dataItems[idx].offset) - 60 + dataItems[idx].correction); // 60 polovina šířky elementu
        idx++;
    });


    // make dragable
    pb.scrollLeft( maxWidthOfBar * tsOffset - (pb.width() / 2));

    var dbar = Draggable.create("#drg-progress-bar", {
        type: "scrollLeft",
        edgeResistance: .5,
        throwProps: true,
        bounds: "#drg-progress-bar-bounds",
        onThrowUpdate: function () {
            ///setPos(this.x);
        },
        onDrag: function () {
            //setPos(this.x);
        }
    });

    $("#drg-left").click(function() {
        TweenLite.to(pb, .3, {scrollLeft:  (pb.scrollLeft() - 300) });
        dbar[0].update(true);
    });
    $("#drg-right").click(function() {
        TweenLite.to(pb, .3, {scrollLeft:  (pb.scrollLeft() + 300) });
        dbar[0].update(true);
    });


});
