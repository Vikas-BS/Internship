const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const imgGrid = document.getElementById('imgGrid');
const imagecount = document.getElementById('image-count');

const accessKey ='wC4zVyWMMaTfyK4PZgME6QmCi27MQWhQzsSluw84gOQ';

searchBtn.addEventListener('click',async()=>{
    const query = searchInput.value.trim();
    const perpage = imagecount.value;
    if(!query)return;
    imgGrid.innerHTML='Loading......';
    try{
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=${perpage}&client_id=${accessKey}`);
        const data = await res.json();
        imgGrid.innerHTML='';

        if(!data.results || data.results.length === 0){
            imgGrid.innerHTML='No image found';
            return;
        }
        data.results.forEach(photo=>{
            const img=document.createElement('img');
            img.src=photo.urls.small;
            imgGrid.appendChild(img);
        });
    }
    catch(error){
        imgGrid.innerHTML='Error fetching image!!';
        console.error(error);
    }
});