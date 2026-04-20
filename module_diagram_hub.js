initModal();
const state = sharedState.load();
if (!state.username) window.location.href = '00_login.html';

function goToStudy(id) {
  AudioManager.play('success');
  setTimeout(() => {
    window.location.href = `module_diagram_study.html?id=${id}`;
  }, 300);
}

document.getElementById('go-home-btn').addEventListener('click', () => {
  window.location.href = '01_home_menu.html';
});
