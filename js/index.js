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

window.addEventListener('resize', init);

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

const nav = document.querySelector('nav');
document.addEventListener("wheel", function (e) {
    if (e.deltaY < 0 ) {
        console.log()
        nav.style.top = `0%`
    } else {
        nav.style.top = `-100%`
    }
});
