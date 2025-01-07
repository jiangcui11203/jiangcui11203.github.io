export interface Suspicious {
    cname?: string;
    bodyPart?: string;
    rotation?: number;
    color?: string;
}
export class SuspiciousMenger {
    private static readonly deadSuspicious: Suspicious[] = [
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
    private static readonly color: Suspicious[] = [{ cname: '藍色', color: '006eff' }, { cname: '紅色', color: 'ff0000' }, { cname: '綠色', color: '008000' }, { cname: '黃色', color: 'ffff00' }]
    private static readonly bodyPart: Suspicious[] = [{ bodyPart: '右手' }, { bodyPart: '左手' }, { bodyPart: '右腳' }, { bodyPart: '左腳' }]
    public static get getDeadSuspicious(): Suspicious[] {
        return this.deadSuspicious;
    }
    public static get getColors(): Suspicious[] {
        return this.color;
    }
    public static get getBodyPart(): Suspicious[] {
        return this.bodyPart;
    }
}