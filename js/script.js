/* WhatsApp: coloque seu número real entre as aspas, com país + DDD + número.
   Use somente dígitos, sem espaços, sinal de +, parênteses ou traços.
   Deixe vazio para manter o site em modo de demonstração. */
const WHATSAPP_NUMBER = '';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacao');
const mobile = window.matchMedia('(max-width: 800px)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-collapsed', mobile.matches && !open);
}
menuButton.hidden = false;
setMenu(false);
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
mobile.addEventListener('change', () => setMenu(false));
document.querySelector('#year').textContent = new Date().getFullYear();

const whatsapp = document.querySelector('#whatsapp');
const notice = document.querySelector('#aviso-contato');
const hasNumber = /^[1-9]\d{9,14}$/.test(WHATSAPP_NUMBER);
function updateWhatsApp(service = '') {
  if (!hasNumber) return;
  const message = service
    ? `Olá! Gostaria de agendar ${service} na Imperium Barber Club.`
    : 'Olá! Gostaria de agendar um horário na Imperium Barber Club.';
  whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener noreferrer';
  notice.textContent = service ? `Serviço selecionado: ${service}. Confirme a disponibilidade pelo WhatsApp.` : 'Confirme a disponibilidade de horários pelo WhatsApp.';
}
updateWhatsApp();
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    updateWhatsApp(link.dataset.service);
    if (!hasNumber) notice.textContent = `Serviço selecionado: ${link.dataset.service}. Demonstração: o WhatsApp ainda não está configurado.`;
  });
});
whatsapp.addEventListener('click', event => {
  if (!hasNumber) {
    event.preventDefault();
    notice.textContent = 'Site de demonstração. Para ativar o contato, configure WHATSAPP_NUMBER em js/script.js com seu número real.';
    notice.classList.add('highlight');
  }
});
