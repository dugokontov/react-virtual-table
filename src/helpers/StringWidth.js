class StringWidth {
    constructor(font) {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        if (font) {
            this._context.font = font;
        }
        this._cache = {};
    }

    /**
     * Measures text text using set font
     * @param  {string} text Text to measure
     * @return {number}
     */
    getWidth(text) {
        if (text === undefined || text === null) {
            return 0;
        }
        return this._context.measureText(text).width;
    }

    /**
     * Measure text width using set font, but instead of measuring whole word
     * at once, it will get width of each letter. Every letter is measured on
     * canvas only once, result is cached and won't be measured ever again.
     * @param  {string} text Text to measure
     * @return {number}      Width of text
     */
    getWidthCached(text) {
        if (text === undefined || text === null) {
            return 0;
        }
        const t = text.toString();
        let width = 0;
        for (let i = 0; i < t.length; i += 1) {
            const letter = t[i];
            if (!this._cache[letter]) {
                this._cache[letter] = this._context.measureText(letter).width;
            }
            width += this._cache[letter];
        }
        return width;
    }

    set font(font) {
        if (this._context.font !== font) {
            this._cache = {};
        }
        this._context.font = font;
    }

    get font() {
        return this._context.font;
    }

    /**
     * @param  {array} data Each element of a data is a row
     * @return {array}      Widest string in each column
     */
    findTheWidestForEachColumn(data) {
        const widthPerColumn = [];
        const theWidestStrings = [];
        for (var i = data.length - 1; i >= 0; i -= 1) {
            const row = data[i];
            for (var j = row.length - 1; j >= 0; j -= 1) {
                const cellValue = row[j];
                const strWidth = this.getWidthCached(cellValue);
                if (!widthPerColumn[j] || strWidth > widthPerColumn[j]) {
                    widthPerColumn[j] = strWidth;
                    theWidestStrings[j] = cellValue;
                }
            }
        }
        return theWidestStrings;
    }
}

export default StringWidth;
