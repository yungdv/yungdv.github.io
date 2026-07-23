/* =========================================================
   yungdv · portfolio 
   ========================================================= */

const EMAIL = 'dvuzhilovd05@yandex.ru';

const PROJECTS = [
    {
        icon:'🐔', status:'live',
        title:'TwitchTTS',
        desc:'Мод для Minecraft 1.21 (Fabric): чат Twitch превращается в RPG — умные питомцы озвучивают сообщения, защищают игрока, эволюционируют и фармят ресурсы. Свой TTS-сервер, боевая система, экономика, команды зрителей и режим хаоса.',
        tags:['Java','Fabric','Twitch API','Gradle','CI/CD'],
        github:'https://github.com/yungdv/twitchtts'
    },
    {
        icon:'👁️', status:'live',
        title:'NeuronSleepDetection',
        desc:'Детекция сна с помощью компьютерного зрения: обучение и тестирование модели по изображениям глаз (открыты / закрыты). Полный пайплайн — датасет, обучение, проверка, инференс.',
        tags:['Python','ML','Computer Vision','YOLO'],
        github:'https://github.com/yungdv/NeuronSleepDetection'
    },
    {
        icon:'🗄️', status:'live',
        title:'DeviceDatabase',
        desc:'Веб-система учёта устройств на Django: инвентаризация, импорт данных из DBF и Excel, SQLite, разделение по приложениям (inventory / management / database).',
        tags:['Python','Django','SQLite','DBF'],
        github:'https://github.com/yungdv/DeviceDatabase'
    },
    {
        icon:'🗂️', status:'live',
        title:'DBFreader',
        desc:'Инструменты для чтения и записи DBF-файлов: разбор структуры, импорт данных, работа через pandas, создание новых записей.',
        tags:['Python','pandas','DBF'],
        github:'https://github.com/yungdv/DBFreader'
    },
    {
        icon:'⬇️', status:'live',
        title:'FileDownloadDjango',
        desc:'Приложение на Django для загрузки и отдачи файлов пользователю — работа с файловыми полями, роутингом и шаблонами.',
        tags:['Python','Django','HTML/CSS'],
        github:'https://github.com/yungdv/FileDownloadDjango'
    },
    {
        icon:'🔌', status:'live',
        title:'DBDevice',
        desc:'Учёт устройств с привязкой к базе и DBF-источникам — часть связки проектов по обработке и хранению инвентарных данных.',
        tags:['Python','DBF'],
        github:'https://github.com/yungdv/DBDevice'
    },
    {
        icon:'🧪', status:'live',
        title:'DjangoTest',
        desc:'Учебный проект на Django: модели, представления, шаблоны — отработка основ фреймворка.',
        tags:['Python','Django'],
        github:'https://github.com/yungdv/DjangoTest'
    },
    {
        icon:'🛡️', status:'practice',
        title:'ИТ-реестр сотрудников',
        desc:'Система учёта сотрудников ИТ-отдела с ролевой моделью и уровнями доступа. Реализовано по производственной практике: CRUD, авторизация, разграничение прав.',
        tags:['PHP','Yii2','RBAC','MySQL'],
        github:null
    },
    {
        icon:'🚀', status:'live',
        title:'Лендинг (этот сайт)',
        desc:'Одностраничник-портфолио: Hero, проекты, навыки, контакты, кастомный курсор, терминал и топографический фон. Всё с нуля, без шаблонов.',
        tags:['HTML','CSS','JS'],
        github:'https://github.com/yungdv/yungdv.github.io',
        live:'https://yungdv.github.io',
        image:'images/preview.png'
    }
];

const ICON = n => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${n}.svg`;
const SKILLS = {
    'Языки': [
        ['python','Python'],['openjdk','Java'],['javascript','JavaScript'],
        ['php','PHP'],['html5','HTML / CSS'],['mysql','SQL']
    ],
    'Фреймворки и библиотеки': [
        ['django','Django'],['fabric','Fabric'],['pandas','pandas'],
        ['yii','Yii2'],['pytorch','ML / CV'],['tailwindcss','Tailwind CSS']
    ],
    'Инструменты': [
        ['git','Git'],['githubactions','GitHub Actions'],['gradle','Gradle'],
        ['docker','Docker'],['linux','Linux']
    ]
};

(function topo(){
    const cv = document.getElementById('topo-canvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    const CELL = 16, NS = 1/170, LEVELS = 12;

    function rnd(ix,iy){ let n=ix*374761393+iy*668265263; n=(n^(n>>13))*1274126177; return ((n^(n>>16))>>>0)/4294967295; }
    function sm(x){ return x*x*(3-2*x); }
    function noise(x,y){
        const ix=Math.floor(x), iy=Math.floor(y), fx=sm(x-ix), fy=sm(y-iy);
        const a=rnd(ix,iy), b=rnd(ix+1,iy), c=rnd(ix,iy+1), d=rnd(ix+1,iy+1);
        return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy;
    }
    function fbm(x,y){ let v=0,amp=.5,f=1; for(let o=0;o<3;o++){ v+=amp*noise(x*f,y*f); f*=2; amp*=.5; } return v; }

    const saddle10=[[0,1],[2,3]];
    const T=[[],[[3,0]],[[0,1]],[[1,3]],[[1,2]],[[3,0],[1,2]],[[0,2]],[[2,3]],
             [[2,3]],[[0,2]],saddle10,[[1,2]],[[1,3]],[[0,1]],[[0,3]],[]];

    function draw(){
        const w=cv.width=innerWidth, h=cv.height=innerHeight;
        ctx.clearRect(0,0,w,h);
        const cols=Math.ceil(w/CELL)+1, rows=Math.ceil(h/CELL)+1;
        const val=[];
        for(let r=0;r<rows;r++){ val[r]=[]; for(let c=0;c<cols;c++) val[r][c]=fbm(c*CELL*NS, r*CELL*NS); }

        const edgePoint=(e,x,y,th,vTL,vTR,vBR,vBL)=>{
            let ax,ay,bx,by,va,vb;
            if(e===0){ax=x;ay=y;bx=x+CELL;by=y;va=vTL;vb=vTR;}
            else if(e===1){ax=x+CELL;ay=y;bx=x+CELL;by=y+CELL;va=vTR;vb=vBR;}
            else if(e===2){ax=x;ay=y+CELL;bx=x+CELL;by=y+CELL;va=vBL;vb=vBR;}
            else {ax=x;ay=y;bx=x;by=y+CELL;va=vTL;vb=vBL;}
            let t=(th-va)/(vb-va); t=t<0?0:t>1?1:t;
            return [ax+(bx-ax)*t, ay+(by-ay)*t];
        };

        for(let L=1;L<LEVELS;L++){
            const th=L/LEVELS, bold=(L%4===0);
            ctx.beginPath();
            ctx.lineWidth = bold ? 1.1 : 0.7;
            ctx.strokeStyle = 'rgba(255,255,255,'+(bold?0.16:0.09)+')';
            for(let r=0;r<rows-1;r++){
                for(let c=0;c<cols-1;c++){
                    const vTL=val[r][c], vTR=val[r][c+1], vBR=val[r+1][c+1], vBL=val[r+1][c];
                    const idx=(vTL>=th?1:0)|(vTR>=th?2:0)|(vBR>=th?4:0)|(vBL>=th?8:0);
                    const pairs=T[idx]; if(!pairs||!pairs.length) continue;
                    const x=c*CELL, y=r*CELL;
                    for(const pr of pairs){
                        const p1=edgePoint(pr[0],x,y,th,vTL,vTR,vBR,vBL);
                        const p2=edgePoint(pr[1],x,y,th,vTL,vTR,vBR,vBL);
                        ctx.moveTo(p1[0],p1[1]); ctx.lineTo(p2[0],p2[1]);
                    }
                }
            }
            ctx.stroke();
        }
    }

    let rt; addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(draw,150); });
    draw();
})();

(function preloader(){
    const el=document.getElementById('preloader');
    const fill=document.getElementById('preloaderFill');
    const count=document.getElementById('preloaderCount');
    if(!el) return;
    let p=0;
    const iv=setInterval(()=>{
        p+=Math.random()*9+3; if(p>=100){p=100;clearInterval(iv);
            setTimeout(()=>el.classList.add('loaded'),350);
        }
        fill.style.width=p+'%'; count.textContent=Math.floor(p);
    },90);
})();

(function cursor(){
    if(!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const dot=document.getElementById('cursorDot'), ring=document.getElementById('cursorRing');
    let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
    (function loop(){ rx+=(mx-rx)*0.18; ry+=(my-ry)*0.18; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
    const bind=()=>document.querySelectorAll('a,button,.tech-pill,.project-card,.contact-link,input,.tab').forEach(el=>{
        el.addEventListener('mouseenter',()=>ring.classList.add('grow'));
        el.addEventListener('mouseleave',()=>ring.classList.remove('grow'));
    });
    window.__cursorRebind=bind; bind();
})();


(function typing(){
    const el=document.getElementById('typed'); if(!el) return;
    // ✅ исправлено: убрана лишняя запятая, из-за которой первый элемент был undefined
    const phrases=['Junior-разработчик','Python · Java · PHP','ищу первую работу'];
    let pi=0,ci=0,del=false;
    function tick(){
        const cur=phrases[pi];
        el.textContent = del ? cur.slice(0,--ci) : cur.slice(0,++ci);
        let sp = del?45:90;
        if(!del && ci===cur.length){ del=true; sp=1600; }
        else if(del && ci===0){ del=false; pi=(pi+1)%phrases.length; sp=350; }
        setTimeout(tick,sp);
    }
    setTimeout(tick,1800);
})();


(function avatar3d(){
    const wrap=document.getElementById('avatarWrap'), av=document.getElementById('avatar');
    if(!wrap) return;
    wrap.addEventListener('mousemove',e=>{
        const r=wrap.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-0.5)*-22;
        const ry=((e.clientX-r.left)/r.width-0.5)*22;
        av.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    });
    wrap.addEventListener('mouseleave',()=>av.style.transform='');
})();


let currentFilter='all';
function renderProjects(){
    const g=document.getElementById('projectsGrid'); if(!g) return;
    const list = PROJECTS.filter(p=>{
        if(currentFilter==='all') return true;
        if(currentFilter==='mine') return p.status==='live'||p.status==='practice';
        if(currentFilter==='wip') return p.status==='wip';
        return true;
    });

    if(!list.length){
        g.innerHTML = '<p class="projects-empty">// тут пока пусто — но скоро что-то появится 👀</p>';
        return;
    }

    g.innerHTML = list.map(p=>{
        const badge = p.status==='live' ? '<span class="badge badge--live">live</span>'
                    : p.status==='practice' ? '<span class="badge badge--practice">practice</span>'
                    : '<span class="badge badge--wip">в разработке</span>';
        const chips = (p.tags||[]).map(t=>`<span class="chip">${t}</span>`).join('');
        const progress = p.status==='wip' ? `
            <div class="progress-label"><span>готовность</span><span>${p.progress}%</span></div>
            <div class="progress-bar"><div class="progress-fill" data-w="${p.progress}"></div></div>` : '';
        const media = p.image
            ? `<div class="project-image"><img src="${p.image}" alt="${p.title}"></div>`
            : `<div class="project-image">${p.icon}</div>`;
        const liveLink = p.live
            ? `<a class="project-link" href="${p.live}" target="_blank" rel="noopener">live
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg></a>`
            : '';
        const ghLink = p.github
            ? `<a class="project-link" href="${p.github}" target="_blank" rel="noopener">github
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg></a>`
            : `<span class="project-link project-link--muted">приватный репозиторий</span>`;
        return `
        <article class="project-card">
            ${media}
            <div class="project-content">
                <div class="project-meta"><h3 class="project-title">${p.title}</h3>${badge}</div>
                <p class="project-desc">${p.desc}</p>
                <div class="chips">${chips}</div>
                ${progress}
                <div class="project-links">${liveLink}${ghLink}</div>
            </div>
        </article>`;
    }).join('');

    const sec=document.getElementById('projects');
    if(sec && sec.classList.contains('visible')){
        g.querySelectorAll('[data-w]').forEach(b=>{ b.style.width=b.dataset.w+'%'; });
    }
    if(window.__cursorRebind) window.__cursorRebind();
}

function renderSkills(){
    const c=document.getElementById('skillsContainer'); if(!c) return;
    c.innerHTML=Object.entries(SKILLS).map(([cat,list])=>`
      <div class="skill-category">
        <div class="skill-category__title">${cat}</div>
        ${list.map(([ic,nm])=>`
          <div class="skill-item">
            <span class="skill-name"><img src="${ICON(ic)}" alt="" data-letter="${nm[0]}" onerror="iconFallback(this,this.dataset.letter)">${nm}</span>
          </div>`).join('')}
      </div>`).join('');
}

function setupTabs(){
    document.querySelectorAll('.tab').forEach(t=>{
        t.addEventListener('click',()=>{
            document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
            t.classList.add('active');
            currentFilter=t.dataset.filter;
            renderProjects();
        });
    });
}

function setupObserver(){
    const io=new IntersectionObserver(es=>es.forEach(en=>{
        if(en.isIntersecting){
            en.target.classList.add('visible');
            en.target.querySelectorAll('[data-w]').forEach(b=>{ b.style.width=b.dataset.w+'%'; });
        }
    }),{threshold:.12});
    document.querySelectorAll('section').forEach(s=>io.observe(s));

    const cio=new IntersectionObserver(es=>es.forEach(en=>{
        if(en.isIntersecting){ countUp(en.target); cio.unobserve(en.target); }
    }),{threshold:.5});
    document.querySelectorAll('.stat__num').forEach(n=>cio.observe(n));
}
function countUp(el){
    const target=+el.dataset.count, suf=el.dataset.suffix||'', dur=1400, t0=performance.now();
    (function f(now){
        const p=Math.min((now-t0)/dur,1), e=1-Math.pow(1-p,3);
        el.textContent=Math.floor(e*target)+suf;
        if(p<1) requestAnimationFrame(f);
    })(t0);
}


function setupNav(){
    const nav=document.getElementById('navbar'), burger=document.getElementById('burger'), links=document.getElementById('navLinks');
    addEventListener('scroll',()=>{
        nav.classList.toggle('scrolled',scrollY>40);
        let cur=''; document.querySelectorAll('section[id]').forEach(s=>{ if(scrollY>=s.offsetTop-200) cur=s.id; });
        document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
    });
    burger.addEventListener('click',()=>{ burger.classList.toggle('active'); links.classList.toggle('active'); });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ burger.classList.remove('active'); links.classList.remove('active'); }));
}

function setupCopy(){
    const btn=document.getElementById('copyEmailBtn'), toast=document.getElementById('toast');
    btn.addEventListener('click',()=>{
        navigator.clipboard.writeText(EMAIL).then(()=>{
            toast.querySelector('.toast__msg').textContent='email скопирован';
            toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2200);
        });
    });
}

(function terminal(){
    const overlay=document.getElementById('termOverlay'), body=document.getElementById('termBody'),
          input=document.getElementById('termInput'), open=document.getElementById('termTrigger'),
          close=document.getElementById('termClose');
    const BANNER=[
        '                             _       ',
        ' _   _ _   _ _ __   __ _  __| |_   __',
        '| | | | | | | \'_ \\ / _` |/ _` \\ \\ / /',
        '| |_| | |_| | | | | (_| | (_| |\\ V / ',
        ' \\__, |\\__,_|_| |_|\\__, |\\__,_| \\_/  ',
        ' |___/             |___/             ',''
    ];
    const HELP=['доступные команды:','  about      — кто я','  skills     — мой стек','  projects   — список проектов',
        '  contact    — как связаться','  social     — ссылки','  whoami     — текущий пользователь',
        '  date       — дата и время','  banner     — показать баннер','  clear      — очистить экран','  exit       — закрыть терминал'];
    const ABOUT=['yungdv · junior software developer','основной язык — python, также java и php.',
        'делал ml-детекцию сна, мод для minecraft с twitch-интеграцией, веб на django и yii2.',
        'сейчас ищу первую работу в разработке.'];

    function print(arr,cls='out'){ arr.forEach(l=>{ const d=document.createElement('div'); d.className='line '+cls; d.textContent=l; body.appendChild(d); }); body.scrollTop=body.scrollHeight; }
    function echo(cmd){ const d=document.createElement('div'); d.className='line cmd'; d.textContent='yungdv@portfolio:~$ '+cmd; body.appendChild(d); }
    function run(raw){
        const cmd=raw.trim().toLowerCase(); echo(raw); if(!cmd) return;
        switch(cmd){
            case 'help': print(HELP); break;
            case 'about': print(ABOUT); break;
            case 'whoami': print(['yungdv']); break;
            case 'date': print([new Date().toLocaleString('ru-RU')]); break;
            case 'banner': print(BANNER,'muted'); break;
            case 'skills': print(['языки:    python, java, javascript, php, html/css, sql',
                'фреймворки: django, fabric, yii2, pandas, ml/cv, tailwind',
                'инструменты: git, github actions, gradle, docker, linux']); break;
            case 'projects': PROJECTS.filter(p=>p.status!=='wip').forEach(p=>print([`  • ${p.title}`])); break;
            case 'contact': print([`email: ${EMAIL}`,'telegram: @yungdv','github: github.com/yungdv']); break;
            case 'social': print(['github.com/yungdv','t.me/yungdv']); break;
            case 'clear': body.innerHTML=''; break;
            case 'exit': case 'close': toggle(false); break;
            case 'sudo': print(['nice try 🙂 тут нет root-доступа.']); break;
            default: print([`команда не найдена: ${cmd}. введите help`]);
        }
    }
    function toggle(state){
        const open2 = state===undefined ? !overlay.classList.contains('open') : state;
        overlay.classList.toggle('open',open2);
        if(open2){ body.innerHTML=''; print(BANNER,'muted'); print(['введите help для списка команд.']); setTimeout(()=>input.focus(),100); }
    }
    open.addEventListener('click',()=>toggle(true));
    close.addEventListener('click',()=>toggle(false));
    overlay.addEventListener('click',e=>{ if(e.target===overlay) toggle(false); });
    input.addEventListener('keydown',e=>{ if(e.key==='Enter'){ run(input.value); input.value=''; } });
    addEventListener('keydown',e=>{
        if(e.key==='`'||e.key==='ё'){ e.preventDefault(); toggle(); }
        if(e.key==='Escape') toggle(false);
    });
})();

document.addEventListener('DOMContentLoaded',()=>{
    renderProjects(); renderSkills(); setupTabs(); setupObserver(); setupNav(); setupCopy();
    document.getElementById('year').textContent=new Date().getFullYear();
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){
        const t=document.querySelector(this.getAttribute('href')); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    }));
});

console.log('%c· yungdv ·','color:#fff;background:#000;padding:4px 8px;font-family:monospace','нажми ` чтобы открыть терминал 👾');