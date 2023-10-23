let slider = document.querySelector('.slider');
let current = 0;
let target = 0;
let ease = .05;
let sliderh = document.querySelector('.sliderinn').getBoundingClientRect().height;

let textcanvas = document.querySelector('.skillblock');
const sidelis = document.querySelectorAll('aside ul li');


let section1 = document.querySelector('.intro').offsetHeight;
let section2 = document.querySelector('.person').offsetHeight;


window.addEventListener('resize', init);

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
function setTransform(el, transform) {
    el.style.transform = transform;
}
function init() {
    let sliderh = document.querySelector('.sliderinn').getBoundingClientRect().height;
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
//側邊
const nav = document.querySelector('nav');
document.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
        console.log()
        nav.style.top = `0%`
    } else {
        nav.style.top = `-100%`
    }
});

sidelis.forEach((li) => {
    li.addEventListener('click', (e) => {
        if (e.target == sidelis[0]) {
            window.scrollTo(0, 0);
        } else if (e.target == sidelis[1]) {
            window.scrollTo(0, section1);
        } else {
            window.scrollTo(0, (section1 + section2));

        }

        sidelis.forEach((item) => {
            if (item !== e.target) {
                item.classList.remove("click");
            } else {
                item.classList.toggle("click");
            }
        });
    });
});
//作品集
let probtns = document.querySelectorAll('.showcase button');
probtns.forEach((b,i) => {
    b.addEventListener('click', () => {
        console.log(i)
        window.scrollTo(0, (section1 + section2 + (300*(i+1))))
    })
})