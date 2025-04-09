# Yesterday Once More

一个基于 AI 的香水配方创建网站，可以分析用户的描述、图片、音频和视频，并将其转化为香水配方。

## 功能特点

- 支持中英文双语界面
- 可上传图片、音频、视频作为灵感来源
- 使用 DeepSeek API 生成香水配方
- 响应式设计，适配各种设备
- 视频背景，提供沉浸式体验

## 部署说明

### 本地开发

1. 克隆仓库：
   ```
   git clone https://github.com/你的用户名/yesterday-once-more.git
   cd yesterday-once-more
   ```

2. 创建 `config.js` 文件（不包含在仓库中）：
   ```javascript
   // DeepSeek API 配置
   window.CONFIG = {
       DEEPSEEK_API_KEY: '你的_DEEPSEEK_API_密钥',
       DEEPSEEK_MODEL: 'deepseek-V3'
   };
   ```

3. 添加视频背景：
   - 将视频文件放在 `videos` 文件夹中，命名为 `background.mp4`

4. 使用本地服务器运行：
   ```
   python -m http.server 8000
   ```
   然后在浏览器中访问 `http://localhost:8000/neon-drowning.html`

### GitHub Pages 部署

1. Fork 这个仓库到你的 GitHub 账户

2. 克隆你的 Fork 到本地：
   ```
   git clone https://github.com/你的用户名/yesterday-once-more.git
   cd yesterday-once-more
   ```

3. 添加视频背景：
   - 将视频文件放在 `videos` 文件夹中，命名为 `background.mp4`

4. 创建 `config.js` 文件（不会被上传到 GitHub）：
   ```javascript
   // DeepSeek API 配置
   window.CONFIG = {
       DEEPSEEK_API_KEY: '你的_DEEPSEEK_API_密钥',
       DEEPSEEK_MODEL: 'deepseek-V3'
   };
   ```

5. 提交更改（不包括 config.js 和视频文件）：
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

6. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入仓库 -> Settings -> Pages
   - Source 选择 "main" 分支
   - 点击 Save

7. 你的网站将在几分钟内部署到 `https://你的用户名.github.io/yesterday-once-more/`

## 注意事项

- 由于 API 密钥安全问题，此部署方式仅适合个人使用或演示
- 对于生产环境，建议使用后端服务来处理 API 调用，以保护 API 密钥
- 视频文件较大，不包含在 Git 仓库中，需要手动添加

## 许可证

MIT
