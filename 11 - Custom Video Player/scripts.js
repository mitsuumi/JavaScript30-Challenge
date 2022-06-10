// get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
// build out functions
// 1. 建立播放和暫停功能
// 寫法一
// function togglePlay(){
//     //paused為video的屬性，true的話表示暫停中，false表示正在播放中
//     if(video.paused){
//         // play()方法可以讓影片播放
//         video.play();
//     } else {
//         video.paused();
//     }
// }
// 寫法二
function togglePlay(){
    const method = video.paused ? 'play': 'pause';
    // console.log(method)
    video[method]();
}
// 切換播放按鈕的icon，如果暫停鍵顯示暫停圖案，如果播放顯示播放圖案
function updateButton(){ 
    const icon = this.paused ? '▶' : '||'
    // console.log(icon)
    toggle.textContent = icon
}

// 快轉倒回功能
function skip(){
    // 透過 JS 的可以綁定 data-* 並取出中的值。
    console.log(this.dataset.skip)
    // currentTime 用來設置或返回影片播放的當前位置
    video.currentTime += parseFloat(this.dataset.skip)
}

// playbackRate 與 volume 為video屬性的名稱
// 控制播放速度與音量
function handleRangeUpdate(){
    video[this.name] = this.value
    // console.log(this.name)
    // console.log(this.value)
}

// 播放軸的顯示
function handleProgress(){
    const percent = (video.currentTime /video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

// 影片時間軸顯示在播放的位置
function scrub(e){
    // 利用
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime= scrubTime
    console.log(e)
}

// hook up the event listener
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove', handleRangeUpdate))
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', ()=> mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown= true)
progress.addEventListener('mouseup', () => mousedown= false)