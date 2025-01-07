export class SuspiciousMenger {
    static get getDeadSuspicious() {
        return this.deadSuspicious;
    }
    static get getColors() {
        return this.color;
    }
    static get getBodyPart() {
        return this.bodyPart;
    }
}
SuspiciousMenger.deadSuspicious = [
    {
        cname: '紅色',
        bodyPart: '右手',
        color: 'ff0000'
    },
    {
        cname: '綠色',
        bodyPart: '右手',
        color: '008000'
    },
    {
        cname: '黃色',
        bodyPart: '右手',
        color: 'ffff00'
    },
    {
        cname: '藍色',
        bodyPart: '右手',
        color: '006eff'
    },
    {
        cname: '紅色',
        bodyPart: '左手',
        color: 'ff0000'
    },
    {
        cname: '綠色',
        bodyPart: '左手',
        color: '008000'
    },
    {
        cname: '黃色',
        bodyPart: '左手',
        color: 'ffff00'
    },
    {
        cname: '藍色',
        bodyPart: '左手',
        color: '006eff'
    },
    {
        cname: '紅色',
        bodyPart: '右腳',
        color: 'ff0000'
    },
    {
        cname: '綠色',
        bodyPart: '右腳',
        color: '008000'
    },
    {
        cname: '黃色',
        bodyPart: '右腳',
        color: 'ffff00'
    },
    {
        cname: '藍色',
        bodyPart: '右腳',
        color: '006eff'
    },
    {
        cname: '紅色',
        bodyPart: '左腳',
        color: 'ff0000'
    },
    {
        cname: '綠色',
        bodyPart: '左腳',
        color: '008000'
    },
    {
        cname: '黃色',
        bodyPart: '左腳',
        color: 'ffff00'
    },
    {
        cname: '藍色',
        bodyPart: '左腳',
        color: '006eff'
    }
];
SuspiciousMenger.color = [{ cname: '藍色', color: '006eff' }, { cname: '紅色', color: 'ff0000' }, { cname: '綠色', color: '008000' }, { cname: '黃色', color: 'ffff00' }];
SuspiciousMenger.bodyPart = [{ bodyPart: '右手' }, { bodyPart: '左手' }, { bodyPart: '右腳' }, { bodyPart: '左腳' }];
