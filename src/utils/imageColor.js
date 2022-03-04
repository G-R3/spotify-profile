import FastAverageColor from "fast-average-color";

const getImageColor = async (image) => {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(image);

    return color.rgb;
};

export default getImageColor;
