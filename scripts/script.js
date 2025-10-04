// Canvas y configuración
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

// Botón About Us
const aboutUsBtn = document.getElementById('about-us-btn');
const aboutUsScreen = document.getElementById('about-us-screen');

aboutUsBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    aboutUsScreen.classList.add('active');
});

// Botón para volver desde About Us al Intro 
const backFromAboutUsBtn = document.createElement('button');
backFromAboutUsBtn.textContent = "Back";
backFromAboutUsBtn.classList.add('back-button');
backFromAboutUsBtn.style.marginTop = "20px";
document.querySelector('.about-us-text').appendChild(backFromAboutUsBtn);

backFromAboutUsBtn.addEventListener('click', () => {
    aboutUsScreen.classList.remove('active');
    introScreen.classList.add('active');
});

    
// Historias individuales por personaje.

const historias = {
    
    astronaut: `Soy Alex Weber, astronauta de la ESA. En mayo de 2024, estaba en la ISS, orbitando la Tierra a más de 400 km. El 9 de mayo, recibimos un aviso: una gran eyección de masa coronal (CME) se dirigía a la Tierra, provocando una tormenta geomagnética G5.
                En la estación seguimos el protocolo: cerramos compuertas, apagamos sistemas y nos refugiamos en el módulo Zvezda. Desde allí vi auroras verdes, violetas y rosadas iluminando la Tierra, un espectáculo hermoso pero un recordatorio del poder del Sol. Durante la tormenta, algunos instrumentos se reiniciaron solos y las comunicaciones con la Tierra se interrumpieron.
                El 11 de mayo, la tormenta disminuyó. La Tierra volvió a su calma azul y nosotros regresamos a nuestras tareas, recordando la fuerza de nuestro Sol y la fragilidad de la vida en el espacio.`,
    
    farmer: `I'm Julián Ortega, a 47-year-old farmer with two children. I adapted my small highland farm to modern technology: smart irrigation, GPS tractors, and digital forecasts.
            One October, a solar storm hit. Alerts warned of electrical and GPS disruptions—but I didn't expect it to reach my farm. Within hours, systems failed, sensors burned out, and crops began to suffer. Months of work were lost, and at home, electricity failures spoiled food and disrupted my daughter’s classes.
            NASA called it a coronal mass ejection, part of the Sun's natural cycle. For me, it was devastation. Now, I've returned to manual farming, but I live with uncertainty: in our tech-dependent world, farmers no longer fear only drought or rain… we also fear the sun..`,
    
    scientist: `Hello, I'm Lukas Heinemann, a space weather scientist in Potsdam, Germany. My job is to study how the Sun influences our planet. Sometimes it gives us light and heat, but other times... it throws storms at us.
                On 10 May 2024, NASA and ESA warned of something unusual:
                'G5 geomagnetic storm on its way, caused by sunspot AR3664.'
                We knew that a coronal mass ejection (CME) was coming towards Earth, but I never imagined what I was going to see. That night, the sky above Berlin lit up with green, pink and violet lights dancing and shining above the rooftops. 
                'Dad, the sky is dancing!' my children shouted.
                Yes... it was the Northern Lights, something almost impossible in Germany, but at the same time, GPS systems were failing, satellites were out of sync, and power grids in the north were experiencing fluctuations.
                Even farmers in Bavaria had to water by hand. Their automatic systems stopped working. The Sun, beautiful and powerful, was touching the Earth's magnetic field. For three days, the auroras were seen as far away as France, Italy and Spain, and when everything returned to normal, I understood something:
                We can observe the Sun, but we cannot control it, and every time the sun rises, I remember that day when the Sun danced over Germany and taught us to respect its power.`,


    kid: `My name is Leo, I'm eighteen years old, and what I'm experiencing is something I never imagined I would feel. This morning started like any other, but when I stepped out onto the balcony, the air seemed thick and heavy, as if something was approaching without warning.
        It wasn't long before I felt a tingling sensation on my skin that made me shiver. The sky was clearer than usual, as if the atmosphere had thinned. And that's when I saw the green and violet lights dancing on the edge between the clouds and the air. It was an aurora, but where it's not usually seen.
        At that moment, my phone turned off. The lights in the house flickered and then went out for a few moments. An electrical hum filled the air. I felt that I was no longer on safe ground.
        I later found out that it was space weather that was affecting me: storms of charged particles, solar wind, solar flares, and massive plasma ejections from the Sun. If they reach our Earth, the planet's magnetic shield should defend us. But sometimes some particles slip through. 
        My head hurts at times, and I feel dizzy at times, although the dizziness then dissolves into curiosity. I feel vulnerable, but I'm not entirely scared.
        I don't know how long this state will last. Maybe a few more hours, maybe days. What I have learned is that the Earth's magnetic field, atmosphere, and layers are responsible for filtering radiation.`

};

// Botón de volver atrás
document.getElementById('back-to-intro-btn').addEventListener('click', () => {
    document.getElementById('characters-screen').classList.remove('active');
    document.getElementById('intro-screen').classList.add('active');
});


// Elementos de nebulosa
const nebula = [];
for (let i = 0; i < 150; i++) {
    nebula.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? 'rgba(100, 150, 255, ' : 'rgba(150, 100, 255, ',
        opacity: Math.random() * 0.3 + 0.2
    });
}
    
// Estrellas
const stars = [];
for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
        
    });
}
    
// Meteoritos
const meteorites = [];
for (let i = 0; i < 12; i++) {
    meteorites.push({
        x: Math.random() * canvas.width * 0.6,
        y: -Math.random() * 400 - 100,
        size: Math.random() * 25 + 10,
        speed: Math.random() * 5 + 3,
        angle: Math.random() * 0.4 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        color: Math.random()
    });
}
    
let startTime = Date.now();
let time = 0;
    
// Función para dibujar el sol
function drawSun() {
    const sunX = canvas.width;
    const sunY = canvas.height / 2;
    const sunRadius = 500;
        
// Resplandor del sol
for (let i = 5; i > 0; i--) {
    const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * (i * 0.4));
    gradient.addColorStop(0, `rgba(255, 255, 200, ${0.15 * i})`);
    gradient.addColorStop(0.3, `rgba(255, 220, 100, ${0.1 * i})`);
    gradient.addColorStop(0.6, `rgba(255, 150, 50, ${0.05 * i})`);
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
            
    ctx.fillStyle = gradient;
    ctx.fillRect(sunX - sunRadius * 2, sunY - sunRadius * 2, sunRadius * 2, sunRadius * 4);
}
        
// Corona solar
    ctx.save();
    ctx.translate(sunX, sunY);
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.001;
        ctx.rotate(Math.PI / 6);
            
        const coronaGrad = ctx.createRadialGradient(0, 0, sunRadius * 0.6, 0, 0, sunRadius * 1.2);
        coronaGrad.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
        coronaGrad.addColorStop(0.5, 'rgba(255, 150, 50, 0.15)');
        coronaGrad.addColorStop(1, 'rgba(255, 100, 0, 0)');
            
        ctx.fillStyle = coronaGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sunRadius * 1.5, -sunRadius * 0.3);
        ctx.lineTo(sunRadius * 1.5, sunRadius * 0.3);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
        
    // Cuerpo del sol
    const sunGradient = ctx.createRadialGradient(sunX - sunRadius * 0.2, sunY - sunRadius * 0.2, 0, sunX, sunY, sunRadius);
    sunGradient.addColorStop(0, '#FFFEF0');
    sunGradient.addColorStop(0.3, '#FFF4D0');
    sunGradient.addColorStop(0.5, '#FFD700');
    sunGradient.addColorStop(0.7, '#FFA500');
    sunGradient.addColorStop(0.9, '#FF8C00');
    sunGradient.addColorStop(1, '#FF6600');
        
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();
        
    // Manchas solares
    ctx.fillStyle = 'rgba(200, 100, 0, 0.3)';
    for (let i = 0; i < 8; i++) {
        const spotAngle = (i / 8) * Math.PI * 2 + time * 0.0005;
        const spotDist = sunRadius * (0.3 + Math.sin(time * 0.001 + i) * 0.2);
        const spotX = sunX + Math.cos(spotAngle) * spotDist;
        const spotY = sunY + Math.sin(spotAngle) * spotDist;
        const spotSize = 20 + Math.sin(time * 0.002 + i) * 10;
            
        ctx.beginPath();
        ctx.arc(spotX, spotY, spotSize, 0, Math.PI * 2);
        ctx.fill();
    }
}
    
// Función para dibujar la nebulosa
function drawNebula() {
    nebula.forEach(n => {
        ctx.fillStyle = n.color + n.opacity + ')';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
            
        n.x += n.speedX;
        n.y += n.speedY;
            
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
    });
}
    
// Función para dibujar las estrellas
function drawStars() {
    stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
            
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
            
        if (star.radius > 1.5) {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * 0.5})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}
    
// Función para dibujar meteoritos
function drawMeteorite(met) {
    ctx.save();
    ctx.translate(met.x, met.y);
    ctx.rotate(met.rotation);
        
    const meteorGrad = ctx.createRadialGradient(-met.size * 0.3, -met.size * 0.3, 0, 0, 0, met.size);
    if (met.color > 0.5) {
        meteorGrad.addColorStop(0, '#A0826D');
        meteorGrad.addColorStop(0.5, '#6B5445');
        meteorGrad.addColorStop(1, '#3E2723');
    } else {
        meteorGrad.addColorStop(0, '#8B7D6B');
        meteorGrad.addColorStop(0.5, '#5C5147');
        meteorGrad.addColorStop(1, '#2E2620');
    }
        
    ctx.fillStyle = meteorGrad;
    ctx.beginPath();
    ctx.arc(0, 0, met.size, 0, Math.PI * 2);
    ctx.fill();
        
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
            (Math.sin(i) * met.size * 0.3),
            (Math.cos(i) * met.size * 0.3),
            met.size * 0.15,
            0, Math.PI * 2
        );
        ctx.fill();
    }
        
    ctx.restore();
        
    // Estela del meteorito
    const trailLength = 80;
    for (let i = 0; i < 3; i++) {
        const offset = i * 8;
        const trailGrad = ctx.createLinearGradient(
            met.x, met.y,
            met.x - Math.cos(met.angle) * (trailLength + offset),
            met.y - Math.sin(met.angle) * (trailLength + offset)
        );
            
        if (i === 0) {
            trailGrad.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
            trailGrad.addColorStop(0.3, 'rgba(255, 200, 100, 0.7)');
        } else if (i === 1) {
            trailGrad.addColorStop(0, 'rgba(255, 180, 100, 0.7)');
            trailGrad.addColorStop(0.3, 'rgba(255, 120, 50, 0.5)');
        } else {
            trailGrad.addColorStop(0, 'rgba(255, 100, 50, 0.5)');
            trailGrad.addColorStop(0.3, 'rgba(255, 50, 0, 0.3)');
        }
        trailGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
            
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = met.size * (1.2 - i * 0.3);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(met.x, met.y);
        ctx.lineTo(
            met.x - Math.cos(met.angle) * (trailLength + offset),
            met.y - Math.sin(met.angle) * (trailLength + offset)
        );
        ctx.stroke();
    }
        
    // Partículas de la estela
    for (let i = 0; i < 5; i++) {
        const dist = Math.random() * trailLength;
        const px = met.x - Math.cos(met.angle) * dist + (Math.random() - 0.5) * 15;
        const py = met.y - Math.sin(met.angle) * dist + (Math.random() - 0.5) * 15;
            
        ctx.fillStyle = `rgba(255, ${150 + Math.random() * 100}, 0, ${Math.random() * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
    }
}
    
// Función de animación principal
function animate() {
    time = Date.now() - startTime;
        
    // Fondo degradado
    const bgGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
    bgGrad.addColorStop(0, '#0a0a2e');
    bgGrad.addColorStop(0.5, '#050515');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
        
    drawNebula();
    drawStars();
    drawSun();
        
    // Actualizar y dibujar meteoritos
    meteorites.forEach(met => {
        met.x += Math.cos(met.angle) * met.speed;
        met.y += Math.sin(met.angle) * met.speed;
        met.rotation += met.rotationSpeed;
            
        if (met.x > canvas.width * 0.7 || met.y > canvas.height + 100) {
            met.x = Math.random() * canvas.width * 0.3;
            met.y = -Math.random() * 300 - 100;
            met.rotation = Math.random() * Math.PI * 2;
        }
            
        drawMeteorite(met);
    });
        
    requestAnimationFrame(animate);
}
    
// Navegación entre pantallas
const introScreen = document.getElementById('intro-screen');
const charactersScreen = document.getElementById('characters-screen');
const storyScreen = document.getElementById('story-screen');
const textBox = document.getElementById('text-box');
    
textBox.addEventListener('click', () => {
    introScreen.classList.remove('active');
    charactersScreen.classList.add('active');
});
    
// Event listeners para los personajes
const characterCards = document.querySelectorAll('.character-card');
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        const charKey = card.getAttribute('data-character');
        const charName = card.getAttribute('data-name');
        const charImg = card.getAttribute('data-img');
    
        document.getElementById('story-char-name').textContent = charName;
        document.getElementById('story-char-img').src = charImg;
        document.getElementById('story-content').textContent = historias[charKey];
        document.getElementById('story-content').setAttribute('data-current', charKey);
    
        charactersScreen.classList.remove('active');
        storyScreen.classList.add('active');
    });
});
    
// Botón de volver
document.getElementById('back-btn').addEventListener('click', () => {
    storyScreen.classList.remove('active');
    charactersScreen.classList.add('active');
});
    
// Iniciar animación
animate();