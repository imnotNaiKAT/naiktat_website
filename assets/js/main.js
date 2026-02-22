// 全局变量：登录状态标识
let isLoggedIn = false;

// 初始化粒子动画
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles", {
            particles: {
                number: { value: 80 },
                color: { value: "#0ef" },
                shape: { type: "circle" },
                opacity: { value: 0.6 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#0ef",
                    opacity: 0.3,
                    width: 1
                },
                move: { enable: true, speed: 1.5 }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
}

// 登录处理（任意账号密码可登录，也可自定义白名单）
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginMsg = document.getElementById('loginMsg');

    // 验证非空
    if (!username || !password) {
        loginMsg.textContent = "用户名和密码不能为空！";
        loginMsg.style.color = "#ff4444";
        return;
    }

    // 方案1：任意账号密码通过（推荐）
    isLoggedIn = true;
    // 存储登录状态到localStorage（刷新页面不失效）
    localStorage.setItem('naikat_login', 'true');
    loginMsg.textContent = "登录成功！正在跳转...";
    loginMsg.style.color = "#00ff88";
    
    // 延迟跳转至关于页
    setTimeout(() => {
        window.location.href = "pages/about.html";
    }, 1000);

    // 方案2：自定义白名单（取消注释即可使用）
    /*
    const whiteList = [
        { user: 'naikat', pwd: '123456' },
        { user: 'admin', pwd: 'admin888' }
    ];
    const isAuth = whiteList.some(item => item.user === username && item.pwd === password);
    if (isAuth) {
        isLoggedIn = true;
        localStorage.setItem('naikat_login', 'true');
        loginMsg.textContent = "登录成功！正在跳转...";
        loginMsg.style.color = "#00ff88";
        setTimeout(() => {
            window.location.href = "pages/about.html";
        }, 1000);
    } else {
        loginMsg.textContent = "用户名或密码错误！";
        loginMsg.style.color = "#ff4444";
    }
    */
}

// 权限校验：所有页面加载时验证登录状态
function checkAuth() {
    const loginStatus = localStorage.getItem('naikat_login');
    // 如果未登录，跳回登录页
    if (!loginStatus || loginStatus !== 'true') {
        window.location.href = "../index.html";
    } else {
        // 已登录，初始化页面
        initParticles();
        initNav();
    }
}

// 初始化导航栏切换
function initNav() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            window.location.href = targetPage;
        });
    });
}

// 子页面返回按钮
function goBack() {
    window.history.back();
}

// 未发布提示
function showUnreleaseTip(name) {
    alert(`${name} → 该产品暂未发布，敬请期待！`);
}

// 页面跳转（产业子页面）
function goToSubPage(page) {
    window.location.href = page;
}

// 退出登录
function logout() {
    localStorage.removeItem('naikat_login');
    window.location.href = "../index.html";
}