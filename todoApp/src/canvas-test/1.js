/*
     * @var star_r：star半径系数，系数越大，半径越大
     * @var star_alpha：生成star的透明度，star_alpha越大，透明度越低
     * @var initStarsPopulation：初始化stars的个数
     * @var move_distance：star位移的距离，数值越大，位移越大
     * @var dot_r : dot半径系数，系数越大，半径越大
     * @var dot_speeds : dots运动的速度
     * @var dot_alpha : dots的透明度
     * @var aReduction：dot消失条件，透明度小于aReduction时消失
     * @var dotsMinDist：dot最小距离
     * @var maxDistFromCursor：dot最大距离
     * */
    const config = {
        star_r: 3,
        star_alpha: 5,
        initStarsPopulation: 150,
        move_distance: 0.25,
        dot_r: 5,
        dot_speeds: 0.5,
        dot_alpha: 0.5,
        dot_aReduction: 0.01,
        dotsMinDist: 5,
        maxDistFromCursor: 50,
    };
    let stars = [],
        dots = [],
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        WIDTH,
        HEIGHT,
        mouseMoving = false,
        mouseMoveChecker,
        mouseX,
        mouseY;
    
    
    /* 设置单个 star
    * @param id：id
    * @param x：x坐标
    * @param y：y坐标
    * @param useCache：是否使用缓存
    * */
    
    
    
    function getPreviousDot(id, stepback) {
        if (id === 0 || id - stepback < 0) {
            return false;
        }
        if (typeof dots[id - stepback] !== 'undefined') {
            return dots[id - stepback];
        } else {
            return false;
        }
    }
    
    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }
    
    
    function drawIfMouseMoving() {
        if (!mouseMoving) {
            return;
        }
        if (dots.length === 0) {
            dots[0] = new Dot(0, mouseX, mouseY, true);
            dots[0].draw();
            return;
        }
        let previousDot = getPreviousDot(dots.length, 1);
        let prevX = previousDot.x;
        let prevY = previousDot.y;
    
        let diffX = Math.abs(prevX - mouseX);
        let diffY = Math.abs(prevY - mouseY);
    
        if (diffX < config.dotsMinDist || diffY < config.dotsMinDist) {
            return;
        }
        let xVariation = Math.random() > .5 ? -1 : 1;
        xVariation = xVariation * Math.floor(Math.random() * config.maxDistFromCursor) + 1;
        let yVariation = Math.random() > 0.5 ? -1 : 1;
        yVariation = yVariation * Math.floor(Math.random() * config.maxDistFromCursor) + 1;
        dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation, true);
        dots[dots.length - 1].draw();
        dots[dots.length - 1].link();
    }
    
    function setCanvasSize() {
        WIDTH = document.documentElement.clientWidth;
        HEIGHT = document.docuemntElement.clientHeight;
        canvas.setAttribute('width', WIDTH);
        canvas.setAttribute('height', HEIGHT);
    }
    
    function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (let i in stars) {
            stars[i].move();
        }
        for (let j in dots) {
            dots[j].move();
        }
        drawIfMouseMoving();
        requestAnimationFrame(animate);
    }
    const initConfig = function (conf) {
        if (conf instanceof Object) {
            for (var item in conf) {
                if (conf.hasOwnProperty(item)) {
                    config[item] = conf[item];
    
                }
            }
        }
    }
    
    class Star {
        constructor(id, x, y, useCache) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.cacheCanvas = document.createElement('canvas');
            this.cacheCtx = this.cacheCanvas.getContext('2d');
            this.r = Math.floor(Math.random() * config.star_r) + 1;
            this.cacheCtx.width = 6 * this.r;
            this.cacheCtx.height = 6 * this.r;
            let alpha = (Math.floor(Math.random() * 10) + 1) / config.star_alpha;
            this.color = `rgba(255,255,255,${alpha})`;
            this.useCache = useCache;
            useCache && this.cache();
        }
    
    
        draw() {
            if (!this.useCache) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.r * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            } else {
                ctx.drawImage(this.cacheCanvas, this.x - this.人, this.y - this.r);
            }
        }
        cache() {
            this.cacheCtx.save();
            this.cacheCtx.fillStyle = this.color;
            this.cacheCtx.shadowColor = 'white';
            this.cacheCtx.shadowBlur = this.r * 2;
            this.cacheCtx.beginPath();
            this.cacheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI);
            this.cacheCtx.closePath();
            this.cacheCtx.fill();
            this.cacheCtx.restore();
        }
        move() {
            this.y -= config.move_distance;
            if (this.y <= -10) {
                this.y += HEIGHT + 10;
            }
            this.draw();
        }
        die() {
            stars[this.id] = null;
            delete stars[this.id];
        }
    }
    
    
    class Dot {
        constructor(id, x, y, useCache) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * config.dot_r) + 1;
            this.speed = config.dot_speeds;
            this.a = config.dot_alpha;
            this.aReduction = config.dot_aReduction;
            this.useCache = useCache;
            this.dotCanvas = document.createElement('canvas');
            this.dotCtx = this.dotCanvas.getContext('2d');
            this.dotCtx.width = 6 * this.r;
            this.dotCtx.height = 6 * this.r;
            this.dotCtx.a = 0.5;
            this.color = `rgba(255,255,255,${this.a})`;
            this.dotCtx.color = `rgab(255,255,255,${this.dotCtx.a})`;
            this.linkColor = `rgba(255,255,255,${this.a / 4})`;
            this.dir = Math.floor(Math.random() * 140) + 200;
            useCache && this.cache();
        }
    
        draw() {
            if (!this.useCache) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowColor = 'white';
                ctx.shadowBlur = this.r * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            } else {
                ctx.drawImage(this.dotCanvas, this.x - this.r * 3, this.y - this.r * 3);
            }
        }
    
        cache() {
            this.dotCtx.save();
            this.dotCtx.a -= this.aReduction;
            this.dotCtx.color = `rgba(255,255,255,${this.dotCtx.a})`;
            this.dotCtx.fillStyle = this.dotCtx.color;
            this.dotCtx.shadowColor = 'white';
            this.dotCtx.shadowBlur = this.r * 2;
            this.dotCtx.beginPath();
            this.dotCtx.arc(this.r * 3, this.r * 3, this.r, 0, Math.PI, false);
            this.dotCtx.closePath();
            this.dotCtx.fill();
            this.dotCtx.restore();
        }
        link() {
            if (this.id === 0) {
                return;
            }
            let previoisDot1 = getPreviousDot(this.id, 1);
            let previoisDot2 = getPreviousDot(this.id, 2);
            let previoisDot3 = getPreviousDot(this.id, 3);
            let previoisDot4 = getPreviousDot(this.id, 4);
            if (!previoisDot1) {
                return;
            }
            ctx.strokeStyle = this.linkColor;
            ctx.moveTo(previoisDot1.x, previoisDot1.y);
            ctx.beginPath();
            ctx.lineTo(this.x, this.y);
            if (previoisDot2 != false) {
                ctx.lineTo(previoisDot2.x, previoisDot2.y);
            }
            if (previoisDot3 != false) {
                ctx.lineTo(previoisDot3.x, previoisDot3.y);
            }
            if (previoisDot4 != false) {
                ctx.lineTo(previoisDot4.x, previoisDot4.y);
            }
            ctx.stroke();
            ctx.closePath();
    
        }
    
        move() {
            this.a -= this.aReduction;
            if (this.a <= 0) {
                this.die();
                return;
            }
            this.dotCtx.a -= this.aReduction;
            this.dotCtx.color = `rgba(255,255,255,${this.a})`;
            this.color = `rgba(255,255,255,${this.a / 4})`;
            this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed;
            this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;
            this.draw();
            this.link();
        }
    
        die() {
            dots[this.id] = null;
            delete dots[this.id];
        }
    }
    
    
    class CanvasStar {
        init(conf) {
            initConfig(conf);
            ctx.strokeStyle = 'white';
            ctx.shadowColor = 'white';
            for (let i = 0; i < config.initStarsPopulation; i++) {
                stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT), true);
            }
            ctx.shadowBlur = 0;
            animate();
        }
    }
    
    
    
    window.onmousemove = function (e) {
        mouseMoving = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        clearInterval(mouseMoveChecker);
        mouseMoveChecker = setInterval(function () {
            mouseMoving = false;
        }, 1000);
    }
    
    var cs = new CanvasStar;
    var conf = {
        star_r: 10,
        star_alpha: 50,
        initStarsPopulation: 10,
        move_distance: 0.65,
        dot_r: 7,
        dot_speeds: 5,
        dot_alpha: 0.5,
    };
    cs.init(conf);