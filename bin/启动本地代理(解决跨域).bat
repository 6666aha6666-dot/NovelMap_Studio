@echo off
chcp 65001 >nul
title NovelMap Studio - 本地 CORS 代理服务
echo ===================================================
echo   NovelMap Studio - 本地 API 跨域中转服务已启动
echo   本地服务端口: http://127.0.0.1:3000
echo ===================================================
echo.
echo 保持此窗口开启，在网页设置中填入: http://127.0.0.1:3000
echo 即可完美绕过浏览器的跨域拦截(CORS)，无缝直连任何第三方 API！
echo.
node "%~dp0proxy.js"
pause
