
export default function NumberCreator(rial) {
    return `${(rial/10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}