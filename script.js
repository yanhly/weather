const wheel = document.getElementById('wheel');
const textContainer = document.getElementById('text-container');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const totalSpan = document.getElementById('total');
const counters = {
    sunny: document.getElementById('sunny'),
    rainy: document.getElementById('rainy'),
    cloudy: document.getElementById('cloudy'),
    snow: document.getElementById('snow')
};

let currentRotation = 0;
let isSpinning = false;  //转盘是否旋转标志

const segments = [
    { type: 'sunny', start: 0, end: 108 },
    { type: 'rainy', start: 108, end: 180 },
    { type: 'cloudy', start: 180, end: 288 },
    { type: 'snow', start: 288, end: 360 }
];

function getWeatherType(degrees) {
    const normalized = (360 - degrees % 360) % 360;
    return segments.find(s => normalized >= s.start && normalized < s.end).type;
}

function rotateWheel() {
    if (isSpinning) return;
    isSpinning = true;

    // 增强随机性参数
    const randomFactor = Math.random() * 0.4 + 0.8; // 0.8-1.2随机系数
    const baseRotation = 360 * 5; // 基础5圈
    const randomRotation = 360 * (Math.random() * 8 + 3); // 3-11随机圈数

    // 组合随机参数
    const extraRotation = (baseRotation + randomRotation) * randomFactor;

    currentRotation += extraRotation;

    // 添加随机缓动效果
    wheel.style.transition = `transform ${3 * randomFactor}s cubic-bezier(${Math.random().toFixed(2)},${Math.random().toFixed(2)},${Math.random().toFixed(2)},${Math.random().toFixed(2)})`;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        // 添加微调随机偏移（±3度）
        const finalOffset = (Math.random() * 6 - 3);
        const finalAngle = (currentRotation + finalOffset) % 360;

        const weatherType = getWeatherType(finalAngle);

        counters[weatherType].textContent = parseInt(counters[weatherType].textContent) + 1;
        totalSpan.textContent = parseInt(totalSpan.textContent) + 1;
        isSpinning = false;
    }, 3500 * randomFactor);
}

startBtn.addEventListener('click', rotateWheel);

resetBtn.addEventListener('click', () => {
    currentRotation = 0;
    wheel.style.transform = 'rotate(0deg)';
    textContainer.style.transform = 'rotate(0deg)';
    totalSpan.textContent = '0';
    Object.values(counters).forEach(c => c.textContent = '0');
});