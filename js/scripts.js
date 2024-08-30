document.addEventListener('DOMContentLoaded', () => {
    console.log('自己紹介サイトへようこそ！');
});
function toggleMenu() {
    document.querySelector('.hamburger').classList.toggle('change');
    document.querySelector('.menu').classList.toggle('show');
}