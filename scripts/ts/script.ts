import { Record } from "./Record.js";
import { Suspicious } from "./Suspicious.js";
import { SuspiciousMenger } from "./Suspicious.js";
(function () {
  const _ = class {
    // 定位 SVG 及其旁邊的引腳
    static containerSlices: HTMLElement = document.querySelector('g#slices') as HTMLElement;
    static pin: HTMLElement = document.querySelector('svg#pin') as HTMLElement;
    // 定位標題和按鈕
    static heading: HTMLElement = document.querySelector('h1') as HTMLElement;
    static spinButton: HTMLButtonElement = document.querySelector('button#spin') as HTMLButtonElement;
    // 整個腳本中使用的對象，描述顏色和16個特定的旋轉值
    // 這個想法是包含輪子周圍的三個切片，並使箭頭始終指向其中一個切片
    static deadSuspicious: Suspicious[] = SuspiciousMenger.getDeadSuspicious;
    static color = SuspiciousMenger.getColors;
    static bodyPart = SuspiciousMenger.getBodyPart;
    static {
      // attach a click event listener on the button, at which point call the spinWheel function
      this.setUpButtonEvent();
      // call the same function when pressing the pin
      this.setUpSpinWheel();
    }
    private static async setUpButtonEvent(): Promise<void> {
      this.spinButton.onclick = () => {
        this.setDisabled(true);
        this.spinWheel();
      };
      (document.querySelector('button#clear') as HTMLButtonElement).onclick = () => Record.removeRecord();
    }
    private static async setDisabled(bool: boolean): Promise<void> {
      bool ? this.spinButton.classList.add("isHidden") : this.spinButton.classList.remove("isHidden");
    }
    private static async setUpSpinWheel(): Promise<void> {
      await this.adddots();
      await this.addSlices();
    }

    private static async adddots(): Promise<void> { // 立即在方向盤周圍添加簡單的點
      for (let i = 0; i < 48; i += 1) {
        const transform = `rotate(${360 / 48 * i}), translate(0 -49.5), rotate(${-360 / 48 * i})`;
        const dot = `<circle r="0.5" cx="50" cy="50" fill="currentColor" transform="${transform}"/>`;
        this.containerSlices.innerHTML += dot;
      }
    }

    private static randomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // 在切片後面的圓圈添加隨機填滿顏色
    /* let randomFill = '';
    for (let i = 0; i < 6; i += 1) {
      randomFill += randomHex();
    }
    (document.querySelector('svg circle#slice') as HTMLElement).style.fill = randomFill; */
    private static async addSlices(): Promise<void> {
      // 建立切片，總共 24 個，使用一些三角學來計算適當的弧座標
      let angleOfEachPiece: number = 360 / this.deadSuspicious.length;
      let rotationAngle: number; // 用于存储每个切片的旋转角度

      // 先按顺序从小到大绘制每个切片
      for (let i = this.deadSuspicious.length; i > 0; i--) {
        // 计算当前切片的旋转角度
        rotationAngle = angleOfEachPiece * i;

        // 路徑元素的值
        const xCoor = 50 + Math.sin(rotationAngle * Math.PI / 180) * 47;
        const yCoor = 50 - Math.cos(rotationAngle * Math.PI / 180) * 47;
        const flags = rotationAngle > 180 ? '0 1 1' : '0 0 1';

        // 初始化填充顏色變數
        let fill = '';

        // 获取当前切片对应的嫌疑人
        const suspect: Suspicious = this.deadSuspicious[i - 1];

        // 如果存在，則用所述物件中指定的值替換隨機十六進位
        if (suspect) {
          fill = suspect.color as string;
          // 设置嫌疑人的旋转角度
          suspect.rotation = rotationAngle;
        }

        // 设置不同的 z-index，确保从下到上绘制
        const zIndex = this.deadSuspicious.length - i; // 让大的切片有更高的 z-index

        // 确保最后一个切片使用特定颜色
        if (i === this.deadSuspicious.length) {
          // 在最后一个切片时，绘制一个完整的圆圈，并填充颜色
          this.containerSlices.innerHTML += `<circle cx="50" cy="50" r="47" fill="#${suspect.color}" style="z-index: ${zIndex};"/>`;
          continue; // 跳过最后一个切片的路径绘制
        }

        // 建立路徑元素並將其附加到 SVG 容器
        const path = `
          <path d="M 50 50 L 50 3 A 47 47 ${flags} ${xCoor} ${yCoor}" fill=#${fill} style="z-index: ${zIndex};" />
        `;
        this.containerSlices.innerHTML += path;

      }
      for (let i = 45; i < 360; i += 90) {
        // 在每个切片的中心添加文字（例如 "右手"、"左脚" 等）
        const centerX = 50 + Math.sin(i * Math.PI / 180) * 23;  // 设置文字的X坐标
        const centerY = 50 - Math.cos(i * Math.PI / 180) * 23;  // 设置文字的Y坐标
        const bodyPartText = this.bodyPart[(i - 45) / 90].bodyPart;  // 获取对应的身体部位名称（如 "右手"、"左脚"）

        this.containerSlices.innerHTML += `
        <text x="${centerX}" y="${centerY}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="black"">
          ${bodyPartText}
        </text>
      `;
      }
    }

    private static removeItem<T>(array: T[], item: T): T[] {
      return array.filter(i => i !== item);
    }
    // function spinning the wheel
    public static async spinWheel(): Promise<void> {
      // 隨機轉盤持續時間
      const randomDuration = this.randomInt(2, 3);
      // remove the event listener from the button and the wheel, to avoid running the function twice at the same time
      /*   this.spinButton.removeEventListener('click', this.spinWheel.bind(this));
        this.pin.removeEventListener('click', this.spinWheel.bind(this)); */

      // 立即隱藏顯示匹配顏色的標題
      this.heading.classList.add('isHidden');
      // 在圖釘和按鈕中新增一個類，以顯示如何不應單擊它們
      this.pin.classList.add('isSpinning');
      this.spinButton.classList.add('isSpinning');

      // 建立旋轉持續時間的變量，以及輪子實現的旋轉次數
      const randomRotate = this.randomInt(10, 20);
      let randomSuspect: number = 0;
      // 建立一個變數以隨機從其中一個物件中選取
      let suspectColor: Suspicious;
      let suspectBodyPart: Suspicious;
      /* for (let i = 0; i < this.deadSuspicious.length; i++) {
        randomSuspect = this.randomInt(0, this.deadSuspicious.length - 1);
        const randomColor = this.deadSuspicious[randomSuspect].cname;
        const randomBodyPart = this.deadSuspicious[randomSuspect].bodyPart;
        this.color.forEach((element) => {
          if (element.cname === randomColor) {
            this.bodyPart.forEach((ew) => {
              if (ew.bodyPart === randomBodyPart) {
                suspectColor = element;
                suspectBodyPart = ew;
              }
            })
          }
        })
        this.color = this.color.filter(item => item !== suspectColor);
        this.bodyPart = this.bodyPart.filter(item => item !== suspectBodyPart);
        if (this.color.length === 0) this.color = SuspiciousMenger.getColors;
        if (this.bodyPart.length === 0) this.bodyPart = SuspiciousMenger.getBodyPart;
      } */
      suspectColor = this.color[this.randomInt(0, this.color.length - 1)];
      suspectBodyPart = this.bodyPart[this.randomInt(0, this.bodyPart.length - 1)];
      this.color = this.removeItem(this.color, suspectColor);
      this.bodyPart = this.removeItem(this.bodyPart, suspectBodyPart);
      if (this.color.length === 0) this.color = SuspiciousMenger.getColors;
      if (this.bodyPart.length === 0) this.bodyPart = SuspiciousMenger.getBodyPart;
      let rotation: number = 0;
      this.deadSuspicious.forEach((element) => {
        if (element.cname === suspectColor.cname && element.bodyPart === suspectBodyPart.bodyPart) {
          rotation = element.rotation as number;
        }
      })
      // 應用過渡和變換屬性
      this.containerSlices.style.transformOrigin = '50%';
      this.containerSlices.style.transition = `transform ${randomDuration}s ease-out`;
      /* 對於旋轉，除了任意 x360 旋轉之外，請記住
     - 添加 90 以匹配箭頭的位置（在滾輪的最右側）
     - 減去切片的旋轉
     - 新增一個切片，使箭頭點位於切片的邊界內
      */
      this.containerSlices.style.transform = `rotate(${randomRotate * 360 - (rotation) + 90 + this.randomInt(0, 360 / 24)}deg)`;

      this.pin.style.animation = `pinWheel ${randomDuration / 10}s 10 ease-in-out`;

      // after the time allocated for the rotation show the heading with the "random" color, update the custom property with its value
      let timeoutID = setTimeout(async () => {
        this.heading.textContent = `${suspectColor.cname} + ${suspectBodyPart.bodyPart}`;
        this.heading.classList.remove('isHidden');
        this.pin.style.animation = '';
        document.documentElement.style.setProperty('--color-theme', `#${suspectColor.color}`);

        // remove the class on the pin and button showing the forbidden cursor
        this.pin.classList.remove('isSpinning');
        this.spinButton.classList.remove('isSpinning');


        // 清除間隔並將布林值設定回 false
        clearInterval(timeoutID);
        await Record.addRecord(`${suspectColor.cname} + ${suspectBodyPart.bodyPart}`);
        this.setDisabled(false);
      }, randomDuration * 1000);
      // reset the event listener on the button and the pin
      /*     this.spinButton.addEventListener('click', this.spinWheel.bind(this));
          this.pin.addEventListener('click', this.spinWheel.bind(this)); */
    }

  }
})();
