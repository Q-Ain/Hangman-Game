
window.onload = function () {
  for(i=0; i<100; i++) {
    var randomRotation = Math.floor(Math.random() * 360);
    var randomScale = Math.random() * 1;
    var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
    var randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
    var randomAnimationDelay = Math.floor(Math.random() * 15);
  
    // Random colors
    var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    // Create confetti piece
    var confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.top=randomHeight + 'px';
    confetti.style.right=randomWidth + 'px';
    confetti.style.backgroundColor=randomColor;
    confetti.style.obacity=randomScale;
    confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
    confetti.style.animationDelay=randomAnimationDelay + 's';
    document.getElementById("confetti-wrapper").appendChild(confetti);
  }
}
