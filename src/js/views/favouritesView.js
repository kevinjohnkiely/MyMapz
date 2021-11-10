import View from './View.js'

class FavouritesView extends View {
    _parentElement = document.querySelector('.fave-list')
    _errorMessage = 'No favourites yet!'

    addHandlerRender(handler){
        window.addEventListener('load', handler)
    }

    _generateHTML(){
        return this._data.map(this._generateHTMLPreview).join('')
    }

    _generateHTMLPreview(result) {
        const id = window.location.hash.slice(1)

        return `
         <li><a href="#${result.id}">${result.name}</a></li>
        `
    }
}

export default new FavouritesView()