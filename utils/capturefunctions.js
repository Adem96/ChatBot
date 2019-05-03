

const captureButton=document.getElementById('capturebutton');
const canvas = document.getElementById('canvas');
const context=canvas.getContext('2d');
const player=document.getElementById('canvas-video');

function convertToImageData(canvas)
{

return canvas.toDataURL('image/jpg');

};


const constraints = {


    video:true,
};


function capButton(){

captureButton.addEventListener('click',() => {

context.drawImage(player,0,0,canvas.width,canvas.height0);


});


var data=convertToImageData(canvas);
console.log(data);
document.getElementById('fileInput').value=data;

};


navigator.mediaDevices.getUserMedia(constraints).then((stream) => {


player.srcObject=stream;


});

