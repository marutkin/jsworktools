
// Linqlike Array.prototype extensions in .Net LINQ style
// Version: 1.0.0.1

// Is element in array
Array.prototype.contains = function(searchValue) {
    return this.indexOf(searchValue) >= 0 ? true : false;
}

// Get new array filtered by lambda expression
Array.prototype.where = function(predicatFunction) {
    return this.filter(predicatFunction);
}

// Get new array distincted by property name, only for array of objects
Array.prototype.getDistinctBy = function(propertyName) {
    try {

        const arr = this;
        const tempStore = [];

        if (this.where(value => typeof value != 'object').length > 0)
        {
          throw new Error('[ Error: distinctBy ]: Array contains primitives');
        }

        function getFiltered() {
            return arr.filter(function(arrElement) {
                if (!arrElement || !(propertyName in arrElement)) return;
                return !tempStore.contains(arrElement[propertyName]) && tempStore.push(arrElement[propertyName])
            })
        }

        return getFiltered();

    } catch (error) {
        throw new Error(`[ Error: Array.prototype.getDistinctBy ]: \n${error}`);
    }
}

// Delete element from array
Array.prototype.deleteByIndex = function(valueIndex) {
    try {
        if (this.length <= 0 || !valueIndex) {
          throw new Error('Array is empty!');
        }
        this.splice(valueIndex, 1);
    } catch (error) {
        throw new Error(`[ Error: Array.prototype.deleteByIndex ]: \n${error}`);
    }
}