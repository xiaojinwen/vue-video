/**
 * 位置
 * @startX 开始位置的x坐标
 * @startY 开始位置的y坐标
 * @endX 结束位置的x坐标
 * @endY 结束位置的y坐标
 */
export interface StartPosition {
    startX: number;
    startY: number;
}

export interface EndPosition {
    endX: number;
    endY: number;
}

export interface TouchEvent {
    touchstart: (e: any) => void;
    touchmove: (e: any) => void;
    touchend: (e: any) => void;
}

export interface Config {
    touchstart: (e: any) => void;
    touchmove: (e: any) => void;
    touchend: (e: any) => void;
    pathLen?: number; // path变量的储存长度 超过不储存
    onlyUseEndPoint?: boolean; // 是否仅使用结束点坐标计算行为(否:时候用path储存的路径计算行为)
}
/**
 * 获取滑动的方向
 */
export default class Direction {
    private path: any = []; // 滑动的路径
    private pathLen: number = 8; // path变量的储存长度 超过不储存
    private onlyUseEndPoint: boolean = true; // 是否仅使用结束点坐标计算行为(否:时候用path储存的路径计算行为)
    private _startX: any = 0; // 触摸开始是x位置
    private _startY: any = 0; // 触摸开始是y位置

    private event: TouchEvent = {
        touchstart: this.noop,
        touchmove: this.noop,
        touchend: this.noop,
    };
    constructor(config: Config) {
        document.addEventListener("touchstart", this.touchstart.bind(this), false);
        // 手指接触屏幕滑动
        document.addEventListener("touchmove", this.touchmove.bind(this), true);
        // 手指离开屏幕
        document.addEventListener("touchend", this.touchend.bind(this), false);
        this.event = config;
        config.pathLen && (this.pathLen = config.pathLen);
        config.onlyUseEndPoint && (this.onlyUseEndPoint = config.onlyUseEndPoint);
    }


    private getStartPosition(): StartPosition {
        return {
            startX: this._startX,
            startY: this._startY,
        };
    }

    /**
     * 根据起点终点返回方向  有点问题 对于来回按着滑动的会右偏差问题
     * @return Object 1向上滑动 2向下滑动 3向左滑动 4向右滑动 0点击事件
     */
    private getDirection(): number {
        const arr: any = this.path;
        const angx: number = arr[arr.length - 1].x - this._startX;
        const angy: number = arr[arr.length - 1].y - this._startY;
        let result: number = 0;
        // 如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
        const angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if (
            (angle >= 135 && angle <= 180) ||
            (angle >= -180 && angle < -135)
        ) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
        return result;
    }

    private reset(): void {
        this.path = [];
        this._startX = 0;
        this._startY = 0;
    }
    private noop(): void { }

    private touchstart(e: any): void {
        this._startX = e.touches[0].clientX;
        this._startY = e.touches[0].clientY;
        this.event.touchstart && this.event.touchstart(e);
    }
    private touchmove(e: any): void {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        if (!this.onlyUseEndPoint) {
            const arr: any = this.path;
            if (arr.length <= this.pathLen) {
                arr.push({
                    x: endX,
                    y: endY
                });
            }
        } else {
            this.path = [{
                x: endX,
                y: endY
            }];
        }
        this.event.touchmove && this.event.touchmove(e);
    }
    private touchend(e: any): void {
        this.reset();
        this.event.touchend && this.event.touchend(e);
    }

    private destoryed(): void {
        document.removeEventListener("touchstart", this.touchstart.bind(this));
        document.removeEventListener("touchmove", this.touchmove.bind(this));
        document.removeEventListener("touchend", this.touchend.bind(this));
    }

    // 获得角度
    private getAngle(angx: number, angy: number) {
        // 坐标(0, 1)对于的x轴夹角为π/2，
        return (Math.atan2(angy, angx) * 180) / Math.PI;
    }

}
