import { SuspiciousMenger } from "./Suspicious.js";
// 定位 SVG 及其旁邊的引腳
const containerSlices = document.querySelector('g#slices');
const pin = document.querySelector('svg#pin');
// 立即在方向盤周圍添加簡單的點
for (let i = 0; i < 48; i += 1) {
    const transform = `rotate(${360 / 48 * i}), translate(0 -49.5), rotate(${-360 / 48 * i})`;
    const dot = `<circle r="0.5" cx="50" cy="50" fill="currentColor" transform="${transform}"/>`;
    containerSlices.innerHTML += dot;
}
// 定位標題和按鈕
const heading = document.querySelector('h1');
const spinButton = document.querySelector('button');
// 更新超時變數
let timeoutID;
// 實用函數傳回一個範圍內的隨機整數和一個隨機十六進位值
const randomInt = (min = 0, max = 16) => Math.floor(Math.random() * (max - min) + min);
// const randomHex = () => randomInt().toString(16);
// 整個腳本中使用的對象，描述顏色和 3 個特定的旋轉值
// 這個想法是包含輪子周圍的三個切片，並使箭頭始終指向其中一個切片
const suspicious = SuspiciousMenger.getSuspicious;
// 在切片後面的圓圈添加隨機填滿顏色
/* let randomFill = '';
for (let i = 0; i < 6; i += 1) {
  randomFill += randomHex();
}
(document.querySelector('svg circle#slice') as HTMLElement).style.fill = randomFill; */
// 建立切片，總共 24 個，使用一些三角學來計算適當的弧座標
for (let i = 360; i >= 0; i -= 22.5) {
    // 路徑元素的值
    const xCoor = 50 + Math.sin(i * Math.PI / 180) * 47;
    const yCoor = 50 - Math.cos(i * Math.PI / 180) * 47;
    const flags = i > 180 ? '0 1 1' : '0 0 1';
    // 初始化填充顏色變數
    let fill = '';
    // 如果遞減的變數i與其中一個物件的任意旋轉值匹配，則找到特定對象
    const suspect = suspicious.find(pairing => pairing.rotation === i);
    console.log(suspect);
    // 如果存在，則用所述物件中指定的值替換隨機十六進位
    if (suspect) {
        fill = suspect.color;
    }
    // 确保最后一个切片使用特定颜色，避免被覆盖
    if (i === 360) {
        containerSlices.innerHTML += `<circle cx="50" cy="50" r="47" fill="#006eff"/>`;
        continue;
    }
    // 建立路徑元素並將其附加到 SVG 容器
    const path = `
    <path d="M 50 50 L 50 3 A 47 47 ${flags} ${xCoor} ${yCoor}" fill=#${fill} />
  `;
    containerSlices.innerHTML += path;
}
// function spinning the wheel
function spinWheel() {
    const randomDuration = randomInt(2, 3);
    // remove the event listener from the button and the wheel, to avoid running the function twice at the same time
    spinButton.removeEventListener('click', spinWheel);
    pin.removeEventListener('click', spinWheel);
    // immediately hide the heading showing the matching color
    heading.classList.add('isHidden');
    // 在圖釘和按鈕中新增一個類，以顯示如何不應單擊它們
    pin.classList.add('isSpinning');
    spinButton.classList.add('isSpinning');
    // 建立旋轉持續時間的變量，以及輪子實現的旋轉次數
    const randomRotate = randomInt(10, 20);
    // 建立一個變數以隨機從其中一個物件中選取
    const randomSuspect = randomInt(0, suspicious.length);
    // 應用過渡和變換屬性
    containerSlices.style.transformOrigin = '50%';
    containerSlices.style.transition = `transform ${randomDuration}s ease-out`;
    /* 對於旋轉，除了任意 x360 旋轉之外，請記住
   - 添加 90 以匹配箭頭的位置（在滾輪的最右側）
   - 減去切片的旋轉
   - 新增一個切片，使箭頭點位於切片的邊界內
    */
    containerSlices.style.transform = `rotate(${randomRotate * 360 - suspicious[randomSuspect].rotation + 90 + randomInt(0, 360 / 24)}deg)`;
    pin.style.animation = `pinWheel ${randomDuration / 10}s 10 ease-in-out`;
    // after the time allocated for the rotation show the heading with the "random" color, update the custom property with its value
    timeoutID = setTimeout(() => {
        heading.textContent = `${suspicious[randomSuspect].cname}`;
        heading.classList.remove('isHidden');
        pin.style.animation = '';
        document.documentElement.style.setProperty('--color-theme', `#${suspicious[randomSuspect].color}`);
        // remove the class on the pin and button showing the forbidden cursor
        pin.classList.remove('isSpinning');
        spinButton.classList.remove('isSpinning');
        // reset the event listener on the button and the pin
        spinButton.addEventListener('click', spinWheel);
        pin.addEventListener('click', spinWheel);
        // clear the interval and set the boolean back to false
        clearInterval(timeoutID);
    }, randomDuration * 1000);
}
// attach a click event listener on the button, at which point call the spinWheel function
spinButton.addEventListener('click', spinWheel);
// call the same function when pressing the pin
pin.addEventListener('click', spinWheel);
