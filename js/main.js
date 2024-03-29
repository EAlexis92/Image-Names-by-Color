
let input = document.querySelector('input');
let cont = 0;
let length;
let image;
let create;
let imageNames = [];
let instances = 1;

input.addEventListener('change', function () {

    length = input.attributes[1].ownerElement.files.length;

    //console.log(length);

    for(let i = 0; i < length; i++) {

        image = document.querySelector('input').files[i];

        imageNames[i] = image.name;

        create = document.createElement("canvas");
        create.setAttribute('style', 'border:1px solid #000000;');
        create.setAttribute('id', 'myCanvas' + (instances));

        document.querySelector('.container').appendChild(create);

        let canvas = document.querySelector('#myCanvas' + (instances));
        let ctx = canvas.getContext("2d");

        instances++;

        function handleImage(file) {

            let reader = new FileReader();

            reader.onload = (e) => {

                let img = new Image();

                img.onload = function () {

					
					let x = 100

					canvas.width = x;
					canvas.height = x;
					
					ctx.drawImage(img, 0, 0, x, x);
                }

                img.src = e.target.result;
                //console.log(event.target);
            }

            reader.readAsDataURL(file);
        }

        handleImage(image);
    }
    cont++;
})

let dominant = [];
let avgGrey = [];

function read() {

    let canvas;
    let height;
    let width;
    let ctx;

    let cont4 = 0;

    //console.log(length);

    let element = document.getElementById("myprogressBar");
    let widthBar = 0;
    let progressNumber = 100;
    let k = 0;

    widthBar = (progressNumber / 4);


    element.setAttribute('style', 'width: ' + widthBar + '%');

    if (widthBar == 100) {

        alert('done');
    } else {
        widthBar = (progressNumber / 4);
        widthBar = widthBar * (k + 1);
        k++;
    }

    console.log(widthBar + 'hola');

    for(k = 0; k < length; k++) {

        console.log(length);

        let pixels = [];
        let cont2 = 0;

        canvas = document.querySelector('#myCanvas' + (k + 1));
		
		try{

        height = canvas.attributes.height.value;
        width = canvas.attributes.width.value;
		}
		catch{
			
			height = 0;
			width = 0;
		}
		
        ctx = canvas.getContext('2d');

        for(let j = 1; j <= height; j++) {

            for(let i = 1; i <= width; i++) {

                let imgData = ctx.getImageData(i, j, 1, 1);
                let red = imgData.data[0];
                let green = imgData.data[1];
                let blue = imgData.data[2];

                //alpha = imgData.data[3];
                //console.log(red + " " + green + " " + blue);

                var rgbToHex = function (rgb) {
                    var hex = Number(rgb).toString(16);
                    if (hex.length < 2) {
                        hex = "0" + hex;
                    }
                    return hex;
                };

                var fullColorHex = function(r,g,b) {
                    var red = rgbToHex(r);
                    var green = rgbToHex(g);
                    var blue = rgbToHex(b);

                    return  red + green + blue;
                };

                pixels[cont2] = fullColorHex(red, green, blue);
                cont2++;

                if(i == width && j == height) {
                    //console.log('My last pixel is in position: '+ i +" "+ j +' and my pixels in hexa are: '+ pixels);
                }
            }
        }

        //temp = Array.from(pixels);
        let cont = 0;
        let cont3 = 0;

        let temp = [];
        let repeatedColor = [];
        let colorName = [];

        for(let i = 0; i < pixels.length; i++) {

            let aux = true;
            let bool2 = true;
            let bool = true;

            for(let j = 0; j < pixels.length; j++) {

                if(pixels[j] == pixels[i]) {

                    cont++;

                    if(bool) {

                        colorName[cont3] = pixels[i];
                        bool = false;
                    }

                    if(!aux && bool2) {
                        pixels.splice(j, 1);
                        bool2 = false;
                    }

                    aux = false;
                }
            }
            repeatedColor[i] = cont;
            cont = 0;
            cont3++;
            bool = true;
        }

        let colors = colorName.sort((a, b) => b - a);

        let colorRed = [];
        let colorGreen = [];
        let colorBlue = [];

        for(let i = 0; i < colors.length; i++) {

            let stringColorRed = '';
            let stringColorGreen = '';
            let stringColorBlue = '';

            for(let j = 0; j < 6; j++) {

                (j < 2) ? stringColorRed += colors[i].charAt(j) : (j >= 2 && j < 4) ? stringColorGreen += colors[i].charAt(j) : (j >= 4 && j < 6) ? stringColorBlue += colors[i].charAt(j) : "";
                (j == 1) ? colorRed[i] = parseInt(Number("0x"+stringColorRed), 10) : (j == 3) ? colorGreen[i] = parseInt(Number("0x"+stringColorGreen), 10) : (j == 5) ? colorBlue[i] = parseInt(Number("0x"+stringColorBlue), 10) : "";
                //(j == 5) ? stringColorRGB = stringColorRed + ", " + stringColorGreen + ", " + stringColorBlue : "";
            }

            //rgbColors[i] = stringColorRGB;
        }

        console.log(colorRed);
        console.log(colorGreen);
        console.log(colorBlue);

        let contRed = 0;
        let contGreen = 0;
        let contBlue = 0;
        let contGrey = 0;
        let contBlack = 0;
        let contWhite = 0;
        let misc = 0;

        let x = 40;
        let y = 215;

        let stringTestRed = '';
        let stringTestGreen = '';
        let stringTestBlue = '';

        for(let i = 0; i < colorRed.length; i++) {

            let red = colorRed[i];
            let green = colorGreen[i];
            let blue = colorBlue[i];

            if((red > blue && red > green) && (red >= x && red <= y) /*&& green <= 30 || ((red >= 0 && red <= 220) && blue <= 30)*/) {

                stringTestRed += red + ", ";
                contRed++;
            }
            else if((green > red && green > blue) && (green >= x && green <= y) /*&& red <= 30 || ((green >= 0 && green <= 220) && blue <= 30)*/) {

                stringTestGreen += green + ", ";
                contGreen++;
            }
            else if((blue > red && blue > green) && (blue >= x && blue <= y) /*&& red <= 30 || ((blue >= 0 && blue <= 220) && green <= 30)*/) {

                stringTestBlue += blue + ", ";
                contBlue++;
                //console.log(blue+'hola');
            }
            else if(red == 128 && blue == 128 && green == 128) {
                contGrey++;
            }
            else if(red < x && green < x && blue < x) {
                contBlack++;
            }
            else if(red > y && green > y && blue > y) {
                contWhite++;
            }
            else{
                misc++;
            }
        }

        /*console.log(stringTestRed);
        console.log(stringTestGreen);
        console.log(stringTestBlue);*/

        console.log("Red: "+contRed);
        console.log("Green: "+contGreen);
        console.log("Blue: "+contBlue);
        console.log("Grey: " + contGrey);
        console.log("Black: "+contBlack);
        console.log("White: "+contWhite);
        console.log("Misc: "+misc);

        let getMax = [contRed, contGreen, contBlue, contGrey, contBlack, contWhite, misc];
        let max = Math.max(...getMax);

        let index = getMax.indexOf(max);

        let dominantColor = '';

        switch(index) {
            case 0: {
                dominantColor = 'Red';
                break;
            }
            case 1: {
                dominantColor = 'Green';
                break;
            }
            case 2: {
                dominantColor = 'Blue';
                break;
            }
            case 3: {
                dominantColor = 'Grey';
                break;
            }
            case 4: {
                dominantColor = 'Black';
                break;
            }
            case 5: {
                dominantColor = 'White';
                break;
            }
            default: {
                dominantColor = 'Misc';
                break;
            }
        }

        getMax.splice(index, 1);

        let sum = getMax.reduce((a, b) => a + b, 0);

        console.log('sum ' + sum);
        console.log('max ' + max);

        let avg = (sum / (sum + max)).toFixed(2);
        dominant[k] = (1 - avg).toFixed(2);

        console.log(dominant[k]);

        avgGrey[k] = (contGrey / (sum + max)).toFixed(2);

        console.log("Picture is: " + (k + 1));

        if(dominantColor == "Grey" || avgGrey[k] > 0.025) {

            if (avgGrey[k] > 0.025) {
                console.log("Grey is " + avgGrey[k]);
            } else {
                console.log("cut out")
                imageNames.splice(k - cont4, 1)
                cont4++;
            }
        }
        else if(dominantColor == 'Misc') {

            if (dominant[k] > 1) {
                console.log("Misc is " + dominantColor + " " + dominant[k]);
            } else {
                console.log("cut out")
                imageNames.splice(k - cont4, 1)
                cont4++;
            }
        }
        else{

            if (dominant[k] > 1) {
                console.log("Dominant color is " + dominantColor + " " + dominant[k]);
            } else {
                console.log("cut out")
                imageNames.splice(k - cont4, 1)
                cont4++;
            }
        }
		
		document.querySelector('#myCanvas' + (k + 1)).remove();
    }

    console.log(imageNames);

    //let newWindow = window.open("about:blank", "", "_blank");
    let names = '';
    let myNames = [];
    let count = 0;
    let elements = []
    let textContainer = document.querySelector('.textContainer');
    let i = 0;

    for (i; i < imageNames.length; i++) {

        names += imageNames[i];

        console.log(imageNames.length);

        if (i != imageNames.length - 1) {

            names += ' OR ';
        }

        myNames[count] = names;

        if((i + 1) % 20 == 0 || (imageNames.length % 20 > 0 && i == imageNames.length - 1 && imageNames.length > 20)) {
            names = '';
            elements[count] = document.createElement('div');
            let br = document.createElement('br');
            elements[count].innerHTML = myNames[count];
            textContainer.appendChild(elements[count]);
            textContainer.appendChild(br);
            count++;
        }
    }

    if(i < 20 && count == 0){
        elements[count] = document.createElement('div');
        let br = document.createElement('br');
        elements[count].innerHTML = myNames[count];
        textContainer.appendChild(elements[count]);
        textContainer.appendChild(br);

        //textContainer.innerHTML = myNames[count];

        //console.log(textContainer.appendChild(elements[count]));
    }

    //newWindow.document.write("<p>" + names + "</p>"+"<p>" + names + "</p>");
}

let copy = [];

function compare() {

    let canvas;
    let height;
    let width;
    let ctx;
    //console.log(length);

    for(let k = 0; k < 1; k++) {

        let pixels = [];

        canvas = document.querySelector('#myCanvas' + (k + 1));

        height = canvas.attributes.height.value;
        width = canvas.attributes.width.value;
        ctx = canvas.getContext('2d');

        let cont2 = 0;

        for(let j = 1; j <= height; j++) {

            for(let i = 1; i <= width; i++) {

                let imgData = ctx.getImageData(i, j, 1, 1);
                let red = imgData.data[0];
                let green = imgData.data[1];
                let blue = imgData.data[2];

                //alpha = imgData.data[3];
                //console.log(red + " " + green + " " + blue);

                var rgbToHex = function (rgb) {
                    var hex = Number(rgb).toString(16);
                    if (hex.length < 2) {
                        hex = "0" + hex;
                    }
                    return hex;
                };

                var fullColorHex = function(r,g,b) {
                    var red = rgbToHex(r);
                    var green = rgbToHex(g);
                    var blue = rgbToHex(b);

                    return  red + green + blue;
                };

                pixels[cont2] = fullColorHex(red, green, blue);
                cont2++;

                if(i == width && j == height) {
                    //console.log('My last pixel is in position: '+ i +" "+ j +' and my pixels in hexa are: '+ pixels);
                }
            }
        }

        let cont = 0;
        let cont3 = 0;

        for(let i = 0; i < pixels.length; i++) {

            for(let j = 0; j < pixels.length; j++) {

                if(pixels[j] == pixels[i]) {

                    cont++;
                }
                else{
                    cont3++;
                }
            }
        }

        let avg = (cont / (1000)).toFixed(2);
        copy[k] = avg;

        if(copy[k] > 0.95) {
            console.log("Dominant color is OTHER!!! " + copy[k]);
            console.log("Number of repeated pixels " + cont);
            console.log("Number of different pixels " + cont3);
        }
    }

    for(let i = 0; i < copy.length; i++) {

        if (copy[i] > 0.95) {

            let newWindow = window.open("about:blank", "", "_blank");
            let names = '';

            for (let i = 0; i < imageNames.length; i++) {

                names += imageNames[i];

                if (i != imageNames.length - 1) {

                    names += ' OR ';
                }
            }

            //newWindow.document.write("<p>" + names + "</p>");
        }
    }
}

if(cont > 0) {
    input.addEventListener('click', function () {

        console.log('hola');

        for(let i = 0; i < length; i++) {
            document.querySelector('body').removeChild(document.querySelector('#myCanvas' + (i + 1)));
        }
    })
}
