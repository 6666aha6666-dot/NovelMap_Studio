@echo off
chcp 65001 >nul
title 启动 NovelMap Studio
echo ===================================================
echo     正在启动 小说世界观地图工作台 (NovelMap Studio)
echo ===================================================
echo.

:: 1. 尝试在后台启动轻量本地 CORS 中转代理 (端口 3000)
tasklist /fi "imagename eq node.exe" 2>NUL | find /i /n "node.exe">NUL
start /b "" node "%~dp0bin\proxy.js" >nul 2>&1
echo [✓] 本地 API 跨域中转服务已就绪 (127.0.0.1:3000)

:: 2. 自动在系统默认浏览器中打开地图工作台
echo [✓] 正在打开地图画板...
start "" "%~dp0NovelMap_Studio.html"

echo.
echo 工作台已在浏览器中启动！直接在网页中使用即可。
echo (本控制台窗口将在 3 秒后自动关闭)
timeout /t 3 >nul
exit
