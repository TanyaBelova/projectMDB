
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
        addForm = document.querySelector('form.add'),
        inputMovie = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    // Удаление всех рекламных блоков со страницы (правая часть сайта)
    
    const deleteAdvertising = (array) =>{
        array.forEach(item =>{
            item.remove();
        });
    };

    // advertising.forEach(function(item){
    //     item.remove();
    // });
    
    // Изменение жанра фильма с "комедия" на "драма"

    const changePage = (genre, newGenre)=> {
        genre.textContent = newGenre;
        newBackground.style.backgroundImage = 'url("../img/bg.jpg")';
    };
    

    const sortArray = (array) =>{
        array.sort();
    };
    
    // Метод добавления порядковых номеров фильмов
    function addOrderedMovieList(films, parent)
    {        
        parent.innerHTML = "";
        sortArray(movieDB.movies);
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${". " + film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((rmElement, i)=>{
            rmElement.addEventListener('click', () => {
                rmElement.parentElement.remove();
                films.splice(i, 1);
                addOrderedMovieList(films, parent);
            });
        });

    }
    
    addForm.addEventListener('submit', (e) => {
    
        e.preventDefault(); 
    
        let newMovie = inputMovie.value;
        const favoriteMovie = checkbox.checked;

        if (newMovie){
            if (newMovie.length > 21){
                newMovie = `${newMovie.substr(0,21)}...`;
            }
        
            movieDB.movies.push(newMovie);
            sortArray(movieDB.movies);
    
            addOrderedMovieList(movieDB.movies, movs);
                
            if(favoriteMovie){
                console.log('Добавлен любимый фильм');
            }
            
            e.target.reset();
        }

     });
    
    // Неверный путь
    //  const deleteElement = (e) => {
    //     e.preventDefault();
    //     const removeMovie = e.target.parentNode.textContent[0];
    //     console.log(removeMovie);
    //     e.target.parentNode.remove();
    //     movieDB.movies.splice(removeMovie-1,1);
    //     addOrderedMovieList(movieDB.movies, movs);
    // };
    
    // function addListener(){
    //     removeElements.forEach(element => {
    //         element.addEventListener('click', deleteElement);
    //     });
    // }
    
    deleteAdvertising(advertising);
    changePage(genre,'Драма');
    addOrderedMovieList(movieDB.movies, movs);
});






