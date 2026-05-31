export const distanceCalculator = (distance: number) => {
    if(distance < 1000) return `${distance.toFixed(2)} m`
    else{
        const dist = distance / 1000;
        return `${dist.toFixed(2)} km`
    }
}