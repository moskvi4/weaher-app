class ColorUtils {
    getBetweenColor = (colorStart, colorFinish, diff) => {
        return Array.from({length: 3})
            .map((_, index) => colorStart[index] + (colorFinish[index] - colorStart[index]) * diff);
    };
    
    getDiff = (start, finish, temp) => (temp - start) / (finish - start);
    
    colorToRgb = ([r, g, b]) => `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    
    getBgColor = temp => {
        const colorM10 = [0, 255, 255];
        const colorP10 = [255, 247, 0];
        const colorP30 = [255, 140, 0];
        
        let resultColor = null;
        
        if (temp <= -10) {
            resultColor = colorM10;
        } else if (temp < 10) {
            resultColor = this.getBetweenColor(colorM10, colorP10, this.getDiff(-10, 10, temp));
        } else if (temp < 30) {
            resultColor = this.getBetweenColor(colorP10, colorP30, this.getDiff(10, 30, temp));
        } else {
            resultColor = colorP30;
        }
        
        return this.colorToRgb(resultColor);
    };
}

export default new ColorUtils();
