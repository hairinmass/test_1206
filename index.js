window.onload = () => {

    const url = 'http://39.103.151.139:3000/banner';
    const urlList = 'http://39.103.151.139:8000/music/playlist'

    const getData = async () => {
        const res = await axios.get(url);
        console.log(res);
        if (res.status === 200) {
            const { data: { banners } } = res;
            console.log(banners);
            const swiperWrapper = document.getElementsByClassName('swiper-wrapper')[0];

            banners.forEach(banner => {
                const { imageUrl } = banner;
                const divSwiper = document.createElement('div');
                divSwiper.className = 'swiper-slide';
                const img = document.createElement('img');
                img.src = imageUrl;
                divSwiper.appendChild(img);
                swiperWrapper.appendChild(divSwiper);
            });

            const mySwiper = new Swiper('.swiper', {
                direction: 'horizontal', // 垂直切换选项
                loop: true, // 循环模式选项
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    };

    getData()

    const getList = async () => {
        const res = await axios.get(urlList)
        const { data:{playlists} } = res

        console.log(playlists)
        const footer = document.getElementsByClassName('footer')[0]

        playlists.forEach((list) => {
            const {coverImgUrl} = list
            const div = document.createElement('div')
            div.className = 'listHolder'

            const img = document.createElement('img')
            img.src = coverImgUrl
            div.appendChild(img)

            const pList = document.createElement('p')
            pList.innerText = list.name
            div.appendChild(pList)

            footer.appendChild(div)
        })
    }

    getList()
}