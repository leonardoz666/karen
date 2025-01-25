document.addEventListener('DOMContentLoaded', () => {
    // *************** CONFIGURAÇÕES INICIAIS ***************
    // Elementos da UI
    const elements = {
        username: document.getElementById("username"),
        password: document.getElementById("password"),
        eyeL: document.querySelector(".eyeball-l"),
        eyeR: document.querySelector(".eyeball-r"),
        handL: document.querySelector(".hand-l"),
        handR: document.querySelector(".hand-r"),
        form: document.querySelector('form')
    };

    // *************** ANIMAÇÕES DO PANDA ***************
    const pandaAnimations = {
        normalEyeStyle: () => {
            elements.eyeL.classList.remove('focused');
            elements.eyeR.classList.remove('focused');
        },
        normalHandStyle: () => {
            elements.handL.classList.remove('password-focused');
            elements.handR.classList.remove('password-focused');
        }
    };

    // *************** EVENT LISTENERS ***************
    // Gerenciador de foco nos inputs
    const setupFocusListeners = () => {
        if (elements.username && elements.password) {
            elements.username.addEventListener("focus", () => {
                elements.eyeL.classList.add('focused');
                elements.eyeR.classList.add('focused');
                pandaAnimations.normalHandStyle();
            });

            elements.password.addEventListener("focus", () => {
                elements.handL.classList.add('password-focused');
                elements.handR.classList.add('password-focused');
                pandaAnimations.normalEyeStyle();
            });

            document.addEventListener("click", (e) => {
                let clickedElem = e.target;
                if (clickedElem != elements.username && clickedElem != elements.password) {
                    pandaAnimations.normalEyeStyle();
                    pandaAnimations.normalHandStyle();
                }
            });
        }
    };

    // *************** GERENCIAMENTO DE LOGIN ***************
    const handleLogin = (e) => {
        e.preventDefault();
        const username = elements.username.value;
        const password = elements.password.value;

        if (username === 'cabritinha' && password === 'cabritinha') {
            // Create glass overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, rgba(255,20,147,0.15), rgba(138,43,226,0.15));
                backdrop-filter: blur(15px) brightness(1.2);
                -webkit-backdrop-filter: blur(15px) brightness(1.2);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid rgba(255,255,255,0.3);
                box-shadow: 0 0 50px rgba(255,20,147,0.3);
            `;

            // Create particles container
            const particles = document.createElement('div');
            particles.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            `;

            // Add floating particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 8 + 4}px;
                    height: ${Math.random() * 8 + 4}px;
                    background: rgba(255,255,255,${Math.random() * 0.6 + 0.4});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 6 + 4}s infinite linear;
                    filter: blur(${Math.random() * 3}px);
                `;
                particles.appendChild(particle);
            }

            // Create success PNG
            const successImg = document.createElement('img');
            successImg.src = 'ui/euteamo.png';
            successImg.style.cssText = `
                width: 600px;
                height: 500px;
                animation: popIn 0.5s ease-out, float 4s ease-in-out infinite;
                pointer-events: none;
                filter: 
                    drop-shadow(0 0 20px rgba(255, 20, 147, 0.5))
                    brightness(1.1);
                transform-origin: center;
            `;

            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                @keyframes particle {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); }
                }
            `;
            document.head.appendChild(style);

            overlay.appendChild(particles);
            overlay.appendChild(successImg);
            document.body.appendChild(overlay);

            // Remove after 2 seconds
            setTimeout(() => {
                overlay.remove();
                style.remove();
            }, 2500);

            const loginContainer = document.querySelector('.container');
            if (loginContainer) {
                loginContainer.style.display = 'none';
            }
            mainContent.initialize();
        } else {
            uiComponents.createModernAlert('Usuário ou senha incorretos!');
        }
    };

    // *************** EFEITOS VISUAIS ***************
    const backgroundEffects = {
        createLiliesBackground: () => {
            const heartsContainer = document.createElement('div');
            heartsContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1;
            `;
            document.body.appendChild(heartsContainer);

            function createLily() {
                const lily = document.createElement('img');
                lily.src = 'ui/lirio.png';
                lily.className = 'lily-particle';
                lily.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 40 + 30}px;
                    user-select: none;
                    opacity: ${Math.random() * 0.5 + 0.5};
                    z-index: -1;
                    animation: fall ${Math.random() * 3 + 2}s linear forwards;
                `;
                lily.style.left = Math.random() * 100 + 'vw';
                lily.style.top = '-20px';
                
                heartsContainer.appendChild(lily);
                
                // Ajuste preciso para remoção
                const computedStyle = getComputedStyle(lily);
                const animationDuration = parseFloat(computedStyle.animationDuration) * 1000;
                
                setTimeout(() => {
                    lily.remove();
                }, animationDuration + 500);  // Buffer aumentado
            }

            // Use requestAnimationFrame for smoother animation
            let lastTime = 0;
            function animateLilies(timestamp) {
                if (timestamp - lastTime >= 300) {
                    createLily();
                    lastTime = timestamp;
                }
                requestAnimationFrame(animateLilies);
            }
            requestAnimationFrame(animateLilies);

            // Adicionar animação de queda
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes fall {
                    0% { transform: translateY(-20px) rotate(0deg); }
                    100% { transform: translateY(100vh) rotate(360deg); }
                }
            `;
            document.head.appendChild(styleSheet);
        },
        createHearts: () => {
            uiComponents.createModernAlert('❤️ Por você eu passaria por todos os levels do mundo ❤️');
            
            // Voltar para versão original com 15 corações
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.textContent = '❤️';
                    heart.style.cssText = `
                        position: fixed;
                        font-size: ${Math.random() * 30 + 20}px;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        opacity: 1;
                        z-index: 1002;
                        animation: heartFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
                        pointer-events: none;
                    `;

                    document.body.appendChild(heart);

                    // Remover após animação
                    setTimeout(() => heart.remove(), 1500);
                }, i * 100);
            }
        },
        createCryVideo: () => {
            const videoOverlay = document.createElement('div');
            videoOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.15) !important;
                backdrop-filter: blur(15px) !important;
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
            `;

            const video = document.createElement('video');
            video.src = 'videos/bomb.webm';
            video.controls = false;
            video.autoplay = true;
            video.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                background: transparent !important;
                mix-blend-mode: multiply;
                filter: drop-shadow(0 0 20px rgba(255,20,147,0.5));
            `;

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'CANCELAR';
            cancelButton.style.cssText = `
                position: absolute;
                top: 655px;
                right: 580px;
                padding: 3px 21px;
                background-color: green;
                border: none;
                border-radius: 4px;
                color: white;
                font-weight: bold;
                cursor: url("ui/pink2.cur"), pointer;
                z-index: 10001;
                font-size: 1em;
                transition: all 0.3s ease;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;

            // Adicionar efeito hover
            cancelButton.addEventListener('mouseenter', () => {
                cancelButton.style.backgroundColor = '#006400';
            });
            cancelButton.addEventListener('mouseleave', () => {
                cancelButton.style.backgroundColor = 'green';
            });

            videoOverlay.appendChild(video);
            videoOverlay.appendChild(cancelButton);
            document.body.appendChild(videoOverlay);

            // Evento para cancelar
            cancelButton.addEventListener('click', () => {
                video.pause();
                videoOverlay.remove();
            });

            // Evento quando o vídeo termina
            video.addEventListener('ended', () => {
                videoOverlay.remove();
                location.reload();
            });
        }
    };

    // *************** CONTEÚDO PRINCIPAL ***************
    const mainContent = {
        initialize: () => {
            // Camada da imagem de fundo
            const bgLayer = document.createElement('div');
            bgLayer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('fotos/background.jpg') center/cover no-repeat fixed;
                z-index: 0;
            `;
            
            // Camada de blur
            const blurLayer = document.createElement('div');
            blurLayer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                z-index: 1;
            `;

            // Container principal
            const container = document.createElement('div');
            container.style.cssText = `
                position: relative;
                z-index: 2;
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
            `;

            // Adicionar elementos ao body
            document.body.appendChild(bgLayer);
            document.body.appendChild(blurLayer);
            document.body.appendChild(container);

            // Adicionar elementos ao container
            const topText = document.createElement('div');
            topText.textContent = "AMAR É COMPREENDER QUE A VULNERABILIDADE É A BASE PARA UMA CONEXÃO PROFUNDA";
            topText.style.cssText = `
                color: white;
                font-size: 24px;
                font-weight: 300;
                text-align: center;
                padding: 40px 20px;
                max-width: 800px;
                line-height: 1.5;
                letter-spacing: 1px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                font-family: 'Segoe Print', sans-serif;
                margin-top: 20px;
            `;

            container.appendChild(topText);

            // Criar o grid do jogo da memória
            const cards = ['memoria/1.jpg', 'memoria/2.jpg', 'memoria/3.jpg'];
            const gameCards = [...cards, ...cards];
            
            // Embaralhar as cartas
            for (let i = gameCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
            }

            let firstCard = null;
            let secondCard = null;
            let canFlip = true;
            let matchedPairs = 0;

            // Ajustar layout do grid para 6 cartas
            const memoryGame = document.createElement('div');
            memoryGame.style.cssText = `
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 20px;
                max-width: 900px;
                margin: 20px auto;
                padding: 20px;
                position: absolute;
                top: 50%;
                left: 28%;
                transform: translate(-50%, -50%);
            `;

            // Função para criar PNG com animação de quique
            function createBouncingPng() {
                // Verificar se o PNG já existe
                const existingBouncing = document.querySelector('img[src="ui/duvida.png"]');
                if (existingBouncing) return;

                // Adicionar estilo de animação de quique
                const bounceStyle = document.createElement('style');
                bounceStyle.textContent = `
                    @keyframes bounce {
                        0%, 100% { transform: translate(-50%, 0); }
                        50% { transform: translate(-50%, -20px); }
                    }
                `;
                document.head.appendChild(bounceStyle);

                const bouncingPng = document.createElement('img');
                bouncingPng.src = 'ui/duvida.png';
                bouncingPng.style.cssText = `
                    position: fixed;
                    width: 100px;
                    height: 100px;
                    left: 50%;
                    top: 80%;
                    transform: translateX(-50%);
                    cursor: pointer;
                    z-index: 1001;
                    animation: bounce 1s infinite ease-in-out;
                `;

                bouncingPng.addEventListener('click', () => {
                    envelopeContainer.style.display = 'flex';
                    
                    // Corrigir a seleção do botão usando atributo CSS
                    const moveButton = document.querySelector('button[data-type="love-button"]');
                    if (moveButton) {
                        moveButton.style.pointerEvents = 'auto';
                        moveButton.style.opacity = '1';
                        moveButton.style.cursor = 'pointer';
                    }
                });

                document.body.appendChild(bouncingPng);
            }

            // Criar as cartas
            gameCards.forEach((imgSrc, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.style.cssText = `
                    width: 270px;
                    height: 400px;
                    background: linear-gradient(45deg, #ff69b4, #ff1493);
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: transform 0.3s;
                    transform-style: preserve-3d;
                    position: relative;
                    will-change: transform;
                    backface-visibility: hidden;
                `;

                const front = document.createElement('div');
                front.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    background: linear-gradient(45deg, #ff69b4, #ff1493);
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `;

                // Adicionar coração na parte de trás
                const heart = document.createElement('div');
                heart.textContent = '❤️';
                heart.style.cssText = `
                    position: absolute;
                    font-size: 70px;
                    color: rgba(255, 255, 255, 255);
                    user-select: none;
                `;
                front.appendChild(heart);

                const back = document.createElement('div');
                back.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: rotateY(180deg);
                    overflow: hidden;
                `;

                // Adicionar imagem ao verso da carta
                const img = document.createElement('img');
                img.src = imgSrc;
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                `;
                back.appendChild(img);

                card.appendChild(front);
                card.appendChild(back);

                card.addEventListener('click', () => {
                    if (!canFlip || card === firstCard || card.classList.contains('matched')) return;

                    card.style.transform = 'rotateY(180deg)';

                    if (!firstCard) {
                        firstCard = card;
                    } else {
                        secondCard = card;
                        canFlip = false;

                        const firstImg = firstCard.querySelector('img').src;
                        const secondImg = secondCard.querySelector('img').src;

                        if (firstImg === secondImg) {
                            firstCard.classList.add('matched');
                            secondCard.classList.add('matched');
                            firstCard = null;
                            secondCard = null;
                            canFlip = true;
                            matchedPairs++;

                            if (matchedPairs === cards.length) {
                                setTimeout(() => {
                                    uiComponents.createModernAlert('❤️ Você completou o jogo das partes que eu amo em você ❤️');
                                    createBouncingPng();
                                }, 500);
                            }
                        } else {
                            setTimeout(() => {
                                firstCard.style.transform = 'rotateY(0deg)';
                                secondCard.style.transform = 'rotateY(0deg)';
                                firstCard = null;
                                secondCard = null;
                                canFlip = true;
                            }, 1000);
                        }
                    }
                });

                memoryGame.appendChild(card);
            });

            container.appendChild(memoryGame);

            // Create envelope container
            const envelopeContainer = document.createElement('div');
            envelopeContainer.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1002;
                background: rgba(0, 0, 0, 0.8);
            `;

            // Add envelope HTML structure
            envelopeContainer.innerHTML = `
                <div class="envelope-wrapper">
                    <div class="envelope"></div>
                    <div class="card">
                        <div class="back">
                            <div class="b-box">
                                <img src="https://i.ibb.co/1vhwbyp/ValCard2.jpg" alt="">
                            </div>
                        </div>
                        <div class="front">
                            <div class="f-box">
                                <img src="https://i.ibb.co/Y74sKPB/ValCard.jpg" alt="">
                            </div>
                        </div>
                        <div class="text-container" style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: -1;">
                            <img src="https://i.ibb.co/Fmf3xSC/card3.jpg" alt="" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                    </div>
                </div>
            `;

            // Add envelope styles
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'envelope.css';
            document.head.appendChild(linkElement);

            document.body.appendChild(envelopeContainer);

            // Fechar envelope ao clicar fora
            envelopeContainer.addEventListener('click', (e) => {
                if (e.target === envelopeContainer) {
                    envelopeContainer.style.display = 'none';
                }
            });

            // Verificar se os botões já existem antes de criar
            if (!document.getElementById('loveButton')) {
                // Criar botão TAMBÉM TE AMO
                const moveButton = document.createElement('button');
                moveButton.id = 'loveButton';
                moveButton.textContent = 'TAMBÉM TE AMO';
                moveButton.setAttribute('data-type', 'love-button');
                moveButton.style.cssText = `
                    width: 220px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    font-size: 1.125em;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #fff;
                    background: linear-gradient(45deg, #ff69b4, #ff1493);
                    border: 2px solid #ff1493;
                    border-radius: .75rem;
                    box-shadow: 0 8px 0 #ff1493;
                    transform: skew(-10deg);
                    filter: drop-shadow(0 10px 10px #ff0095);
                    position: fixed;
                    top: 200px;
                    left: 27%;
                    transition: all .1s ease;
                    font-family: 'Evil Empire', sans-serif;
                    z-index: 9999;
                    pointer-events: none;
                    opacity: 0.5;
                `;
                moveButton.addEventListener('click', backgroundEffects.createHearts);
                
                // Criar botão NÃO TE AMO
                const cryButton = document.createElement('button');
                cryButton.id = 'cryButton';
                cryButton.textContent = 'NÃO TE AMO';
                cryButton.style.cssText = `
                    width: 184px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    font-size: 1.125em;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #fff;
                    background: linear-gradient(45deg, #ff69b4, #ff1493);
                    border: 2px solid #ff1493;
                    border-radius: .75rem;
                    box-shadow: 0 8px 0 #ff1493;
                    transform: skew(-10deg);
                    filter: drop-shadow(0 10px 10px #ff0095);
                    position: fixed;
                    top: 200px;
                    left: 43;
                    transition: all .1s ease;
                    font-family: 'Evil Empire', sans-serif;
                    z-index: 1001;
                `;
                cryButton.addEventListener('click', backgroundEffects.createCryVideo);
                
                // Criar botão JOGOS
                const gameButton = document.createElement('button');
                gameButton.id = 'gameButton';
                gameButton.textContent = 'JOGOS';
                gameButton.style.cssText = `
                    width: 184px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    font-size: 1.125em;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #fff;
                    background: linear-gradient(45deg, #ff69b4, #ff1493);
                    border: 2px solid #ff1493;
                    border-radius: .75rem;
                    box-shadow: 0 8px 0 #ff1493;
                    transform: skew(-10deg);
                    filter: drop-shadow(0 10px 10px #ff0095);
                    position: fixed;
                    top: 200px;
                    left: 62%;
                    transition: all .1s ease;
                    font-family: 'Evil Empire', sans-serif;
                    z-index: 1001;
                `;
                gameButton.addEventListener('click', mainContent.createGameSlideshow);

                // Adicionar efeito de clique apenas uma vez
                [moveButton, cryButton, gameButton].forEach(button => {
                    button.addEventListener('mousedown', () => {
                        button.style.letterSpacing = '0px';
                        button.style.transform = 'skew(-10deg) translateY(8px)';
                        button.style.boxShadow = '0 0 0 #654dff63';
                    });
                    
                    button.addEventListener('mouseup', () => {
                        button.style.letterSpacing = '2px';
                        button.style.transform = 'skew(-10deg)';
                        button.style.boxShadow = '0 8px 0 #ff1493';
                    });
                });

                // Adicionar os botões ao container
                container.appendChild(moveButton);
                container.appendChild(cryButton);
                container.appendChild(gameButton);
            }

            // Criar player de música minimalista
            const audioPlayer = document.createElement('div');
            audioPlayer.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 200px;
                background: rgba(40, 40, 40, 0);
                border-radius: 12px;
                padding: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                color: white;
                font-family: 'Arial', sans-serif;
            `;

            // Criar o elemento de áudio - Criar apenas uma instância
            let audio;
            if (!window.gameAudio) {
                audio = new Audio();
                audio.src = 'music/Lost Boy.mp3';
                audio.volume = 0.015;
                audio.preload = 'auto';
                window.gameAudio = audio;
            } else {
                audio = window.gameAudio;
            }

            // Interface do player
            audioPlayer.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <img src="music/capa.png" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; object-fit: cover;">
                    <div>
                        <div style="font-size: 12px; font-weight: bold;">Lost Boy</div>
                        <div style="font-size: 10px; color: #b3b3b3;">Ruth B.</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="play-pause-btn" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                        padding: 3px;
                    ">⏸</button>
                    <input class="seek-bar" type="range" style="
                        flex-grow: 1;
                        height: 3px;
                        -webkit-appearance: none;
                        background: #4f4f4f;
                        border-radius: 2px;
                        cursor: pointer;
                    " value="0">
                </div>
            `;

            document.body.appendChild(audioPlayer);

            // Iniciar a música automaticamente após o login
            audio.play().catch(error => {
                console.error('Erro ao iniciar música:', error);
                uiComponents.createModernAlert('Clique no play para começar a música');
            });

            // Adicionar funcionalidades ao player após adicionar ao DOM
            const playPauseBtn = audioPlayer.querySelector('.play-pause-btn');
            const seekBar = audioPlayer.querySelector('.seek-bar');

            // Play/Pause
            playPauseBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    playPauseBtn.textContent = '⏸';
                } else {
                    audio.pause();
                    playPauseBtn.textContent = '▶';
                }
            });

            // Atualizar barra de progresso
            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekBar.value = progress;
            });

            // Permitir busca na música
            seekBar.addEventListener('change', () => {
                const time = (seekBar.value * audio.duration) / 100;
                audio.currentTime = time;
            });

            // Garantir visibilidade
            container.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        },
        createGameSlideshow: () => {
            const slideshowContainer = document.createElement('div');
            slideshowContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
            `;

            const closeBtn = document.createElement('div');
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                color: white;
                font-size: 40px;
                cursor: pointer;
                z-index: 10001;
            `;
            closeBtn.onclick = () => slideshowContainer.remove();

            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                position: relative;
            `;

            const gameImages = [];
            const totalImages = 4; // Altere para o número de imagens que você tem na pasta show
            
            // Carrega as imagens
            for(let i = 1; i <= totalImages; i++) {
                const img = new Image();
                img.src = `show/${i}.jpg`;
                img.style.cssText = `
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    display: ${i === 1 ? 'block' : 'none'};
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(255,20,147,0.5);
                `;
                img.dataset.index = i;
                gameImages.push(img);
                imgContainer.appendChild(img);
            }

            // Botões de navegação
            const prevBtn = document.createElement('div');
            prevBtn.textContent = '‹';
            prevBtn.style.cssText = `
                position: absolute;
                left: -50px;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-size: 60px;
                cursor: pointer;
                text-shadow: 0 0 10px #ff1493;
            `;

            const nextBtn = document.createElement('div');
            nextBtn.textContent = '›';
            nextBtn.style.cssText = `
                position: absolute;
                right: -50px;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-size: 60px;
                cursor: pointer;
                text-shadow: 0 0 10px #ff1493;
            `;

            let currentIndex = 0;
            
            function showImage(index) {
                gameImages.forEach(img => img.style.display = 'none');
                gameImages[index].style.display = 'block';
            }

            prevBtn.onclick = () => {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                showImage(currentIndex);
            };

            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % totalImages;
                showImage(currentIndex);
            };

            imgContainer.appendChild(prevBtn);
            imgContainer.appendChild(nextBtn);
            slideshowContainer.appendChild(imgContainer);
            slideshowContainer.appendChild(closeBtn);
            document.body.appendChild(slideshowContainer);
        }
    };

    // *************** ALERTAS E MODAIS ***************
    const uiComponents = {
        createModernAlert: (message) => {
            const alertBox = document.createElement('div');
            alertBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                padding: 30px 50px;
                border-radius: 15px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                z-index: 1005;
                animation: fadeIn 0.3s ease-out;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                text-align: center;
            `;

            // Corrigir a verificação da mensagem e caminho da imagem
            if (message.includes('Por você eu passaria por todos os levels')) {
                const gifImage = document.createElement('img');
                gifImage.src = 'ui/super.gif';  // Verifique se o caminho está correto
                gifImage.style.cssText = `
                    width: 150px;
                    height: 150px;
                    margin-bottom: 20px;
                    border-radius: 10px;
                `;
                alertBox.appendChild(gifImage);
            }

            const messageText = document.createElement('div');
            messageText.style.cssText = `
                color: #ff1493;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                font-family: 'Segoe Print', sans-serif;
                margin-bottom: 20px;
            `;
            messageText.textContent = message;

            const okButton = document.createElement('button');
            okButton.style.cssText = `
                background: linear-gradient(45deg, #ff69b4, #ff1493);
                border: none;
                padding: 10px 30px;
                color: white;
                border-radius: 25px;
                font-size: 16px;
                cursor: pointer;
                transition: transform 0.2s;
                font-family: 'Segoe Print', sans-serif;
                display: block;
                margin: 0 auto;
            `;
            okButton.textContent = '❤️ OK ❤️';
            okButton.onmouseover = () => okButton.style.transform = 'scale(1.05)';
            okButton.onmouseout = () => okButton.style.transform = 'scale(1)';

            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
            `;
            document.head.appendChild(style);

            alertBox.appendChild(messageText);
            alertBox.appendChild(okButton);
            document.body.appendChild(alertBox);

            // Close on button click
            okButton.onclick = () => {
                alertBox.style.animation = 'fadeIn 0.3s ease-out reverse';
                setTimeout(() => {
                    alertBox.remove();
                }, 300);
            };

            // Close on click outside
            alertBox.addEventListener('click', (e) => {
                if (e.target === alertBox) {
                    alertBox.style.animation = 'fadeIn 0.3s ease-out reverse';
                    setTimeout(() => {
                        alertBox.remove();
                    }, 300);
                }
            });
        }
    };

    // *************** INICIALIZAÇÃO ***************
    backgroundEffects.createLiliesBackground();
    setupFocusListeners();
    
    if (elements.form) {
        elements.form.addEventListener('submit', handleLogin);
    }

    // Adicionar no final do arquivo, antes do DOMContentLoaded
    const cursorStyle = 'url("ui/pink2.cur"), text';

    const enforceCursorStyles = () => {
        // Inputs
        document.querySelectorAll('input').forEach(input => {
            if (!input.style.cssText.includes('cursor')) {
                input.style.setProperty('cursor', cursorStyle, 'important');
            }
        });
        
        // Cartas do jogo
        document.querySelectorAll('.memory-game > div').forEach(card => {
            card.style.setProperty('cursor', 'url("ui/pink2.cur"), pointer', 'important');
        });

        // Imagens interativas
        document.querySelectorAll('img[src*=".png"], img[src*=".jpg"]').forEach(img => {
            img.style.setProperty('cursor', 'url("ui/pink2.cur"), pointer', 'important');
        });

        // Botões
        document.querySelectorAll('button').forEach(button => {
            button.style.setProperty('cursor', 'url("ui/pink2.cur"), pointer', 'important');
        });

        // Labels dos inputs
        document.querySelectorAll('form label').forEach(label => {
            label.style.setProperty('cursor', 'url("ui/pink2.cur"), text', 'important');
        });

        // Seleção de texto
        document.querySelectorAll('input').forEach(input => {
            input.style.setProperty('caret-color', 'transparent', 'important');
            input.style.setProperty('::selection', 'cursor: url("ui/pink2.cur"), text', 'important');
        });
    };

    // Observar mudanças no DOM
    const observer = new MutationObserver(enforceCursorStyles);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });

    // Executar inicialmente e em eventos de interação
    ['DOMContentLoaded', 'click', 'mousemove', 'focus', 'blur', 'input', 'keydown', 'mouseenter'].forEach(event => {
        document.addEventListener(event, enforceCursorStyles);
    });
});
