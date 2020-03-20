import './__level/__level';

const hastags = document.querySelector('.hastags');
const hastagsInput = hastags.querySelector('.hastags-text');

hastagsInput.addEventListener('focus', () => {
  hastags.classList.add('hastags--focus');
});

hastagsInput.addEventListener('blur', () => {
  hastags.classList.remove('hastags--focus');
});
