








export const castDate = (date) => {
    //console.log(date);
    let fecha = new Date(date);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString("es-ES", options);
}