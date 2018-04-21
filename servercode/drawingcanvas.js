 var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;

    var timer;
    var reloadTime = 10;

    var numTimesRun = 1;
    var numDrawings = 3;

    var objectTypes = ["cat", "dog", "biscuit", "bottle"];
    
    function init(fsnum) {
        if (fsnum == "2"){
            canvas = document.getElementById('can');
        }
        else if (fsnum == "3"){
            canvas = document.getElementById('can2');
        }
        else{
            console.log("ERROR: Unknown fsnum passed to canvas init");
        }

        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
        var rect = canvas.getBoundingClientRect(),
            prevX = rect.left,
            prevY = rect.top;
            currX = rect.left;
            currY = rect.top;

        console.log("initialized prev = (" + prevX + "," + prevY + ") curr = ( " + currX + "," + currY + ")");

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);

        var rand = objectTypes[Math.floor(Math.random() * objectTypes.length)];
        // document.getElementById("instruction").innerHTML = "Draw a " + rand + "!";

        // timer = setInterval(saveAndNext, reloadTime*1000);
        // startTimer(reloadTime, document.querySelector('#time'))

        countUpTimer(fsnum);
    }

    function saveAndNext(){
        numTimesRun += 1;
        // alert('Num times run = ' + numTimesRun + " numDrawings = " + numDrawings);
        if (numDrawings === numTimesRun){
            clearInterval(timer);
        }
        save();
        erase();
        startTimer(reloadTime, document.querySelector('#time'));
    }

    
    function color(obj) {
        switch (obj.id) {
            case "green":
                x = "green";
                break;
            case "blue":
                x = "blue";
                break;
            case "red":
                x = "red";
                break;
            case "yellow":
                x = "yellow";
                break;
            case "orange":
                x = "orange";
                break;
            case "black":
                x = "black";
                break;
            case "white":
                x = "white";
                break;
        }
        if (x == "white") y = 14;
        else y = 2;
    
    }
    
    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    
    function erase() {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
    
    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";

        document.getElementById('hiddenimg').value = dataURL;
        document.forms["imgdata"].submit();
        // submitForm();
    }
    
    function submitForm(){
        console.log("submitForm() called. canvas.toDataURL = " + canvas.toDataURL());
        // $('#breaktheicefs').submit(function(e){
        //     console.log("inside submit anon function");
        //     e.preventDefault();
        //     $.ajax({
        //         url:'/multi-step-2/save_img.php',
        //         type:'post',
        //         // data:$('#imgdata').serialize(),
        //         // data:$('#hiddenimg').serialize(),
        //         data:canvas.toDataURL(),
        //         success:function(){
        //             //whatever you wanna do after the form is successfully submitted
        //         }
        //     });
        // });
        $.post('/multi-step-2/save_img.php', {hiddenimg: canvas.toDataURL()});
    }


    function findxy(res, e) {
        if (res == 'down') {
            console.log("BEFORE DOWN prev = (" + prevX + "," + prevY + ") curr = (" + currX + "," + currY + ")");
            prevX = currX;
            prevY = currY;
            // currX = e.clientX - canvas.offsetLeft;
            // currY = e.clientY - canvas.offsetTop;

            var rect = canvas.getBoundingClientRect();
                currX = e.clientX - rect.left;
                currY = e.clientY - rect.top;
    
             console.log("DOWN prev = (" + prevX + "," + prevY + ") curr = (" + currX + "," + currY + ")" );

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                // currX = e.clientX - canvas.offsetLeft;
                // currY = e.clientY - canvas.offsetTop;

                var rect = canvas.getBoundingClientRect();
                    currX = e.clientX - rect.left;
                    currY = e.clientY - rect.top;

                console.log("MOVE prev = (" + prevX + "," + prevY + ") curr = (" + currX + "," + currY + ")" );

                draw();
            }
        }
    }

    function startTimer(duration, display) {
        // var timer = duration, minutes, seconds;
        // setInterval(function () {
        //     minutes = parseInt(timer / 60, 10)
        //     seconds = parseInt(timer % 60, 10);

        //     minutes = minutes < 10 ? "0" + minutes : minutes;
        //     seconds = seconds < 10 ? "0" + seconds : seconds;

        //     display.textContent = minutes + ":" + seconds;

        //     if (--timer < 0) {
        //         timer = duration;
        //     }
        // }, 1000);
    }

    function countUpTimer(fsnum){
        var sec = 0;
        // function pad ( val ) { return val > 9 ? val : "0" + val; }

        if (fsnum == "2"){
             setInterval( function(){

                 document.getElementById("timetaken2").value = ++sec;
                 // document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
            }, 1000);    
        }
        else if (fsnum == "3"){
             setInterval( function(){

                 document.getElementById("timetaken3").value = ++sec;
                 // document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
            }, 1000);
        }
        else{
            console.log("ERROR: unknown fsnum in countUpTimer");
        }
        
    }
