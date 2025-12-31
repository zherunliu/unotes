## curl

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"username": "rico", "password": "1234567"}' \
     http://localhost:3000/auth/register
```

```bash
curl -H "Authorization: token..." \
     http://localhost:3000/user
```

## uni-app

uni-app 框架

```bash
pnpm dlx degit dcloudio/uni-preset-vue#vite-ts app
```

组件库

```bash
pnpm add @dcloudio/uni-ui
```

浅克隆仓库

```
git clone --depth 1 <repository>
```
