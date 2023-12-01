export const getOrigin = async () => {
    const response = await fetch('http://rustattoo.ru/source/')
    const data = await response.json()
}