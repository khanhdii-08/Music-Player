const player = document.querySelector(".player");
const cd = document.querySelector(".cd");
const heading = document.querySelector("header h2");
const cdThumb = document.querySelector(".cd-thumb");
const audio = document.querySelector("#audio");
const playBtn = document.querySelector(".btn-toggle-play");
const progress = document.querySelector("#progress");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const randomBtn = document.querySelector(".btn-random");
const repeatBtn = document.querySelector(".btn-repeat");
const playlist = document.querySelector(".playlist");

const app = {
    songs : [
        {
            name : 'B.S.N.L 2 (Masew Mix)',
            singer : 'B Ray, Young H, Masew',
            path : './assets/music/B-S-N-L-2-Masew-Mix-B-Ray-Young-H-Masew.mp3',
            image : './assets/img/0ef1f17940cae55bcc3c642d2e2fbdd3_1504988997.png'
    
        },
        {
            name : 'Buồn Của Anh',
            singer : 'Đạt G',
            path : './assets/music/Buon-Cua-Anh-K-ICM-Dat-G-Masew.mp3',
            image : './assets/img/c0827e5f2c898fc987e7883151b0476a_1513651595.png'
    
        },
        {
            name : 'Buồn Không Em (Masew Mix)',
            singer : 'Đạt G, Masew',
            path : './assets/music/Buon-Khong-Em-Masew-Mix-Dat-G-Masew.mp3',
            image : './assets/img/e59fb5471f46e679d899906d6cc8f610.png'
    
        },
        {
            name : 'Diều Khác Lạ (Masew Mix)',
            singer : 'B Ray, Ngọc Haleyy, Masew',
            path : './assets/music/Dieu-Khac-La-Masew-Mix-Dat-G-Ngoc-Haleyy-Masew.mp3',
            image : './assets/img/a19ddbe22afc139c538bfca41cea40ad_1510656120.png'
    
        },
        {
            name : 'Xin',
            singer : 'Đạt G, B Ray, Masew',
            path : './assets/music/Xin-DatGMasewBRay-5325955.mp3',
            image : './assets/img/1514340960389_500.png'
    
        }
    ],

    render : function () {
        const htmls = this.songs.map(function (song) {
            return `
                <div class="song">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });

        playlist.innerHTML = htmls.join('');
    },

    getMusicPlayer : function(index = 0){
        return this.songs[index];
    },

    setMusicPlayer : function(value){
        heading.textContent = value.name;
        cdThumb.style.backgroundImage = `url('${value.image}')`;
        audio.src = value.path;
    },

    cdThumbAnimate : cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
            ],{
                duration : 10000,
                iterations : Infinity,
            }
    ),
    loadMusicPlayer : function(){
        const song = this.getMusicPlayer();
        this.setMusicPlayer(song);
        this.cdThumbAnimate.pause();
    },

    handleEvents: function() {

        const _this = this;
        const cdWidth = cd.offsetWidth;

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth    + 'px' : 0;

            cd.style.opacity = newCdWidth / cdWidth;
        }

        function playMusic (){
            player.classList.toggle('playing');
            audio.play();
            app.cdThumbAnimate.play();
            audio.addEventListener('timeupdate', function(){
                progress.value = Math.floor(audio.currentTime / audio.duration * 100);
            });
        }

        function stopMusic(){
            player.classList.toggle('playing');
            _this.cdThumbAnimate.pause();
            audio.pause();
        }

        playBtn.addEventListener('click', function(){
            if(!player.classList.contains('playing'))
                playMusic();
            else
                stopMusic();
        });

        function seekTime(value){
            return ((value / 100) * audio.duration);
        }

        progress.addEventListener('change', async function(e){
            console.log(seekTime(e.target.value));
            audio.currentTime = seekTime(e.target.value);
        });

    },

    start : function() {  
        this.loadMusicPlayer();
        this.handleEvents();
        this.render();
    }
}

app.start();