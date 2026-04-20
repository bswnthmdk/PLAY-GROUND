# Playground

This repository contains experiments and practice work for different technologies.
Each technology is maintained in its **own branch** to keep experiments isolated.

---

# Repository Structure

Each branch contains **only one technology folder**.

| Branch Name  | Folder Name   | Description                                              |
| ------------ | ------------- | -------------------------------------------------------- |
| `main`       | —             | Base branch containing only README and .gitignore        |
| `nextjs`     | `NextJS/`     | Next.js projects, API routes, middleware, authentication |
| `gen-ai`     | `GEN-AI/`     | GenAI experiments (LangChain, prompts, models)           |
| `typescript` | `TypeScript/` | TypeScript basics, typing patterns                       |
| `websocket`  | `WEB SOCKET/` | WebSocket experiments and real-time features             |

---

# Basic Workflow Rules

Before doing anything, remember:

- Each technology lives in **its own branch**
- Never mix folders across branches
- Always switch to correct branch before working
- Never run `git init` inside subfolders

---

# Create a New Project in a New Technology Branch

Use this when starting a **new technology**.

## Step 1 — Go to main branch

```bash
git checkout main
```

---

## Step 2 — Create new branch

Example: creating `redis` branch

```bash
git checkout -b redis
```

Push branch:

```bash
git push -u origin redis
```

---

## Step 3 — Create folder for that technology

```bash
mkdir REDIS
cd REDIS
```

Create your project here.

Example:

```bash
mkdir basics
```

---

## Step 4 — Commit the project

Go back to repo root:

```bash
cd ..
```

Commit:

```bash
git add .
git commit -m "Add Redis workspace"
git push
```

Branch setup complete.

---

# Work on an Existing Project

Use this when continuing work in an existing technology.

Example: working on Next.js.

---

## Step 1 — Switch branch

```bash
git checkout nextjs
```

---

## Step 2 — Move into project folder

```bash
cd NextJS
```

Example project:

```bash
cd auth-practice
```

---

## Step 3 — Work normally

Make changes to files.

---

## Step 4 — Commit changes

Return to repo root:

```bash
cd ..
cd ..
```

Then commit:

```bash
git add .
git commit -m "NextJS: update authentication logic"
git push
```

---

# Add an Existing Project from Another Directory

Use this when you already have a project somewhere else and want to move it into this repo.

Example:

Project located at:

```
D:\Projects\my-next-app
```

---

## Step 1 — Switch to correct branch

```bash
git checkout nextjs
```

---

## Step 2 — Copy project into folder

Copy:

```
my-next-app
```

Into:

```
Playground/NextJS/
```

After copying:

```
NextJS/
   my-next-app/
```

---

## Step 3 — Commit the imported project

```bash
git add .
git commit -m "Add existing NextJS project: my-next-app"
git push
```

Done.

---

# Create Multiple Projects Inside One Technology

Inside a technology branch, create multiple project folders.

Example:

```
NextJS/
   auth-practice/
   api-routes-test/
   middleware-tests/
```

Each project remains separate.

---

# Switching Between Technologies

Example workflow:

Work on Next.js:

```bash
git checkout nextjs
```

Work on GenAI:

```bash
git checkout gen-ai
```

Work on TypeScript:

```bash
git checkout typescript
```

---

# Troubleshooting Tips

## If files disappear

You probably switched branches.

Run:

```bash
git branch
```

Switch back if needed.

---

## If push fails

Try:

```bash
git push -u origin branch-name
```

---

# Summary

This repository uses:

- One branch per technology
- One folder per technology
- Multiple projects inside each folder

Switch branches to switch technologies.
