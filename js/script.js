
'use strict';

document.addEventListener('DOMContentLoaded', () =>{

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const advertising = document.querySelectorAll('.promo__adv img'),
        movs = document.querySelector('.promo__interactive-list'),
        genre = document.querySelector('.promo__genre'),
        newBackground = document.querySelector('.promo__bg'),
        btn = document.querySelector('button'),
        addForm = document.querySelector('form.add');
    let removeElements = document.querySelectorAll('.delete'),
        inputMovie = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    // Удаление всех рекламных блоков со страницы (правая часть сайта)
    
    function deleteAdvertising(){
        advertising.forEach(item =>{
            item.remove();
        });
    }

    deleteAdvertising();

    // advertising.forEach(function(item){
    //     item.remove();
    // });
    
    // Изменение жанра фильма с "комедия" на "драма"

    function changeGenre(newGenre){
        genre.textContent = newGenre;
    }

    changeGenre('Драма');
    
    // Изменение заднего фона постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
    newBackground.style.backgroundImage = 'url("../img/bg.jpg")';
    // newBackground.style.background = "url(../img/bg.jpg) center center/cover no-repeat";
    
    // Метод для сортировки и добавления порядковых номеров фильмов
    function addList(films, parent)
    {        
        parent.innerHTML = "";
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${". " + film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }
    
    addList(movieDB.movies, movs);
    
    addForm.addEventListener('submit', (e) => {
    
        e.preventDefault(); 
    
        let newMovie = inputMovie.value;
        let favoriteMovie = checkbox.checked;

        if (newMovie == ''){
            alert('Введите название фильма!');
            return;
        }
    
        if (newMovie.length > 21)
        {
            newMovie = String(newMovie).substr(0,21) + "...";
        }
    
        movieDB.movies.push(newMovie);

        movieDB.movies.sort();

        addList(movieDB.movies, movs);

        inputMovie.value = "";
            
        if(favoriteMovie)
        {
            console.log('Добавлен любимый фильм');
        }
        checkbox.checked=false;
     });
    
    
     const deleteElement = (e) => {
        e.preventDefault();
        const removeMovie = e.target.parentNode.textContent[0];
        console.log(removeMovie);
        e.target.parentNode.remove();
        movieDB.movies.splice(removeMovie-1,1);
        addList(movieDB.movies, movs);
    };
    
    function addListener(){
        removeElements.forEach(element => {
            element.addEventListener('click', deleteElement);
        });
    }
    
    addListener();

});






