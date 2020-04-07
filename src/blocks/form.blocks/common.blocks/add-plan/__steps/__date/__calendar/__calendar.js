if (document.documentElement.clientWidth >= 1320) {

  const elements = document.querySelectorAll('.calendar__table span');
  elements.forEach((item) => {
    item.classList.remove('visually-hidden');
  });
}


