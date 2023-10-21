// import gsap from 'https://cdn.skypack.dev/gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


let slider = document.querySelector('.slider');
let current = 0;
let target = 0;
let ease = .05;
let sliderh = document.querySelector('.sliderinn').getBoundingClientRect().height;
let textcanvas = document.querySelector('.skillblock');
window.addEventListener('resize',init());

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
function setTransform(el, transform) {
    el.style.transform = transform;
}
function init() {
    document.body.style.height = `${sliderh}px`;
}
function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateY(-${current}px)`);
    requestAnimationFrame(animate);
}

init();
animate();
// 作品集
let cardinfos = document.querySelectorAll('.cardinfo');
let isshow = true;
document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.card');
    document.querySelector('.procontainer').appendChild(lists[0]);
    if(isshow){
        cardinfos[0].style.display=`none`;
        cardinfos[1].style.display=`block`;
        return isshow = !isshow ;
    }else{
        cardinfos[0].style.display=`block`;
        cardinfos[1].style.display=`none`;
        return isshow = !isshow ;
    }
}
document.getElementById('back').onclick = function(){
    let lists = document.querySelectorAll('.card');
    document.querySelector('.procontainer').prepend(lists[lists.length-1]);
    if(isshow){
        cardinfos[0].style.display=`none`;
        cardinfos[1].style.display=`block`;
        return isshow = !isshow ;
    }else{
        cardinfos[0].style.display=`block`;
        cardinfos[1].style.display=`none`;
        return isshow = !isshow ;
    }
}
