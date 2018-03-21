// Linqlike Array.prototype extensions in .Net LINQ style
// Version: 1.0.0.0

// Is element in array
Array.prototype.contains = function(searchValue) {
    return this.indexOf(searchValue) >= 0 ? true : false;
}

// Get new array filtered by lambda expression
Array.prototype.where = function(predicatFunction) {
    return $.grep(this, elem => {
        return predicatFunction(elem);
    });
}

// Get new array distincted by property name, only for array of objects
Array.prototype.getDistinctBy = function(propertyName) {
    try {
        var arr = this;
        if (this.where(value => typeof value != 'object').length > 0) throw new Error('Ошибка выполнения distinctBy - в массиве есть примитивные данные.');
        var tempStore = [];

        function getFiltered() {
            return arr.filter(function(arrElement) {
                if (arrElement == undefined || !(propertyName in arrElement)) return;
                return !tempStore.contains(arrElement[propertyName]) && tempStore.push(arrElement[propertyName])
            })
        }
        return getFiltered();
    } catch (error) {
        throw new Error(`Ошибка выполнения Array.prototype.getDistinctBy \n${error}`);
    }
}

// Delete element from array
Array.prototype.deleteByIndex = function(valueIndex) {
    try {
        if (this.length <= 0 || valueIndex == undefined) throw new Error('Попытка удалить элемент в пустом массиве.');
        this.splice(valueIndex, 1);
    } catch (error) {
        throw new Error(`Ошибка выполнения Array.prototype.deleteByIndex  \n${error}`);
    }
}