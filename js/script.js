"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    //Tabs

    let tabsParent = document.querySelector('.tabheader__items'),
          tabsButtons = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');

    function hideContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

            tabsButtons.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        });
    }

    function showContent(i = 0) {
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabsButtons[i].classList.add('tabheader__item_active');
    }

    hideContent();
    showContent();

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabsButtons.forEach((tab, i) => {
                if (target == tab) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

        //Timer
    
        const deadline = '2022-02-23';

        function getTime(endtime) {
            let dif = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(dif / (1000 * 60 * 60 * 24)),
                hours = Math.floor((dif / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((dif / 1000 / 60) % 60),
                seconds = Math.floor((dif / 1000) % 60);

            return {
                total: dif,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds

            };
        }

        function addZero(param) {
            if (param >= 0 && param < 10) {
                return `0${param}`;
            } else {
                return param;
            }
        }

        function setTime(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timerId = setInterval(updateTime, 1000);

            updateTime();

            function updateTime() {
                const t = getTime(endtime);

                days.innerHTML = addZero(t.days);
                hours.innerHTML = addZero(t.hours);
                minutes.innerHTML = addZero(t.minutes);
                seconds.innerHTML = addZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timerId);
                }
            }
        }

        setTime('.timer', deadline);

        // Modal

        const modal = document.querySelector('.modal'),
              buttonsOpen = document.querySelectorAll('[data-modal]'),
              buttonClose = document.querySelector('[data-closed]');
        
        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }
        
        buttonsOpen.forEach(btn => {
            btn.addEventListener ('click', openModal);
        });

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = ''; //default
        }
        
        buttonClose.addEventListener ('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown',(e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        const modalTimerId  = setTimeout(openModal, 5000);

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
        window.addEventListener('scroll', showModalByScroll);
});