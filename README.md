# Private GPT Setup Guide
This guide walks you through setting up and running the Private GPT project using React UI

## 🛠️ Running Backend Only

```bash
cd private-gpt
$env:PGPT_PROFILES="openai"
make run
```
OR 

## Running Backend using the Docker Compose file

```bash
cd private-gpt
HF_TOKEN=<your_hf_token> docker-compose --profile llamacpp-cpu up
```

## 🌐 Running Frontend Only (React)

```bash
cd private-gpt-ui
npm start
```

Your browser will open automatically.

## 📦 Initial Setup (One-Time Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/swarnavarsha1/techoffice-gpt.git
cd private-gpt
```

### 2. Install pyenv for Windows

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"
&"./install-pyenv-win.ps1"
```

Verify installation:

```bash
pyenv version
```

### 3. Install and Set Python Version

```bash
pyenv install 3.11
pyenv local 3.11
```

### 4. Install Poetry (Python Dependency Manager)

```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

Verify Poetry version:

```bash
poetry --version
```

Make sure Poetry is added to your system path.

### 5. Install Make (Windows)

```bash
choco install make
```

### 6. Set Python Version for Poetry

```bash
poetry env use python3.11
```

### 7. Install Project Dependencies

```bash
poetry install --extras "ui llms-openai embeddings-openai vector-stores-qdrant"
```

### 8. Add Hugging Face Token

Update `settings.yaml` with your Hugging Face token.


### 9. Run Setup Script

```bash
poetry run python scripts/setup
```

## Using OpenAI Model

- Edit `settings-openai.yaml`
- Add your `api_key`
- Set the model name to `gpt-4o`

## 🚀 Running the Application (After First Setup)

### 10. Set Profile (Every New Session)

```bash
$env:PGPT_PROFILES="openai"
```

### 11. Run the Application

```bash
make run
```

Open your browser and navigate to using gradio:

```
http://localhost:8001/
```
